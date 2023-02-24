## App para Desarrollo web de Coderhouse

---

### Aclaraciones

---

Para correr la app, es necesario primero correr el servidor administrador de imagenes para poder obtenerlas en la app.

Para hacer esto basta con correr el archivo `[run-server.sh](http://run-server.sh)` , o instalar de manera manual los paquetes y correr el servidor.

### Detalles

---

En el caso de que las imagenes sigan sin obtenerse, entonces es probable que el puerto en el que esta corriendo este ocupado o el entorno difiera de las configuraciones del ip host en la app.

Para actualizarlo basta con cambiar la variable `server` que se encuentra en la ruta:

`app > src > app.js`
