# Nodepop API

## Cada anuncio muestra los siguientes datos:

* Nombre del artículo, un anuncio siempre tendrá un solo artículo

* Si el artículo se vende o se busca.

* Precio. Será el precio del artículo en caso 
de ser una oferta de venta. En caso de que
sea un anuncio de ‘se busca’ será el precio que el solicitante estaría dispuesto a
pagar.

* Foto del artículo. Cada anuncio tendrá solo una foto. 

* Tags del anuncio. Uno o varios de una lista predefinida. 


## Acceso

Los usuarios tendrán que registrarse con nombre, email y contraseña.  El API solo devolverá
anuncios a usuarios registrados.
El acceso al API se hará con autenticación, un token obtenido al autenticarse correctamente.


## API

La app estará disponible en inglés o español, por tanto el API será utilizado especificando el idioma del usuario en cada petición. Lo único que el API devolverá traducido al lenguaje del usuario son los mensajes de error.
Operaciones que realiza el API:

* Registro (nombre, email, clave). **(POST /users)**

* Autenticación (email, clave). Devuelve un token que hay que añadir al resto de las peticiones. **(POST /users/autenticate)**

* Lista de anuncios paginada. Con filtros por tag, tipo de anuncio (venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por el dato buscado). **(GET /anuncios**

* Lista de tags existentes. **(GET anuncios/tags)**


## Lista de anuncios paginada
Filtros:
* por tag, tendremos que buscar incluyendo una  condición  por tag.

* tipo de anuncio (venta o búsqueda), podemos usar un parámetro en query string llamado venta que tenga true o false.

* rango de precio (precio min. y precio max.), podemos usar un parámetro en la query string llamado precio que tenga una de estas  combinaciones :

1. 10-50  buscará  anuncios  con  precio  incluido  entre  estos  valores. 

2. 10- buscará los que tengan precio mayor que 10.

3. -50  buscará  los  que  tengan  precio  menor  de  50.

4. 50  buscará  los  que  tengan  precio  igual  a  50.

* nombre de artículo, que empiece por el dato buscado en el parámetro nombre. 

## Ejemplo

```http
GET http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50-&start=0&limit=2&sort=precio&includeTotal=true&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWZkOWFiZGE4Y2QxZDlhMjQwYzgyMzEiLCJub21icmUiOiJhZG1pbiIsImVtYWlsIjoiamFtZzQ0QGdtYWlsLmNvbSIsImNsYXZlIjoiMTIzIiwiX192IjowfQ.y8wPJhNaS8Vf51ZlX9qZBlrTLGGy4JzDgN2eGSHeQfg
```