# User

## Profile

Endpoint : GET ``` /api/profile ```

Header : 

- Authorization : Bearer {token}

Response (succes)
```
{
    "status": "success",
    "message": "berhasil mendapatkan user",
    "data": {
        "id": 3,
        "name": "thor",
        "email": "thor@gmail.com",
        "alamat": "galaxy dsa",
        "role": "SISWA",
        "photo": "http://localhost:8000/storage/photos/83d930f8-ed14-48d6-a1f3-342d6f22c5fb_thor2.jpeg"
    }
}
```

## Profile

Endpoint : POST ``` /api/absen ```

Header : 

- Content-Type : multipart/form-data
- Authorization : Bearer {token}

Request : 
```
{
    "image" : "img.jpg"
}
```

Response (succes)
```
{
    "status": "success",
    "message": "berhasil absen ",
    "data": {
        "id": 1,
        "tanggal": "2025-03-26",
        "user": "thor",
        "status": "berhasil"
    }
}
```
Response (Failed)
```
{
    "status": "error",
    "message": "wajah tidak cocok"
}
```

## GET Absensin 
Endpoint : GET ``` /api/profile ```

Header : 

- Authorization : Bearer {token}

Parameter : 

- ?limit = unutk limit per page

Response (succes)
```
{
    "status": "success",
    "message": "Berhasil mengambil absen",
    "data": [
        {
            "id": 1,
            "tanggal": "2025-03-26",
            "user": "thor",
            "status": "berhasil"
        },
        {
            "id": 2,
            "tanggal": "2025-03-26",
            "user": "thor",
            "status": "berhasil"
        },
        {
            "id": 3,
            "tanggal": "2025-03-26",
            "user": "thor",
            "status": "berhasil"
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 3,
        "next_page_url": null,
        "prev_page_url": null
    }
}
