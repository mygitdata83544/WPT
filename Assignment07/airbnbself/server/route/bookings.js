


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

   
  
  
    app.post("/",(request,response)=>{


    var connection = mysql.createConnection(connectionString);
    connection.connect();
    var propertyid=request.body.id;
    var email=request.body.email;
    var password=request.body.password;

    var rent;
    var userid;
    let query=`select rent from property where id=${propertyid} ;`;
    
    connection.query(query, (err, result)=>{
                                                //response.setHeader("Content-Type", "application/json");
                                                if(err==null)
                                                {
                                                   
                                                   rent=result[0].rent;
                                                   rent=parseInt(request.body.totaldays)*rent;
                                                   console.log(rent);
                                                   
                                                   
                                                   let querytext=`select id from user where email='${email}' and password='${password}';`;
                                                   connection.query(querytext, (err, result)=>{
                                                    //response.setHeader("Content-Type", "application/json");
                                                    if(err==null)
                                                    {
                                                       
                                                      userid=result[0].id;
                                                      console.log(userid);

                                                      //insert into bookings(userId,propertyId,fromDate,toDate,total) values(2,5,'2024-05-8','2024-05-10',500);
                                                       
                                                      let querytext=`insert into bookings(userId,propertyId,fromDate,toDate,total) values(${userid},${propertyid},'${request.body.fromDate}','${request.body.toDate}',${rent});`;
                                                      connection.query(querytext, (err, result)=>{
                                                       //response.setHeader("Content-Type", "application/json");
                                                       if(err==null)
                                                       {
                    
                                                        let querytext=`select * from bookings where userId=${userid};`;
                                                        connection.query(querytext, (err, result)=>{
                                                         //response.setHeader("Content-Type", "application/json");
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
                                                       }
                                                       else
                                                       {
                                                           response.write(JSON.stringify(err));
                                                           connection.end();
                                                           response.end();
                                                       }
                                                   });

                                            
                                                    }
                                                    else
                                                    {
                                                        response.write(JSON.stringify(err));
                                                        connection.end();
                                                        response.end();
                                                    }
                                                });
                                       

                                            
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
POST  http://127.0.0.1:9999/bookings

{
 
    "email": "polavdhut99@gmail.com",
    "password": "avdhut@123",
    "id":5,
    "fromDate":"2024-5-8",
    "toDate":"2024-7-8",
    "totaldays":2,
   
}


op--> json array returned

[
    {
        "id": 3,
        "userId": 2,
        "propertyId": 5,
        "fromDate": "2024-5-8",
        "toDate": "2024-7-8",
        "total": 80000,
        "createdTimestamp": "2024-05-06T05:56:28.000Z"
    }
]



*/

module.exports=app;