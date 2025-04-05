const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/adminAuth");

app.use("/admin", adminAuth);

app.post("/user/login", (req, res, next) =>{
    res.send("User logged in successfully");
})

app.get("/user/data", userAuth, (req, res) => {
    res.send("user data");
});

app.get("/admin/getDetails", (req, res, next) =>{
    res.send("All data sent");
})

app.get("/admin/deleteUser", (req, res, next) => {
    res.send("User Deleted");
});


app.listen(7777, () =>{
    console.log("Server running on port 7777");
});