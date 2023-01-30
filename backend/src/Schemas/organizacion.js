import { Schema, model } from 'mongoose';

//si tenemos la relación de este lado podemos saber la cantidad de usuarios por cada organización de forma rápida
//Ahora es una relación n a n, ya que está definida en ambos lados de los 2 schemas. Antes con la relación solo definida en User, era una relación 1 a n.

const orgSchema = new Schema({
    OrgName: {type: String, required: true},
    OrgMail: {type: String, required: true},
    OrgDescription: {String},
    user: [{type: Schema.ObjectId, ref: 'User'}],
    channel: [{type: Schema.ObjectId, ref: 'Channel'}]
});

const Organizacion = model('Organizacion', orgSchema);

export default Organizacion;