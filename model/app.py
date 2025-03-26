from flask import Flask, request, jsonify
from deepface import DeepFace
import numpy as np
import cv2
import os

app = Flask(__name__)

# File database wajah
DATABASE_FILE = "face_database.npz"

# Load database jika ada
if os.path.exists(DATABASE_FILE):
    data = np.load(DATABASE_FILE, allow_pickle=True)
    face_database = data["faces"].item()  # Konversi kembali ke dictionary
else:
    face_database = {}

# Fungsi untuk ekstraksi fitur wajah
def extract_embedding(image):
    img_array = np.frombuffer(image.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Gagal membaca gambar")
    return DeepFace.represent(img, model_name="Facenet512")[0]["embedding"]

@app.route('/register_face', methods=['POST'])
def register_face():
    try:
        name = request.form['name'].strip()
        if name == "" or 'image' not in request.files:
            return jsonify({"status": False, "message": "Nama dan gambar harus diisi"})

        face_database[name] = extract_embedding(request.files['image'])
        np.savez(DATABASE_FILE, faces=face_database)  # Simpan database
        
        return jsonify({"status": True, "message": f"Wajah '{name}' berhasil didaftarkan"})
    except Exception as e:
        return jsonify({"status": False, "message": str(e)})

@app.route('/compare_face', methods=['POST'])
def compare_face():
    try:
        name = request.form['name'].strip()
        if name == "" or 'image' not in request.files:
            return jsonify({"status": False, "message": "Nama dan gambar harus diisi"})

        if name not in face_database:
            return jsonify({"status": False, "message": f"Nama '{name}' tidak ditemukan dalam database"})
    

        new_encoding = extract_embedding(request.files['image'])
        stored_encoding = np.array(face_database[name])

        # Gunakan Cosine Similarity manual untuk kecepatan lebih baik
        similarity = np.dot(new_encoding, stored_encoding) / (np.linalg.norm(new_encoding) * np.linalg.norm(stored_encoding))
        match = similarity > 0.6        # 0.7 sebagai threshold kecocokan
        print(similarity)
        return jsonify({"status":  bool(match), "message": "Wajah cocok" if match else "Wajah tidak cocok"})
    except Exception as e:
        return jsonify({"status": False, "message": str(e)})

@app.route('/update_face', methods=['POST'])
def update_face():
    try:
        name = request.form['name'].strip()
        if name == "" or 'image' not in request.files:
            return jsonify({"status": False, "message": "Nama dan gambar harus diisi"})

        if name not in face_database:
            return jsonify({"status": False, "message": f"Nama '{name}' tidak ditemukan dalam database"})

        face_database[name] = extract_embedding(request.files['image'])
        np.savez(DATABASE_FILE, faces=face_database)

        return jsonify({"status": True, "message": f"Wajah '{name}' berhasil diperbarui"})
    except Exception as e:
        return jsonify({"status": False, "message": str(e)})

@app.route('/delete_face', methods=['DELETE'])
def delete_face():
    try:
        name = request.form['name'].strip()
        if name == "":
            return jsonify({"status": False, "message": "Nama harus diisi"})

        if name not in face_database:
            return jsonify({"status": False, "message": f"Nama '{name}' tidak ditemukan dalam database"})

        del face_database[name]
        np.savez(DATABASE_FILE, faces=face_database)

        return jsonify({"status": True, "message": f"Wajah '{name}' berhasil dihapus"})
    except Exception as e:
        return jsonify({"status": False, "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
