const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const certificationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'member'],
        required: true
    },
    courses: [
        {
            docSessionId: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        }
    ],
    docSessions: [
        {
            docSessionId:{
                type: Schema.Types.ObjectId,
                ref: 'DoctorSession',
                required:true
            }
        }
    ],
    certifications:certificationSchema
});

module.exports=mongoose.model("User",userSchema);
