# Login system

Welcome to the Next.js application created by Leonardo Decanini!

This app is designed to provide you with a system of record using Next.js, a popular React library for building modern web applications. This template uses MongoDB as a database and NextAuth.js for authentication, and is written in TypeScript. With this template, you can start developing your own application with an integrated registration system and expand it according to your needs.

## Facility

Follow these steps to install and launch your application:

```bash
#1. Clone this repository to your local machine:
git clone https://github.com/LeoDecanini/loginsistem.git

#2. Navigate to your application directory:
cd loginsistem

#3. Install dependencies:
npm install
# either
yarn install

#4. Launch the app:
npm run dev
# either
yarn dev
```

## How does it work

## Architecture

The application architecture is simple and designed to be easily understandable and adaptable. The main components and their operation are detailed below:

- **Home and Registration Page**: The application's home page ("/") contains a login form, while the "/signup" path offers a registration form. Both forms share the same structure but have different functionalities. Currently, these forms work on the client (frontend), but can be modified to work on the server (backend) as needed.

- **API Folder**: This folder contains the paths related to the authentication and registration logic. The registration route is responsible for storing users in the MongoDB database, while the login route uses NextAuth.js for authentication. These routes are completely editable and can be customized according to the project requirements.

- **Folder "lib"**: In this folder is the file "mongoose.ts", which is responsible for establishing the connection with the MongoDB database using Mongoose, a MongoDB object modeling library for Node. js.

- **.env file**: It is required to create an .env file to configure the environment variables necessary for the application to function. These variables include:
   - `MONGODB_URI`: The connection URL to the MongoDB database.
   - `NEXTAUTH_URL`: The URL of the application in the local environment. This variable should not be included in the deployment.
   - `NEXTAUTH_SECRET`: A keyword or secret necessary for NextAuth.js to function.

This architecture provides a solid foundation to build and extend the application according to your specific needs.

## Registration System

In the path `/api/signup`, there is the logic for registering new users in the MongoDB database. The workflow is as follows:

1. A POST request containing the user information is received through a form on the frontend.

2. The information received is validated to ensure that it meets the necessary requirements: the password must be at least 6 characters, the full name and email are required.

3. Connect to the MongoDB database using the `connectDB` function found in the `mongoose.ts` file.

4. It is verified if the email provided is already registered in the database. If a user with the same email is found, an error message is returned.

5. If the email is not registered, the password is encrypted using bcrypt and a new user document is created in the database with the full name, email and encrypted password.

6. The newly created user is returned as a response.

## Login System

In the `/api/[...nextauth]` path, the logic for logging in users using the provided credentials is handled. The workflow is as follows:

1. A POST request containing the user's credentials is received through a form on the frontend.

2. Connects to the MongoDB database using the `connectDB` function.

3. The database is searched for a user with the email provided in the credentials. If a user with that email is not found, an error message is returned.

4. The provided password is checked to see if it matches the password stored in the database using bcrypt. If the passwords match, the user is returned as authorized and a session is established.

5. A JWT token is returned containing the user's information, including their ID and other relevant data.

This is the basic logic behind the application's registration and login system. You can adjust and customize this logic based on your specific needs.

## Integration with MongoDB and NextAuth.js

The application uses MongoDB as a database to store user information and NextAuth.js for user authentication. The main components and their operation are detailed below:

### User Model

In the `models/users.ts` file, you define the user model using Mongoose, a MongoDB object modeling tool for Node.js. The model specifies the user fields (email, password, and full name) and the validations associated with each field.

### Connection with MongoDB

In the `lib/mongoose.ts` file, there is the logic to establish the connection to the MongoDB database. The connection URL provided in the `MONGODB_URI` environment variable is used. The connection is made using Mongoose, and a success or error message is displayed in the console depending on the result.

### Registration Path (api/signup)

In this route, the logic for registering new users is managed. User data is received through a form on the frontend and validated using the Zod library. If the data is valid and the email is not previously registered, a new user document is created in the database using the `User` model. The password is encrypted using bcrypt before being stored in the database.

### Login Path (api/[...nextauth])

In this path, the logic for logging in users using the provided credentials is managed. The NextAuth.js credential provider is used to authenticate the user. The database is searched for the user using the email provided in the credentials and the password is checked for a match using bcrypt. If the credentials are valid, a JWT token containing the user information is returned.

These are the main integrations of MongoDB and NextAuth.js in the application, which contribute to the functioning of the registration and login system.