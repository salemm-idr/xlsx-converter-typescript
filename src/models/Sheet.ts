import mongoose, {  Schema,Document, Model } from 'mongoose';
export interface ISheet extends Document{
  item:object
}
const SheetSchema:Schema = new Schema({
item:Schema.Types.Mixed
},{strict:false})
//* Export the model and return your IUser interface
export default mongoose.model<ISheet>("Sheet",SheetSchema)