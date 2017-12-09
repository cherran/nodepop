# Práctica JS/Node.js/MongoDB Boot VI (2017)

### Cada anuncio mostrará los siguientes datos:

* Nombre del artículo, un anuncio siempre tendrá un solo artículo

* Si el artículo se vende o se busca

* Precio. Será el precio del artículo en caso 
de ser una oferta de venta. En caso de que
sea un anuncio de ‘se busca’ será el precio que el solicitante estaría dispuesto a
pagar

* Foto del artículo. Cada anuncio tendrá solo una foto.

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

### Acceso

Los usuarios tendrán que registrarse con nombre, email y contraseña.  El API solo devolverá
anuncios a usuarios registrados.
El acceso al API se hará con autenticación, usando JWT (JSON Web Token).


### API

La app estará disponible en inglés o español, por tanto el API será utilizado especificando el idioma del usuario en cada petición. Los tags se tratarán siempre en inglés por tanto no necesitan traducciones. Lo único que el API devolverá traducido al lenguaje del usuario son los mensajes de error, ya que la app mostrará estos mensajes al usuario.
Operaciones que debe realizar el API:

* Registro (nombre, email, contraseña).

* Autenticación (email, contraseña).

* Lista de anuncios paginada. Con filtros por tag, tipo de anuncio (venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo (que empiece por el dato buscado).

* Lista de tags existentes.

Los sistemas donde se desplegará el API utilizan bases de datos MongoDB.
El API recibirá bastantes peticiones en algunos momentos del día, especialmente los fines de semana, por tanto queremos que aproveche lo mejor posible los recursos del servidor donde estará instalado.
Se solicita que el entregable venga acompañado de una mínima documentación y el código del API esté bien formateado para facilitar su mantenimiento. En esta fase, ya que se desea probar si el modelo de negocio va a funcionar, no serán necesarios ni tests unitarios ni de integración.


