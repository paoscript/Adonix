# Bienvenidos a mi Desarrollo del proyecto Adonix (Front-End y Back-End)

## Resumen 📕
Adonix es una Aplicación Web monolítica, cuya finalidad es brindar un sistema de información para el área de compensación y beneficios de la empresa Teleperformance.

Actualmente se requiere un sistema de información que pueda ayudar a realizar modificaciones contractuales a los registros de los aprendices que se contratan. 

## Tecnologias 👩‍💻
- Html
- CSS
- JavaScript
- NodeJs
- Handlebars
- MySQL
- Bootstrap

## Requisitos 🔍
- Git: [Cómo instalar Git](https://www.hostinger.co/tutoriales/instalar-git-en-distintos-sistemas-operativos)
- NodeJs: [Cómo instalar NodeJs](https://www.cursosgis.com/como-instalar-node-js-y-npm-en-4-pasos/)
- MySQL: [Ejemplo instalación en Windows 10](https://www.profesionalreview.com/2018/12/13/mysql-windows-10/)
- Terminal


## Cómo descargarlo 📦
- Ir al terminal y ejecutar los siguientes comandos:

```
mkdir Adonix
```
```
cd Adonix
```
```
git clone https://github.com/paoscript/Adonix.git
```
```
cd Adonix
```
```
npm i
```

## Cómo Ejecutarlo ✅
- En tu Base de Datos ejecutar los siguientes archivos:
```
1. ./sql/script_creation_database.sql
2. ./sql/script_creation_data_database.sql
```
- Crear en la raiz del proyecto un archivo con el nombre ".env"
- En el archivo ".env" colocar la siguiente información con los datos segun su caso:
```
HOST_DATABASE="<<host de tu Base de Datos>>"
USER_DATABASE="<<Nombre de usuario de tu base de datos>>"
PASSWORD_USER_DATABASE="<<Contraseña del usuario de tu base de datos>>"
NAME_DATABASE="<<Nombre de la base de datos Adonix>>"
```
- Ejecutar en la terminal el siguiente comando
```
npm run start
```



En caso de tener dudas por favor ponerse en contacto.

