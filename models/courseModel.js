//courses

const mongoose=require("mongoose");
const {SchemaTypes} = require("mongoose");
const Schema=mongoose.Schema;

const courseSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    courseContent:[{
        courseContentId:{
            type:Schema.Types.ObjectId,
            ref:"CourseContent",
            required:true
        }
    }]
});

module.exports=mongoose.model("Course",courseSchema);
