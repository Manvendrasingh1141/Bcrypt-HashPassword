import {Schema,model} from 'mongoose';

const userSchema = Schema({
    name: String,
    email: {type : String,required:true},
    password: String
})

const User = model("User",userSchema);

export default User