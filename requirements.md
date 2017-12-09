# Práctica JS/Node.js/MongoDB Boot VI (2017)

## Cada anuncio mostrará los siguientes datos:

* Nombre del artículo, un anuncio siempre tendrá un solo artículo

* Si el artículo se vende o se busca

* Precio. Será el precio del artículo en caso 
de ser una oferta de venta. En caso de que
sea un anuncio de ‘se busca’ será el precio que el solicitante estaría dispuesto a
pagar

* Foto del artículo. Cada anuncio tendrá solo una foto. Las imágenes estarán alojadas en `images/anuncios/`

* Tags del anuncio. Podrá contener uno o varios de estos cuatro: work, lifestyle, motor
y mobile

```js
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});
```

## Acceso

Los usuarios tendrán que registrarse con nombre, email y contraseña.  El API solo devolverá
anuncios a usuarios registrados.
El acceso al API se hará con autenticación, usando JWT (JSON Web Token).


## API

La app estará disponible en inglés o español, por tanto el API será utilizado especificando el idioma del usuario en cada petición. Los tags se tratarán siempre en inglés por tanto no necesitan traducciones. Lo único que el API devolverá traducido al lenguaje del usuario son los mensajes de error, ya que la app mostrará estos mensajes al usuario.
Operaciones que debe realizar el API:

* Registro (nombre, email, contraseña).

* Autenticación (email, contraseña).

* Lista de anuncios paginada. Con filtros por tag, tipo de anuncio (venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por el dato buscado).

* Lista de tags existentes.

Los sistemas donde se desplegará el API utilizan bases de datos MongoDB.
El API recibirá bastantes peticiones en algunos momentos del día, especialmente los fines de semana, por tanto queremos que aproveche lo mejor posible los recursos del servidor donde estará instalado.
Se solicita que el entregable venga acompañado de una mínima documentación y el código del API esté bien formateado para facilitar su mantenimiento. En esta fase, ya que se desea probar si el modelo de negocio va a funcionar, no serán necesarios ni tests unitarios ni de integración.


## Internacionalización

Solo lo haremos con los mensajes de error. Un módulo con una función que traduzca puede
ser una buena idea.
Esa función recibiría una clave, por ejemplo ‘USER_NOT_FOUND’, y la buscaría en una tabla
de literales filtrando por el idioma de la petición, por ejemplo ‘es’.
La tabla de literales puede ser perfectamente un JSON en el filesystem que nuestro módulo
cargará la primera vez que alguien le requiera.


## Registro

El registro será un método del controlador de usuarios que recibirá nombre, email y
contraseña, guardandolo en la base de datos como un nuevo usuario.
Es recomendable guardar la clave del usuario en un hash. Para hacer el hash podéis usar
algún [módulo](https://www.npmjs.com/package/sha256) que lo haga.
Cómo añadimos usuarios, podemos usar un método POST.


## Autenticación

Usaremos el ejemplo de autenticar con JSON Web Token que vimos en el curso.
Recordar crear un índice por email para que las búsquedas de usuarios vayan a toda pastilla! Podría ser un método POST al recurso /usuarios/authenticate
Es recomendable guardar la clave del usuario en un hash y luego cuando tengamos que comprobarla buscamos el usuario, hacemos el mismo algoritmo de hash sobre la candidata y comparamos los dos hashes a ver si son iguales.

## Lista de anuncios

Lista de anuncios paginada.

Filtros:
* por tag, tendremos que buscar incluyendo una  condición  por tag.

* tipo de anuncio (venta o búsqueda), podemos usar un parámetro en query string llamado venta que tenga true o false.

* rango de precio (precio min. y precio max.), podemos usar un parámetro en la query string llamado precio que tenga una de estas  combinaciones :

..* 10-50  buscará  anuncios  con  precio  incluido  entre  estos  valores { precio:
{ '$gte': '10', '$lte': '50' } }

..* 10- buscará los que tengan precio mayor que 10  { precio: { '$gte':
'10' } }

..* -50  buscará  los  que  tengan  precio  menor  de  50 { precio: { '$lte':
'50' } }
○ 50  buscará  los  que  tengan  precio  igual  a  50 { precio: '50' }

* nombre de artículo, que empiece por el dato buscado en el parámetro nombre. Una expresión  regular nos  puede  ayudar filters.nombre = new RegExp('^' + req.query.nombre, "i");
Para recibir la lista de anuncios, la llamada podría ser una como esta:

```http
GET http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50-&start=0&limit=2&sort=precio&includeTotal=true&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWZkOWFiZGE4Y2QxZDlhMjQwYzgyMzEiLCJub21icmUiOiJhZG1pbiIsImVtYWlsIjoiamFtZzQ0QGdtYWlsLmNvbSIsImNsYXZlIjoiMTIzIiwiX192IjowfQ.y8wPJhNaS8Vf51ZlX9qZBlrTLGGy4JzDgN2eGSHeQfg
Nos piden que aproveche los recursos, por tanto pondremos cluster.
```