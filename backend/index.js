const express = require("express");
const User = require("./db")
const mainrouter = require("./routes/index")
const cors = require('cors');
const app =express()
app.use(express.json())

app.use(cors());
app.use("/api/v1",mainrouter)

 app.listen(3000)
 