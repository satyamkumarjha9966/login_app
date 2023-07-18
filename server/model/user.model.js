import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please Provide a UserName"],
        unique : [true, "UserName Exist"]
    },
    password : {
        type : String,
        required : [true, "Please Provide a Password"],
        unique : false
    },
    email : {
        type : String,
        required : [true, "Please Provide a E-mail"],
        unique : true
    },
    firstname : {type : String},
    lastname : {type : String},
    mobile : {type : String},
    address : {type : String},
    profile : {type : String},
});

// Password Encryption
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 8)
});

export default mongoose.model('User', UserSchema);