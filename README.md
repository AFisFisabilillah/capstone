# CAPSTONE PROJECT
unutk mendownload app jalankan ``` git clone https://github.com/AFisFisabilillah/capstone```
## Frontend 
1. ``` npm i  ``` jalan kan di terminla  unutk menginstal dependcy
2. lalu ``` npm run dev ``` unutk build
   
## Backend 
1. Ketik ```cd <folder backend>```
2. Ketik ```composer install``` unutk mengisntal depedency
3. lalu ```cp .env.example .env``` unutk mengcopy environment yang ada di laravel
4. Ketikan  Untuk mengatur database
``` 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD= 
```

5. lalu ```php artisan migrate:fresh``` unutk membuat table
6. lalu ```php artisan db:seed``` unutk membuat table

7. ``` php artisan serve ``` Untuk menjalankan laravel

## Face Recognition 

1. Pastikan Kamu sudah menginstal python versi ``` Python 3.10.0  ``` di komputer kamu 

2. Ketik ```cd <folder Model>```

3. lalu ketikan ```pip install flask deepface numpy opencv-python opencv-contrib-python tensorflow keras``` unutk menginstall depedency

4. Setelah itu jalankan python ``` python app.py ```


Jika semua langkah  telah di jalankan makan aka ada satu akun yang tersedia yaitu
```
{
    "email" : "afis@gmail.com",
    "password" : "2112-7"
}
```
akun ini bisa masuk kedalam admin dan juga user

### Authenticate 
Untuk Dokumentasi Api nya ada di folder ```./docs api#/authenticate.md```
ada 6 fitur unutk admin 

jika pertama kali program di jalankan ada satu user yang tersedia yaitu : 
```
{
    "email" : "afis@gmail.com",
    "password" : "2112-7"
}
```
user ini bsa unutk di pakai login 
### Admin 
Untuk Dokumentasi Api nya ada di folder ```./docs api/admin.md```
ada 6 fitur unutk admin 

1. **Create user**, fitur ini unutk membuat user baru serta mendaftarkan muka user ke dalam sebuah model
2. __Menghapus user__, Fitur ini untuk menghaous seorang user
3. __Update user__ fitur ini memungkinkan user unutk mengupdate user entah itu mengganti namawajah dan swbagainya
4. __Read user__ fitur ini untuk melihat user yang tersedia
5. __profile admin__ fitur ini untuke melihat meliaht data admin
6. __melihat Data presensi__ fitur ini untuk melihat presensi yang di baut oleh user
7. **Dashboard** Untuk melihat statiski user dan presensi

### User 
Untuk Dokumentasi Api nya ada di folder ```./docs api/user.md```
ada 3 fitur unutk user 

1. __profile user__ fitur ini untuke melihat meliaht data user
2. __presensi__ fitur ini untuk membuat presensi user
3. __dashboar__ unutk melihat statistik presensi user


