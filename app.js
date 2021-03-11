const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/",function(req,res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    console.log(fName,lName,email);

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fName,
                    LNAME : lName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url : "https://us2.api.mailchimp.com/3.0/lists/448eb3412f",
        method : "POST",
        headers : {
            "authorization" : "omkar 5d5a71746fef04e95503a44ef93ec919-us2"
        },
        body : jsonData
    }

    request(options,function(error,response,body){
        if (error) {
            res.sendFile(__dirname+"/failure.html")
        }
        else {
            if (response.statusCode===200) res.sendFile(__dirname+"/success.html");
            else {
                console.log(error);
                res.sendFile(__dirname+"/failure.html")
            }
        }
    })
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || port,function(req,res){
    console.log(`Server is running on port ${port}.`);
});







// 448eb3412f

// 5d5a71746fef04e95503a44ef93ec919-us2