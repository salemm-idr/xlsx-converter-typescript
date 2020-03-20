import mongoose, {  Schema,Document, Model } from 'mongoose';

export interface ISheet extends Document{
name:string
}
const SheetSchema:Schema = new Schema({
name:{type:String}
})
//* Export the model and return your IUser interface
export default mongoose.model<ISheet>("Sheet",SheetSchema)