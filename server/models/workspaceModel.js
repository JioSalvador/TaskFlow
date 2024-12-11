import mongoose from 'mongoose'
import listSchema from './listModel.js'

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },

    color: {
        type: String,
        default: '#731703',
        required: true,
    },

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    lists: [listSchema],
});

export const Workspace = mongoose.model('Workspace', workspaceSchema)