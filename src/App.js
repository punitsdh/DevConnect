const express = require("express");

const app = express();



app.use("/test", (req, res) => {
    res.send("test from server");
});

app.use("/hello", (req, res) => {
    res.send("hellow!  from server");
});

app.use("/",(req, res) => {
    res.send("Hello from server");
});

app.listen(7777, () =>{
    console.log("Server running on port 7777");
});