require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const loggerStream=require("./utils/handleLogger");
const dbConnect = require("./config/mongo");
const app = express();
app.use(cors())
app.use(express.json())
/**
 * 
 * podamos accecer de manera más facil a la imagen  http://localhost:3000/file-1655482584231.jpg
 * 
 */
app.use(express.static("storage"));

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
})

const port = process.env.PORT || 3000;
/**
 * 
 * Aquí invocamos a las rutas
 * 
 */
//TODO localhost/api/_________
app.use("/api", require("./routes"));

app.listen(port, () => {
    console.log(`Tu app está lista por http://localhost:${port}`);
})

dbConnect();