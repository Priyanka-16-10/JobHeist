import { request } from "express";
import mongoose from "mongoose";

const compSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String // url to company logo
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
},{timestamps: true});

export const CompUser = mongoose.model('CompUser', compSchema);