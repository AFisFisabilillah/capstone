# CAPSTONE PROJECT

## Backend 
1. Ketik ```cd <folder backend>```
2. Ketik ```composer install``` unutk mengisntal depedency
3. lalu ```cp .env.example .env``` unutk mengcopy environment yang ada di laravel
4. Ketikan  Untuk mengatur database
``` DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD= 
```

5. lalu ```php artisan migrate:fresh``` unutk membuat table

6. ``` php artisan serve ``` Untuk menjalankan laravel

## Face Recognition 

1. Pastikan Kamu sudah menginstal python versi ``` Python 3.10.0  ``` di komputer kamu 

2. Ketik ```cd <folder Model>```

3. lalu ketikan ```pip install flask deepface numpy opencv-python opencv-contrib-python tensorflow keras``` unutk menginstall depedency

4. Setelah itu jalankan python ``` python app.py ```

