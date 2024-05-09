

const express=require('express');
const app=express.Router();
const mysql=require('mysql2');


const connectionString = {
    host: "localhost",
    port: 3306,
    database: "airbnb_db",
    user: "root",
    password: "manager"
 };




 app.post("/host",(request,response)=>{
    var title = request.body.title;
    var details = request.body.details;
    var image = request.body.image;


    var connection = mysql.createConnection(connectionString);
    connection.connect();



    let queryText = 
    `insert into category(title,details,image) values('${title}','${details}','${image}')`;
     //   `insert into user(firstName,lastName,email,password,phoneNumber,isDeleted) values('${firstName}','${lastName}','${email}','${password}','${phoneNumber}',${isDeleted})`;

    console.log(queryText);
    connection.query(queryText, (err, result)=>{
                                                    response.setHeader("Content-Type", "application/json");
                                                    if(err==null)
                                                    {
                                                        response.write(JSON.stringify(result));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                    else
                                                    {
                                                        response.write(JSON.stringify(err));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                });
})
/*

POST   http://127.0.0.1:9999/category/host 

{
        "email": "polavdhut99@gmail.com",
    "password": "avdhut@123",
    "title": "hill area",
    "details": "amazone forest",
    "image": "image2"
}


*/

module.exports=app;

