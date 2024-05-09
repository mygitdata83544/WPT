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

 app.post("/price",(request,response)=>{


    var connection = mysql.createConnection(connectionString);
    connection.connect();
    var price=request.body.value;

    let queryText = 
        `select * from property where rent<${price}`;

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
POST  http://127.0.0.1:9999/propertysearch/price

{
     "value":10000,
    "email": "polavdhut99@gmail.com",
    "password": "avdhut@123"
   
}


op--> json array returned


[
    {
        "id": 7,
        "categoryId": 9,
        "title": "vila",
        "details": "luxirous property",
        "address": "goa",
        "contactNo": "9387897",
        "ownerName": "virat",
        "isLakeView": 1,
        "isTV": 1,
        "isAC": 1,
        "isWifi": 1,
        "isMiniBar": 1,
        "isBreakfast": 1,
        "isParking": 1,
        "guests": 4,
        "bedrooms": 2,
        "beds": 4,
        "bathrooms": 2,
        "rent": 5000,
        "profileImage": "image",
        "createdTimestamp": "2024-05-05T07:47:56.000Z"
    },
    {
        "id": 9,
        "categoryId": 4,
        "title": "treehouse",
        "details": "luxirous property",
        "address": "satara",
        "contactNo": "9370890824",
        "ownerName": "vp",
        "isLakeView": 1,
        "isTV": 1,
        "isAC": 1,
        "isWifi": 1,
        "isMiniBar": 1,
        "isBreakfast": 1,
        "isParking": 1,
        "guests": 4,
        "bedrooms": 2,
        "beds": 4,
        "bathrooms": 2,
        "rent": 8000,
        "profileImage": "image1",
        "createdTimestamp": "2024-05-06T04:31:40.000Z"
    }
]


*/





app.post("/location",(request,response)=>{


    var connection = mysql.createConnection(connectionString);
    connection.connect();
    var location=request.body.location;

    let queryText = 
        `select * from property where address='${location}';`;

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
POST  http://127.0.0.1:9999/propertysearch/location

{
     "location":"male",
    "email": "polavdhut99@gmail.com",
    "password": "avdhut@123"
   
}


op--> json array returned

[
    {
        "id": 5,
        "categoryId": 2,
        "title": "farmhouse",
        "details": "luxirous property",
        "address": "male",
        "contactNo": "9370890824",
        "ownerName": "sp",
        "isLakeView": 1,
        "isTV": 1,
        "isAC": 1,
        "isWifi": 1,
        "isMiniBar": 1,
        "isBreakfast": 1,
        "isParking": 1,
        "guests": 4,
        "bedrooms": 2,
        "beds": 4,
        "bathrooms": 2,
        "rent": 40000,
        "profileImage": "image1",
        "createdTimestamp": "2024-05-05T07:30:09.000Z"
    },
    {
        "id": 8,
        "categoryId": 3,
        "title": "farmhouse",
        "details": "luxirous property",
        "address": "male",
        "contactNo": "9370890824",
        "ownerName": "sp",
        "isLakeView": 1,
        "isTV": 1,
        "isAC": 1,
        "isWifi": 1,
        "isMiniBar": 1,
        "isBreakfast": 1,
        "isParking": 1,
        "guests": 4,
        "bedrooms": 2,
        "beds": 4,
        "bathrooms": 2,
        "rent": 40000,
        "profileImage": "image1",
        "createdTimestamp": "2024-05-06T04:29:17.000Z"
    }
]
*/





module.exports=app;