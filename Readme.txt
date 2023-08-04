Name:- Abhishek Ame
phone number:- 7089693761
Resume link :- https://shorturl.at/ghRV4
Portfolio:- https://portfolio-44782.web.app
My 20+ Certification in Software Development, Cloud, Security, and more at :- https://shorturl.at/jtT18

****
This is the overview of the backend API developed using Node.js, Express.js, and MySQL.
It covers how to test the application using Postman and how to set up the MySQL database along with
creating the required tables.
****
Application Setup
Clone the repository from GitHub or download the source code.

Install the required dependencies using npm: npm install
Add database information like :-
host: 'localhost',
user: 'root',
password: '1234',
database: 'dpdzero',

MySQL Database Setup
Install MySQL server on your machine if you haven't already.

Log in to MySQL using the MySQL command-line client or a GUI tool.

Create a new database for the application: CREATE DATABASE your_database_name;

Create Tables in the Database
The application requires two tables: users and data_store.

Run the following SQL queries to create the tables:

USE your_database_name;

-- Table for storing user data
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  age INT,
  gender VARCHAR(20)
);

-- Table for storing key-value pairs
CREATE TABLE data_store (
  key_name VARCHAR(255) PRIMARY KEY,
  value TEXT
);

Running the Application
Start the server using the following command: npm start

The server will run on http://localhost:3000.

Testing the APIs using Postman
User Registration API

Endpoint: POST http://localhost:3000/api/register

Request Body:
{
  "username": "",
  "email": "",
  "password": "",
  "full_name": "",
  "age": ,
  "gender": ""
}


Generate Token API

Endpoint: POST http://localhost:3000/api/token

Request Body:
{
  "username": "",
  "password": ""

Store Data API

Endpoint: POST http://localhost:3000/api/data

Request Headers: Authorization: Bearer <ACCESS_TOKEN>
Request Body:
{
  "key": "unique_key",
  "value": "data_value"
}


Retrieve Data API

Endpoint: GET http://localhost:3000/api/data/unique_key

Request Headers: Authorization: Bearer <ACCESS_TOKEN>

Update Data API

Endpoint: PUT http://localhost:3000/api/data/unique_key

Request Headers: Authorization: Bearer <ACCESS_TOKEN>

Request Body:
{
  "value": "new_data_value"
}
Delete Data API

Endpoint: DELETE http://localhost:3000/api/data/unique_key

Request Headers:Authorization: Bearer <ACCESS_TOKEN>







