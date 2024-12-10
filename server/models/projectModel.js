import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },

    description: { 
        type: String, 
        default: ""
    },

    details: [{ type: String }],

    deadline: { type: Date },

    completed: { 
        type: Boolean,
        default: false
    },
});

const listSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
},
    tasks: [taskSchema],
});

const workspaceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },

    lists: [listSchema],
});

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;