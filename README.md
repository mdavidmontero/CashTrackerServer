# CashTracker Servidor

## Requerimientos

- Node.js v18.x
- PostgreSQL v15.
- Tener una cuenta de Mailtrap para enviar correos electrónicos
- Opcional: Docker Desktop

Si usas Docker Desktop, ejecutar el comando `docker-compose up -d` para crear la base de datos.

por defecto, la base de datos se creará en el puerto 5432, si tienes otro puerto, modificar el archivo docker-compose.yml
y sus valores :

```
user: cashtracker
password: 123456
database: cash
```

## Dependencias Utilizadas

- Express-validator
- Nodemailer
- bcrypt
- Express
- Morgan
- dotenv
- jsonwebtoken
- sequelize-typescript

## Instalación

1. Clonar el repositorio con el comando

```bash
git clone https://github.com/mdavidmontero/CashTrackerServer.git
```

2. Instalar dependencias con el comando

```bash
npm install
```

3.Cambiar el archivo .env.template a .env y modificar los valores de las variables

4. Ejecutar el comando

```bash
npm run dev
```

# Autor

[Mateo Rodriguez](https://github.com/mdavidmontero)

# Contribuciones

Si encuentras algún error, o tienes alguna sugerencia, por favor abre un issue o envía un pull request.
