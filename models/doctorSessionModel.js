//book a session

const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const doctorSessionSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    shift:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        path:String,
    },
    doctorId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

module.exports=mongoose.model("DoctorSession",doctorSessionSchema);
