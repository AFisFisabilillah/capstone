# ADMIN

# Profile 
Endpoint : GET ``` /api/dashboard ```

Header : 

- Authorization : Bearer {token}

Response (success) :

```
{
    "status": "success",
    "message": "data user",
    "data": {
        "id": 1,
        "name": "Afis2112",
        "nis": null,
        "alamat": "cikiwul",
        "role": "ADMIN"
    }
}
```

# Create User 
Endpoint : POST ``` /api/admin/users ```

Header : 

- Content-Type : multipart/form-data
- Authorization : Bearer {token}

request (success) :

```
{
    "name": "afis",
    "email": "afis@gmail.com",
    "password": "12345",
    "alamat": "bekasi",
    "role": "ADMIN/SISWA",
    "photo": "image.jpg",

}
```

Response (success) : 
```
{
    "status": "success",
    "message": "berhasil menambhakan user",
    "data": {
        "id": 2,
        "name": "thor",
        "email": "thor@gmail.com",
        "alamat": "cikiwul",
        "role": "SISWA",
        "photo": "http://localhost:8000/storage/photos/76c872ff-df6b-4108-8ce0-f71ea8a0c068_thor2.jpeg"
    }
}
```
Response (failed, 422 ) : 
```
{
    "message": "The email has already been taken. (and 2 more errors)",
    "errors": {
        "email": [
            "The email has already been taken."
        ],
        "alamat": [
            "The alamat field is required."
        ],
        "role": [
            "The role field is required."
        ]
    }
}
```


# Update User
Endpoint : POST ``` /api/admin/users/{id} ```

Header : 

- Content-Type : multipart/form-data
- Authorization : Bearer {token}

request (success) :

```
{
    "name": "afis",
    "alamat": "bekasi",
    "role": "ADMIN/SISWA",
    "photo": "image.jpg",

}
```

Response (success) : 
```
{
    "status": "success",
    "message": "berhasil menambhakan user",
    "data": {
        "id": 2,
        "name": "thor",
        "email": "thor@gmail.com",
        "alamat": "cikiwul",
        "role": "SISWA",
        "photo": "http://localhost:8000/storage/photos/76c872ff-df6b-4108-8ce0-f71ea8a0c068_thor2.jpeg"
    }
}
```
Response (failed, 422 ) : 
```
{
    "message": "The email has already been taken. (and 2 more errors)",
    "errors": {
        "email": [
            "The email has already been taken."
        ],
        "alamat": [
            "The alamat field is required."
        ],
        "role": [
            "The role field is required."
        ]
    }
}
```

# Get User
Endpoint : GET ``` /api/admin/users ```

Header : 

- Authorization : Bearer {token}

query : 

- ?q = String name;
- ?limit = int limpi per page

Response (success) : 
```
{
    "status": "success",
    "message": "berhasil update user user",
    "data": [
        {
            "id": 1,
            "name": "Afis2112",
            "email": "afis@gmail.com",
            "alamat": "cikiwul",
            "role": "ADMIN",
            "photo": "http://localhost:8000/storage/afis.jpg"
        },
        {
            "id": 2,
            "name": "thor",
            "email": "thor@gmail.com",
            "alamat": "cikiwul",
            "role": "SISWA",
            "photo": "http://localhost:8000/storage/photos/328d2084-ece8-4dc5-b45b-f6836409fa7f_thor4.jpeg"
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 2,
        "next_page_url": null,
        "prev_page_url": null
    }
}
```

Response (failed, 401) : 
```
{
    "message" : "unauthorizq"
}
```

## DELETE 

Endpoint : DELETE ``` /api/admin/users/{id} ```

Header : 

- Authorization : Bearer {token}

Response (success) :
```
{
    "status": "success",
    "message": "berhasil menghapus user",
    "data": {
        "id": 2,
        "name": "thor",
        "email": "thor@gmail.com",
        "alamat": "cikiwul",
        "role": "SISWA",
        "photo": "http://localhost:8000/storage/photos/328d2084-ece8-4dc5-b45b-f6836409fa7f_thor4.jpeg"
    }
}
```

# Get detail User
Endpoint : GET ``` /api/admin/users/{id}```

Header : 

- Authorization : Bearer {token}



Response (success) : 
```
{
    "status": "success",
    "message": "berhasil mendapatkan user",
    "data": {
        "profile": {
            "id": 3,
            "name": "thor",
            "email": "thor@gmail.com",
            "alamat": "galaxy dsa",
            "role": "SISWA",
            "photo": "http://localhost:8000/storage/photos/83d930f8-ed14-48d6-a1f3-342d6f22c5fb_thor2.jpeg"
        },
        "absensi": [
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
        ]
    }
}
```

Response (failed, 404) : 
```
{
    "status": "error",
    "message": "gagal meneumkan user  user"
}
```
