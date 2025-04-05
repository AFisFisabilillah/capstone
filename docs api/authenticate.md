# AUTHENTICATE

<p>Untuk Atuhenticate<p>


## Login

Endpoint : POST ``` /api/auth/login ```

Header : 

- Content-Type : application/json

Request :
```
{
    "nis" : "afis@gmail.com",
    "password" : "2112-7"
}
 ```

Response (success)
```
{
    "status": "success",
    "message": "berhasil login",
    "data": {
        "id": 1,
        "name": "Afis2112",
        "nis": "afis@gmail.com",
        "alamat": "cikiwul",
        "token": "1|fnFfPIryX3tVWmsLeAM7hfWwVTS70ga4l8qShwV7ba8ad907"
    }
}
```
Response (Failed):
```
{
    "status": false,
    "message": "gagal login",
    "errors": "Password Atau Username salah"
}
```

## Logout

Endpoint : GET ``` /api/auth/logout ```

Header : 

- Content-Type : application/json
- Authorization : Bearer {token}

Response (success)

``` 
{
    "status": "success",
    "message": "Logout berhasil"
}
```

Response (failed, 401)

``` 
{
    "message": "Unauthenticated."
}
```

