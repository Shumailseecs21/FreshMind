const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const courseContentSchema=new Schema({
    content:[
        {
            name:String,
            href:String,
            type:String
        }
    ]
});

module.exports=mongoose.model("CourseContent",courseContentSchema);
