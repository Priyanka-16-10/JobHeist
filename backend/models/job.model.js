import bcrypt from 'bcryptjs';
import mongoose, { Schema } from "mongoose";

const { compare } = bcrypt;
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirement: {
        type: Array,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experienceLevel: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CompUser',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Application',
        }
    ]
},{timestamps: true});
export const Job = mongoose.model('Job', jobSchema);