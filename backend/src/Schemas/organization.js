import { Schema, model } from 'mongoose';


const orgSchema = new Schema({
    OrgName: {type: String, required: true},
    OrgMail: {type: String, required: true},
    OrgDescription: String
});

const Organization = model('Organization', orgSchema);

export default Organization;