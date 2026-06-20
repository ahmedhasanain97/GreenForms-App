import mongoose,{Schema} from "mongoose";

const formSchema = new Schema(
    {
       title :{
            type:String,
            required:true,
            trim:true,
            maxLength :100
       },
       createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
       },
       sharedId:{
            type:String,
            required:true,
            unique:true
       },
       questions:[{
            questionText:{
                type:String,
                required:true
            },
            questionType:{
                type:String,
            },
            options:[String]
            ,
            isRequired:{
                type:Boolean,
                default:false
            }
           }],
           responsesCount: {
                type: Number,
                default: 0
           }
    },{
        timestamps:true
    }
)


export const Form = mongoose.model("Form",formSchema)

