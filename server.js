// if (process.env.NODE_ENV !== "production") {
//   require("ditenv").config();
// }

// imp. libraries installed using npm
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // importing bcrypt package
const initializePassport = require("./passport-config");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const collection = require('./mongodb')
app.set('view engine', 'ejs');
app.use(express.json())


app.use(express.urlencoded({ extended: false }));


//configuring the register post functionality
app.post("/register", async (req, res) => {
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password

  }
  await collection.insertMany([data]);
  res.render('login');
  
});


app.post("/login", async (req, res) => {

  try {
    const check  = await collection.findOne({email: req.body.email});
    // const dbpass=check.password;
    // const newpass=check.password;
    // const comparePasswords = async (newpass, dbpass) => {
    //   const isMatch= await bcrypt.compare(newpass, dbpass)
    //   return isMatch;
    // };
    // console.log(check.password);
    // console.log(req.body.password);
    // const isPasswordMatch = await comparePasswords(check.password, req.body.password);
    // console.log(isPasswordMatch);
    

    

    if(check.password === req.body.password){
      res.render('index.ejs')
    }
    else {
      res.send("wrong password")
    }
    
  } catch {
    res.send('wrong credentials')
    
  }

  res.render('login.ejs')
  
});



app.post("/logout", (req, res) => {
  res.render("login.ejs");
});


// start routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/login", async(req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
// end routes

app.listen(3000);
