require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect=require("./config/mongo");
const app = express();
app.use(cors())
app.use(express.json())
/**
 * 
 * podamos accecer de manera más facil a la imagen  http://localhost:3000/file-1655482584231.jpg
 * 
 */
app.use(express.static("storage"))

const port = process.env.PORT || 3001;
/**
 * 
 * Aquí invocamos a las rutas
 * 
 */
//TODO localhost/api/_________
app.use("/api",require("./routes"));

app.listen(port, () => {
    console.log(`Tu app está lista por http://localhost:${port}`);
})

dbConnect();