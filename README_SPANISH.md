# Login sistem

¡Bienvenido/a a la aplicación de Next.js creada por Leonardo Decanini!

Esta aplicación está diseñada para proporcionarte un sistema de registro utilizando Next.js, una popular biblioteca de React para construir aplicaciones web modernas. Esta plantilla utiliza MongoDB como base de datos y NextAuth.js para la autenticación, además de estar escrita en TypeScript. Con esta plantilla, puedes comenzar a desarrollar tu propia aplicación con un sistema de registro integrado y expandirla según tus necesidades.

## Instalación

Sigue estos pasos para instalar y arrancar tu aplicación:

```bash
# 1. Clona este repositorio en tu máquina local:
git clone https://github.com/LeoDecanini/loginsistem.git

# 2. Navega al directorio de tu aplicación:
cd loginsistem

# 3. Instala las dependencias:
npm install
# o
yarn install

# 4. Arranca la aplicación:
npm run dev
# o
yarn dev
```

## Cómo funciona

## Arquitectura

La arquitectura de la aplicación es simple y está diseñada para ser fácilmente entendible y adaptable. A continuación, se detallan los principales componentes y su funcionamiento:

- **Página de Inicio y Registro**: La página principal de la aplicación ("/") contiene un formulario de inicio de sesión, mientras que la ruta "/signup" ofrece un formulario de registro. Ambos formularios comparten la misma estructura pero tienen funcionalidades distintas. Actualmente, estos formularios funcionan en el cliente (frontend), pero pueden ser modificados para funcionar en el servidor (backend) según sea necesario.

- **Carpeta API**: Esta carpeta contiene las rutas relacionadas con la lógica de autenticación y registro. La ruta de registro se encarga de almacenar los usuarios en la base de datos MongoDB, mientras que la ruta de inicio de sesión utiliza NextAuth.js para la autenticación. Estas rutas son completamente editables y pueden ser personalizadas según los requisitos del proyecto. 

- **Carpeta "lib"**: En esta carpeta se encuentra el archivo "mongoose.ts", el cual se encarga de establecer la conexión con la base de datos MongoDB utilizando Mongoose, una biblioteca de modelado de objetos MongoDB para Node.js.

- **Archivo .env**: Se requiere crear un archivo .env para configurar las variables de entorno necesarias para el funcionamiento de la aplicación. Estas variables incluyen:
  - `MONGODB_URI`: La URL de conexión a la base de datos MongoDB.
  - `NEXTAUTH_URL`: La URL de la aplicación en el entorno local. No se debe incluir esta variable en el despliegue.
  - `NEXTAUTH_SECRET`: Una palabra clave o secreta necesaria para el funcionamiento de NextAuth.js.

Esta arquitectura proporciona una base sólida para construir y ampliar la aplicación de acuerdo a tus necesidades específicas.

## Sistema de Registro

En la ruta `/api/signup`, se encuentra la lógica para el registro de nuevos usuarios en la base de datos MongoDB. El flujo de trabajo es el siguiente:

1. Se recibe una solicitud POST que contiene la información del usuario a través de un formulario en el frontend.

2. Se valida la información recibida para asegurarse de que cumple con los requisitos necesarios: la contraseña debe tener al menos 6 caracteres, el nombre completo y el correo electrónico son obligatorios.

3. Se conecta a la base de datos MongoDB utilizando la función `connectDB` que se encuentra en el archivo `mongoose.ts`.

4. Se verifica si el correo electrónico proporcionado ya está registrado en la base de datos. Si se encuentra un usuario con el mismo correo electrónico, se devuelve un mensaje de error.

5. Si el correo electrónico no está registrado, la contraseña se cifra utilizando bcrypt y se crea un nuevo documento de usuario en la base de datos con el nombre completo, el correo electrónico y la contraseña cifrada.

6. Se devuelve el usuario recién creado como respuesta.


## Sistema de Inicio de Sesión

En la ruta `/api/[...nextauth]`, se gestiona la lógica para el inicio de sesión de los usuarios utilizando las credenciales proporcionadas. El flujo de trabajo es el siguiente:

1. Se recibe una solicitud POST que contiene las credenciales del usuario a través de un formulario en el frontend.

2. Se conecta a la base de datos MongoDB utilizando la función `connectDB`.

3. Se busca un usuario en la base de datos con el correo electrónico proporcionado en las credenciales. Si no se encuentra un usuario con ese correo electrónico, se devuelve un mensaje de error.

4. Se verifica si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos utilizando bcrypt. Si las contraseñas coinciden, se devuelve el usuario como autorizado y se establece una sesión.

5. Se devuelve un token JWT que contiene la información del usuario, incluido su ID y otros datos relevantes.

Esta es la lógica básica detrás del sistema de registro y de inicio de sesión de la aplicación. Puedes ajustar y personalizar esta lógica según tus necesidades específicas.

## Integración con MongoDB y NextAuth.js

La aplicación utiliza MongoDB como base de datos para almacenar la información de los usuarios y NextAuth.js para la autenticación de usuarios. A continuación se detallan los principales componentes y su funcionamiento:

### Modelo de Usuario (User)

En el archivo `models/users.ts`, se define el modelo de usuario utilizando Mongoose, una herramienta de modelado de objetos MongoDB para Node.js. El modelo especifica los campos del usuario (email, contraseña y nombre completo) y las validaciones asociadas a cada campo.

### Conexión con MongoDB

En el archivo `lib/mongoose.ts`, se encuentra la lógica para establecer la conexión con la base de datos MongoDB. Se utiliza la URL de conexión proporcionada en la variable de entorno `MONGODB_URI`. La conexión se realiza utilizando Mongoose, y se muestra un mensaje de éxito o error en la consola dependiendo del resultado.

### Ruta de Registro (api/signup)

En esta ruta, se gestiona la lógica para el registro de nuevos usuarios. Se reciben los datos del usuario a través de un formulario en el frontend y se validan utilizando la biblioteca Zod. Si los datos son válidos y el correo electrónico no está registrado previamente, se crea un nuevo documento de usuario en la base de datos utilizando el modelo `User`. La contraseña se cifra utilizando bcrypt antes de almacenarla en la base de datos.

### Ruta de Inicio de Sesión (api/[...nextauth])

En esta ruta, se gestiona la lógica para el inicio de sesión de los usuarios utilizando las credenciales proporcionadas. Se utiliza el proveedor de credenciales de NextAuth.js para autenticar al usuario. Se busca el usuario en la base de datos utilizando el correo electrónico proporcionado en las credenciales y se verifica si la contraseña coincide utilizando bcrypt. Si las credenciales son válidas, se devuelve un token JWT que contiene la información del usuario.

Estas son las principales integraciones de MongoDB y NextAuth.js en la aplicación, que contribuyen al funcionamiento del sistema de registro y de inicio de sesión.