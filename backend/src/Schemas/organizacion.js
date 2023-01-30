import { Schema, model } from 'mongoose';


const orgSchema = new Schema({
    OrgName: {type: String, required: true},
    OrgMail: {type: String, required: true},
    OrgDescription: {String},
    channel: [{type: Schema.ObjectId, ref: 'Channel'}]
});

const Organizacion = model('Organizacion', orgSchema);

export default Organizacion;