import mongoose, {  Schema,Document, Model } from 'mongoose';

export interface ISheet extends Document{

}
const SheetSchema:Schema = new Schema({

})
//* Export the model and return your IUser interface
export default mongoose.model<ISheet>("Sheet",SheetSchema)