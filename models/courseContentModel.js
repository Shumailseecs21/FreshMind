// course content for each course

const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const contentItemSchema = new Schema({
    name: String,
    href: String,
    type: String
});

const courseContentSchema = new Schema({
    content: [contentItemSchema]  // Use the contentItemSchema for each item in the array
});

module.exports=mongoose.model("CourseContent",courseContentSchema);
