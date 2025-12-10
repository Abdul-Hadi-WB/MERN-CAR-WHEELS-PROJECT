import {Schema, model} from 'mongoose'
const reviewSchema = new Schema({
name:{
    type:String,
},
address:{
 type:String,
},
comment:{
 type:String,
},
rating:{
 type:String,
 default:0,
}

},{timestamps:true});

export default reviewSchema;