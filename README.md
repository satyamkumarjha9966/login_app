In this Project introduces the Login App, a full-stack application with a robust frontend developed using React.js and a backend powered by Express.js. The app provides a comprehensive set of features for user authentication, registration, password management, and profile management. It leverages various packages, tools, and databases to ensure a secure, smooth, and user-friendly experience. Below are the key points of this implementation:

# Frontend with React.js:

## Registration Page: 
The frontend includes a user-friendly registration page where new users can create an account by providing their email, username, and password. The Formik package is utilized for form handling and validation, while axios is used for making API requests to the backend for user registration.

## Login Page: 
Users can log in to their accounts using the login page. The app uses JWT (JSON Web Token) for secure authentication, and jwt-decode is employed to decode the token to extract user information. react-hot-toast is utilized for displaying informative and visually appealing toast messages.

## Change Password: 
The app allows authenticated users to change their passwords securely. The frontend provides a password change form, which is submitted to the backend through an API endpoint for updating the user's password.

## Forgot Password and Reset Password: 
The app incorporates the forgot password functionality, where users can request a password reset link. Nodemailer is used in the backend to send password reset emails to the users. The frontend provides a password reset form where users can enter a new password after following the link from their email.

## Profile Page: 
Authenticated users have access to their profile page, displaying their account information. Zustand is used for state management, ensuring efficient and responsive handling of user data.

## React Router Dom: 
The app utilizes React Router Dom for client-side routing, enabling seamless navigation between different pages without requiring a full page reload.

# Backend with Express.js:

## Authentication and Authorization: 
The backend provides RESTful API routes for user authentication and authorization. The app uses JWT for generating and verifying tokens to ensure secure access to protected routes.

## Register API: 
The backend has an API endpoint for user registration, where new user information is saved securely to the MongoDB database. bcrypt is used for hashing and salting passwords, providing additional security.

## Login API: 
The login API endpoint handles user login requests, verifies the credentials, and returns a JWT token upon successful authentication.

## Logout API: 
The app includes a logout API to invalidate the user's JWT token and log them out.

## Reset Password API: 
The backend exposes an API endpoint to process password reset requests. When a user requests a password reset, the backend generates a unique token and sends an email with a link to reset the password.

## Update User and Change Password API:
The backend provides API endpoints for updating user information, including profile updates and password changes.

## Get Profile API: 
The backend has an API endpoint to fetch user profile information based on the JWT token.

# Essential Packages:

## Nodemon and Morgan: 
Nodemon is used in the development environment to automatically restart the server upon changes, while Morgan logs HTTP requests for debugging purposes.

## Multer and Cloudinary: 
Multer is used for handling file uploads, and Cloudinary is integrated to securely store and manage user profile pictures.

## Mongoose and MongoDB:
The backend uses Mongoose as an Object-Document Mapper (ODM) to interact with the MongoDB database. MongoDB is employed as the database for storing user information and passwords.

## JWT, Email Validator, Dotenv, CORS, Cookie Parser, and Bcrypt: 
JWT is utilized for generating and verifying tokens, Email Validator validates user email addresses, Dotenv manages environment variables, CORS enables cross-origin resource sharing, Cookie Parser handles cookies, and Bcrypt is employed for password hashing and salting.


![Screenshot (389)](https://github.com/satyamkumarjha9966/login_app/assets/123254088/20415592-2621-477e-9623-37237c4b6232)
![Screenshot (388)](https://github.com/satyamkumarjha9966/login_app/assets/123254088/58f04845-222d-463d-a8dc-7a79c72e6a6b)

