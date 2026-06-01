import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name:{
            type : String,
            required : true,
            lowercase : true,
            trim : true,
            maxLength :30 
        },
        username:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            minLength: 5,
            maxLength :30 
        },
        password:{
            type: String,
            required: true,
            minLength : 6
        },
        email:{
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        profilePicture :{
            type : String
        },
        loggedIn:{
            type:Boolean
        }
    },
    {
        timestamps : true
    }
)

//before saving any password we nedd to hash it
userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// compare passwrods

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)