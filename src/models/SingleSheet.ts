import mongoose, {Schema, Document, Model} from 'mongoose';

export interface ISheet extends Document{ 
  item:object
}

const SingleSheetSchema = new Schema({
  item:Schema.Types.Mixed
});

export default mongoose.model("SingleSchema", SingleSheetSchema);