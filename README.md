# StudentApp-CRUD
## This application consist of CRUD Operations for Student.
## Functionality includes:
  - SignUp and Login for Admin
  - Add Student.
  - Display Student List
  - Edit and Delete Student from List
## How to Setup project?
- Requirement: *[Angular](https://cli.angular.io/) and [Node.js](https://nodejs.org/en/) should be Installed*
- Clone the repository:
```git clone https://github.com/tejashreeSalvi/StudentApp-CRUD.git```
## Database MongoDB Atlas setup
- Create a account on MongoDB Atlas
- Create a Cluster
- After Cluster is created In Data Storage, Go to Clusters -> Click on connect
- Choose the Connection Method: Click on Connect your application
- Driver : NodeJS and copy the link and paste in .env file
- CONNECTION_STRING replace with mongoDB Link
- In terminal: Run ```npm start``` 
## How to run the application
### Student App Front-end
- Go to folder *student-front-end*
- Run: ```npm i``` to download the dependencies
- Run: ```ng s``` to start the server
- Now you can see U.I. for Application
- Go to browser ```https:\\localhost:4200``  and you can see Login Page. Hurray!!!!
### Student App Back-end
- Open a new terminal (Note: Keep the Front-end terminal as it is).
- Run: ```npm i``` to download the dependencies
- Run: ```npm start``` to start the server
 
