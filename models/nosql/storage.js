const mongoose=require("mongoose");
const StorageCheme=new mongoose.Schema(
{
url:{
    type:String
},
filename:{
    type:String 
}
},{
    timestamps:true, //todo createAt,updatedAt
    versionKey:false
}

);
module.exports=mongoose.model("storage",StorageCheme)