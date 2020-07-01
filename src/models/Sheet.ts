import mongoose, {  Schema,Document, Model } from 'mongoose';

const LOCATION ={
  lat:{type:String,},
  lng:{type:String}
}
export interface ISheet extends Document{
  msisdn:String,
  type:String,
  sideA:Number,
  sideB:String,
  startDate:Date,
  startHour:Date,
  duration:Number,
  location:{
    lat:String,
    lng:String
  }
}

const SheetSchema:Schema = new Schema({
msisdn:{type:Number},
type:{type:String},
sideA:{type:Number},
sideB:{type:String},
startDate:{type:Date}, //or string
startHour:{type:Date},
duration:{type:Number},
location:{type:LOCATION},
createdAt:{type:Date}
},{strict:false})
//* Export the model and return your IUser interface
export default mongoose.model<ISheet>("Sheet",SheetSchema)


