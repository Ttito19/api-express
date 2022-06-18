const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        //primer parametro en el cb es un error y el segundo un string
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        //TODO: mi-cv.pdf mi-foto.png mi-video.mp4,
        //POP:el ultimo valor de un array
        const ext = file.originalname.split(".").pop()  //TODO["name","png"]
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename)
    }
})


const uploadMiddleware = multer({storage: storage});


module.exports=uploadMiddleware;