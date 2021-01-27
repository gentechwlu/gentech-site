import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    signUpDate: {
        type: Date,
        default: Date.now
    },
});

export const Admin = mongoose.model('Admin', AdminSchema);