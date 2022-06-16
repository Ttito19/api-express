const express=require("express");
const fs=require("fs");
const router= express.Router();

const PATH_ROUTES=__dirname;
const removeExtension=(fileName)=>{
      //remover la extension del archivo de routes
    //   shift obtener el primer valor dek array
 return fileName.split(".").shift();
}


fs.readdirSync(PATH_ROUTES).filter((file)=>{
  const name=removeExtension(file)//TODO index, tracks

  if(name!=="index"){
    router.use(`/${name}`,require(`./${file}`))//TODO  http://loclahost:3000/api/tracks
  }
})


module.exports=router