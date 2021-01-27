import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const MembersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

export const Member = mongoose.model('Member', MembersSchema);