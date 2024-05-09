
/*
select property.title"property",category.title"category",category.details"category details",property.details"property details",property.address,property.ownerName,property.contactNo,property.isLakeview,property.isAc,property.rent,reviews.review,reviews.rating,user.firstName"visitor" from category,property,reviews,user where property.categoryId=category.id and reviews.userId=user.id and property.id=reviews.propertyId;
*/


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


 app.post("/user",(request,response)=>{


    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = 
        `select property.title"property",category.title"category",category.details"category details",property.details"property details",property.address,property.ownerName,property.contactNo,property.isLakeview,property.isAc,property.rent,reviews.review,reviews.rating,user.firstName"visitor" 
        from category,property,reviews,user where property.categoryId=category.id and reviews.userId=user.id and property.id=reviews.propertyId;`;

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
POST  http://127.0.0.1:9999/listproperty/user

{
    "email": "polavdhut99@gmail.com",
    "password": "avdhut@123"   
}


op--> json array returned


[
    {
        "property": "vila",
        "category": "beach area",
        "category details": "red sea",
        "property details": "luxirous property",
        "address": "goa",
        "ownerName": "virat",
        "contactNo": "9387897",
        "isLakeview": 1,
        "isAc": 1,
        "rent": 5000,
        "review": "nice property",
        "rating": 5,
        "visitor": "virat"
    }
]


*/

module.exports=app;

