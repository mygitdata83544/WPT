
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
    var categoryId = request.body.categoryId;
    var title = request.body.title;
    var details = request.body.details;
    var address=request.body.address;
    var contactNo=request.body.contactNo;
    var ownerName=request.body.ownerName;
    var isLakeView=request.body.isLakeView;
    var isTV=request.body.isTV;
    var isAC=request.body.isAC;
    var isWifi=request.body.isWifi;
    var isMiniBar=request.body.isMiniBar;
    var isBreakfast=request.body.isBreakfast;
    var isParking=request.body.isParking;
    var guests=request.body.guests;
    var bedrooms=request.body.bedrooms;
    var beds=request.body.beds;
    var bathrooms=request.body.bathrooms;
    var rent=request.body.rent;
    var profileImage=request.body.profileImage;


    var connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = 
    `insert into property(categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent,profileImage) values(${categoryId},'${title}','${details}','${address}','${contactNo}','${ownerName}',${isLakeView},${isTV},${isAC},${isWifi},${isMiniBar},${isBreakfast},${isParking},${guests},${bedrooms},${beds},${bathrooms},${rent},'${profileImage}')`;
        //`insert into user(firstName,lastName,email,password,phoneNumber,isDeleted) values('${firstName}','${lastName}','${email}','${password}','${phoneNumber}',${isDeleted})`;

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
POST   http://127.0.0.1:9999/property/host 

{
     "email": "polavdhut99@gmail.com",
    "password": "avdhut@123",
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
     "profileImage": "image1"
}


*/


module.exports=app;