const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send("Got user details!");
})


app.post("/user", (req, res) => {
    res.send("Updated user details!");
})

app.delete("/user", (req, res) => {
    res.send("Deleted user details!");
})

app.use("/test", (req, res) => {
    res.send("test from server");
});


app.listen(7777, () =>{
    console.log("Server running on port 7777");
});