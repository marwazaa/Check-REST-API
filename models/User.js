const mongoose=require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    adress:{
        type:String
    }
}); 

module.exports = mongoose.model('Users',UserSchema);