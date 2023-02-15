import { Schema, model } from 'mongoose';


const orgSchema = new Schema({
    OrgName: {type: String, required: true},
    OrgMail: {type: String, required: true},
    OrgDescription: String,
    chat: [{type: Schema.ObjectId, ref: 'Chat'}],
    user: [{type: Schema.ObjectId, ref: 'User'}]
    
    //creo que organización no debería tener Chat
});

const Organizacion = model('Organizacion', orgSchema);

export default Organizacion;