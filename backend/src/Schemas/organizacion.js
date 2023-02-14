import { Schema, model } from 'mongoose';


const orgSchema = new Schema({
    OrgName: {type: String, required: true},
    OrgMail: {type: String, required: true},
    OrgDescription: String,
    user: [{type: Schema.ObjectId, ref: 'User'}],
    chat: [{type: Schema.ObjectId, ref: 'Chat'}]
    //creo que organización no debería tener Chat
});

const Organizacion = model('Organizacion', orgSchema);

export default Organizacion;