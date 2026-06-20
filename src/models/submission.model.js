import mongoose,{Schema} from "mongoose";

const submissionSchema = new Schema({

    name:{
        type:String,
        required:true,
        maxLength:100,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowerCase:true,
        trim:true
    },
    form_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    answers:[{
        questionId: { type: Schema.Types.ObjectId, required: true },
        answerValue: { type: mongoose.Schema.Types.Mixed, required: true }
    }]
},{
    timestamps:true
}
)

export const Submission = mongoose.model("Submission",submissionSchema)