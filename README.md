# Nodepop - Práctica JS, Node.js y MongoDB - Boot VI (2017)

## Despliegue
Copiar .env.example a .env y revisar los valores de configuración.

## Inicializar la base de datos
Para eliminar los registros guardados en la BBDD y cargar los datos por defecto, utilizar el comando `npm run installDB`.

## Arrancar en modo desarrollo
Para arrancar en modo desarrollo utilizar el comando `npm run dev`.
Para arrancar en modo desarrollo **en cluster** utilizar el comando `npm run devCluster`.

## Arrancar en modo de producción
Para arrancar en modo de producción utilizar el comando `npm start`.
Para arrancar en modo de producción **en cluster** utilizar el comando `npm run startCluster`.

## Linting (eslint)
Para pasar *eslint* sobre los archivos del proyecto utilizar el comando `npm run lint`

## Cambiar el puerto
Por defecto, la aplicación se ejecuta en el puerto 3000 en modo normal y el el puerto 7000 en modo cluster. Para cambiar el puerto simplemente hay que definirlo como variable de entorno antes de arrancar la aplicación. Por ejemplo: `PORT=4002 npm run dev`

## API
Más información sobre el API en [api.md](api.md).

# Práctica DevOps
URL: http://ec2-18-191-133-190.us-east-2.compute.amazonaws.com/
IP: http://18.191.133.190/
