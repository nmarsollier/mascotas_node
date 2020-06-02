<a name="top"></a>
# Auth Service v0.1.0

Microservicio de Autentificación

- [Imagen](#imagen)
	- [Guardar Imagen](#guardar-imagen)
	- [Obtener Imagen](#obtener-imagen)
	
- [Mascotas](#mascotas)
	- [Actualizar Mascota](#actualizar-mascota)
	- [Buscar Mascota](#buscar-mascota)
	- [Crear Mascota](#crear-mascota)
	- [Eliminar Mascota](#eliminar-mascota)
	- [Listar Mascota](#listar-mascota)
	
- [Perfil](#perfil)
	- [Actualizar Perfil](#actualizar-perfil)
	- [Guardar Imagen de Perfil](#guardar-imagen-de-perfil)
	- [Obtener Perfil](#obtener-perfil)
	
- [Provincias](#provincias)
	- [Buscar Provincia](#buscar-provincia)
	- [Crear Provincia](#crear-provincia)
	- [Eliminar Provincia](#eliminar-provincia)
	- [Listar Provincias](#listar-provincias)
	
- [Seguridad](#seguridad)
	- [Cambiar Password](#cambiar-password)
	- [Deshabilitar Usuario](#deshabilitar-usuario)
	- [Habilitar Usuario](#habilitar-usuario)
	- [Lista de Usuarios](#lista-de-usuarios)
	- [Login](#login)
	- [Logout](#logout)
	- [Otorga Permisos](#otorga-permisos)
	- [Registrar Usuario](#registrar-usuario)
	- [Revoca Permisos](#revoca-permisos)
	- [Usuario Actual](#usuario-actual)
	


# <a name='imagen'></a> Imagen

## <a name='guardar-imagen'></a> Guardar Imagen
[Back to top](#top)

<p>Guarda una imagen en la db</p>

	POST /v1/image



### Examples

Body

```
{
  "image" : "Base 64 Image Text"
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Response

```
{
  "id": "id de imagen"
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='obtener-imagen'></a> Obtener Imagen
[Back to top](#top)

<p>Obtiene una imagen</p>

	GET /v1/image/:id



### Examples

Header Autorización

```
Authorization=bearer {token}
```



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Base64 | text | <p>image response</p>|

### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
# <a name='mascotas'></a> Mascotas

## <a name='actualizar-mascota'></a> Actualizar Mascota
[Back to top](#top)

<p>Actualiza los datos de una mascota.</p>

	POST /v1/pet/:petId



### Examples

Mascota

```
{
  "id": "Id de mascota",
  "name": "Nombre de la mascota",
  "description": "Description de la mascota",
  "birthDate": date (DD/MM/YYYY),
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Mascota

```
{
  "id": "Id de mascota",
  "name": "Nombre de la mascota",
  "description": "Descripción de la mascota",
  "birthDate": date (DD/MM/YYYY),
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='buscar-mascota'></a> Buscar Mascota
[Back to top](#top)

<p>Busca una mascota por id.</p>

	GET /v1/pet/:petId



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Mascota

```
{
  "id": "Id de mascota",
  "name": "Nombre de la mascota",
  "description": "Descripción de la mascota",
  "birthDate": date (DD/MM/YYYY),
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='crear-mascota'></a> Crear Mascota
[Back to top](#top)

<p>Crea una mascota.</p>

	POST /v1/pet



### Examples

Mascota

```
{
  "id": "Id mascota"
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Mascota

```
{
  "id": "Id de mascota",
  "name": "Nombre de la mascota",
  "description": "Descripción de la mascota",
  "birthDate": date (DD/MM/YYYY),
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='eliminar-mascota'></a> Eliminar Mascota
[Back to top](#top)

<p>Eliminar una mascota.</p>

	DELETE /v1/pet/:petId



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='listar-mascota'></a> Listar Mascota
[Back to top](#top)

<p>Obtiene un listado de las mascotas del usuario actual.</p>

	GET /v1/pet



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Mascota

```
[
  {
    "id": "Id de mascota"
    "name": "Nombre de la mascota",
    "description": "Descripción de la mascota",
    "birthDate": date (DD/MM/YYYY),
  }, ...
]
```
Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
# <a name='perfil'></a> Perfil

## <a name='actualizar-perfil'></a> Actualizar Perfil
[Back to top](#top)

<p>Actualiza los datos del perfil de usuario.</p>

	POST /v1/profile



### Examples

Perfil

```
{
  "name": "Nombre y Apellido",
  "phone": "Teléfono",
  "email": "Email",
  "address": "Dirección",
  "province": "Id de provincia",
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Perfil

```
{
  "name": "Nombre y Apellido",
  "phone": "Teléfono",
  "email": "Email",
  "address": "Dirección",
  "picture": "Id de imagen",
  "province": "Id de provincia",
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='guardar-imagen-de-perfil'></a> Guardar Imagen de Perfil
[Back to top](#top)

<p>Guarda una imagen de perfil en la db y actualiza el perfil</p>

	POST /v1/profile/picture



### Examples

Body

```
{
  "image" : "Base 64 Image Text"
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Response

```
{
  "id": "id de imagen"
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='obtener-perfil'></a> Obtener Perfil
[Back to top](#top)



	GET /v1/profile



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Perfil

```
{
  "name": "Nombre y Apellido",
  "phone": "Teléfono",
  "email": "Email",
  "address": "Dirección",
  "picture": "Id de imagen",
  "province": "Id de provincia",
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
# <a name='provincias'></a> Provincias

## <a name='buscar-provincia'></a> Buscar Provincia
[Back to top](#top)

<p>Buscar una provincia.</p>

	POST /v1/province/:provinceId



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Provincia

```
{
  "name": "Nombre Provincia",
  "id": ""
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='crear-provincia'></a> Crear Provincia
[Back to top](#top)

<p>Crea o actualiza una provincia.</p>

	POST /v1/province



### Examples

Provincia

```
{
  "name": "Nombre Provincia",
  "enabled": [true|false]
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Provincia

```
{
  "name": "Nombre Provincia",
  "enabled": [true|false]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='eliminar-provincia'></a> Eliminar Provincia
[Back to top](#top)

<p>Elimina una provincia.</p>

	DELETE /v1/province/:provinceId



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Response

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='listar-provincias'></a> Listar Provincias
[Back to top](#top)

<p>Lista todas las provincias.</p>

	GET /v1/province





### Success Response

Provincia

```
[ {
   "name": "Nombre Provincia",
   "id": ""
  }, ...
]
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
# <a name='seguridad'></a> Seguridad

## <a name='cambiar-password'></a> Cambiar Password
[Back to top](#top)

<p>Cambia la contraseña del usuario actual.</p>

	POST /v1/user/password



### Examples

Body

```
{
  "currentPassword" : "{Contraseña actual}",
  "newPassword" : "{Nueva Contraseña}",
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='deshabilitar-usuario'></a> Deshabilitar Usuario
[Back to top](#top)

<p>Deshabilita un usuario en el sistema.   El usuario logueado debe tener permisos &quot;admin&quot;.</p>

	POST /v1/users/:userId/disable



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='habilitar-usuario'></a> Habilitar Usuario
[Back to top](#top)

<p>Habilita un usuario en el sistema. El usuario logueado debe tener permisos &quot;admin&quot;.</p>

	POST /v1/users/:userId/enable



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='lista-de-usuarios'></a> Lista de Usuarios
[Back to top](#top)

<p>Devuelve una lista de usuarios. El usuario logueado debe tener permisos &quot;admin&quot;.</p>

	POST /v1/users



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
[{
   "id": "{Id usuario}",
   "name": "{Nombre del usuario}",
   "login": "{Login de usuario}",
   "permissions": [
       "{Permission}"
   ],
   "enabled": true|false
  }, ...
]
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='login'></a> Login
[Back to top](#top)

<p>Loguea un usuario en el sistema.</p>

	POST /v1/users/signin



### Examples

Body

```
{
  "login": "{Login de usuario}",
  "password": "{Contraseña}"
}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
  "token": "{Token de autorización}"
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='logout'></a> Logout
[Back to top](#top)

<p>Desloguea un usuario en el sistema, invalida el token.</p>

	GET /v1/users/signout



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='otorga-permisos'></a> Otorga Permisos
[Back to top](#top)

<p>Otorga permisos al usuario indicado, el usuario logueado tiene que tener permiso &quot;admin&quot;.</p>

	POST /v1/users/:userId/grant



### Examples

Body

```
{
  "permissions" : ["{permiso}", ...],
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='registrar-usuario'></a> Registrar Usuario
[Back to top](#top)

<p>Registra un nuevo usuario en el sistema.</p>

	POST /v1/users



### Examples

Body

```
{
  "name": "{Nombre de Usuario}",
  "login": "{Login de usuario}",
  "password": "{Contraseña}"
}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
  "token": "{Token de autorización}"
}
```


### Error Response

400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='revoca-permisos'></a> Revoca Permisos
[Back to top](#top)

<p>Quita permisos al usuario indicado, el usuario logueado tiene que tener permiso &quot;admin&quot;.</p>

	POST /v1/users/:userId/revoke



### Examples

Body

```
{
  "permissions" : ["{permiso}", ...],
}
```
Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
400 Bad Request

```
HTTP/1.1 400 Bad Request
{
   "messages" : [
     {
       "path" : "{Nombre de la propiedad}",
       "message" : "{Motivo del error}"
     },
     ...
  ]
}
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
## <a name='usuario-actual'></a> Usuario Actual
[Back to top](#top)

<p>Obtiene información del usuario actual.</p>

	GET /v1/users/current



### Examples

Header Autorización

```
Authorization=bearer {token}
```


### Success Response

Respuesta

```
HTTP/1.1 200 OK
{
   "id": "{Id usuario}",
   "name": "{Nombre del usuario}",
   "login": "{Login de usuario}",
   "permissions": [
       "{Permission}"
   ]
}
```


### Error Response

401 Unauthorized

```
HTTP/1.1 401 Unauthorized
```
500 Server Error

```
HTTP/1.1 500 Internal Server Error
{
   "error" : "Not Found"
}
```
