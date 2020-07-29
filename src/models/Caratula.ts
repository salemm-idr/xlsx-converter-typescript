import mongoose, {Schema,Document,Model} from 'mongoose';
export interface ICaratula extends Document{
complete_name:String,
name:String,
lastName:String,
birthDate:String,
gender:String,
age:String,
residence:String,
email:String,
rfc:String,
creditCard:String,
msisdn:Number,
imsi:Number,
plansName:String,
plansDescription:String,
createDate:String,
activationDate:String,
actualizationDate:String
}
const CaratulaSchema:Schema = new Schema({
complete_name:{type:String},//nombre
name:{type:String},
lastName:{type:String},
birthDate:{type:String},
gender:{type:String},
age:{type:String},
residence:{type:String}, //direccion
email:{type:String},
rfc:{type:String},
creditCard:{type:String},
msisdn:{type:Number},
imsi:{type:Number}, //imsi
plansName:{type:String}, //plataforma
plansDescription:{type:String},
createDate:{type:String},
activationDate:{type:String}, //fecha de activacion
actualizationDate:{type:String}
})

export default mongoose.model("Caratula",CaratulaSchema)