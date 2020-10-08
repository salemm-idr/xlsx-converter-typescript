import { ObjectID } from "mongodb";
import mongoose, { Schema, Document, Model } from "mongoose";
export interface ICover extends Document {
  historicId: ObjectID;
  taskRequestId: ObjectID;
  complete_name: String;
  name: String;
  lastName: String;
  birthDate: String;
  gender: String;
  age: String;
  residence: String;
  formatted_address: String;
  email: String;
  rfc: String;
  creditCard: String;
  msisdn: Number;
  imsi: Number;
  plansName: String;
  plansDescription: String;
  createDate: String;
  activationDate: String;
  actualizationDate: String;
  location: Object;
}
const LOCATION = {
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
};
const CoverSchema: Schema = new Schema({
  //complete_name:{type:String},//nombre
  historicId: { type: Schema.Types.ObjectId, ref: "User" },
  taskRequestId: { type: Schema.Types.ObjectId, ref: "TaskRequest" },
  name: { type: String },
  // lastName:{type:String},
  // birthDate:{type:String},
  // gender:{type:String},
  // age:{type:String},
  residence: { type: String }, //direccion
  formatted_address: { type: String },
  // email:{type:String},
  // rfc:{type:String},
  // creditCard:{type:String},
  // msisdn:{type:Number},
  imsi: { type: String }, //imsi
  plansName: { type: String }, //plataforma
  // plansDescription:{type:String},
  // createDate:{type:String},
  activationDate: { type: String }, //fecha de activacion
  //actualizationDate:{type:String}
  location: { type: LOCATION, required: true },
});

export default mongoose.model("Cover", CoverSchema);
