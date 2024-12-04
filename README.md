# webOconnect

to start frontend: 
cd client
npm install --legacy-peer-deps

to start backend:
cd server
npm install --legacy-peer-deps
create database and tables given in sql file
create .env file in same level as package.json 

.env file:
PORT=5000
DB_HOST=localhost
DB_USER="your_db_user_name"
DB_PASSWORD="your_password"
DB_NAME="your_db_name"
JWT_SECRET="your_jwt_secret"
