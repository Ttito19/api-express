require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect=require("./config/mongo");
const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT;
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