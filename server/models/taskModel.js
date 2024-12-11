import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    task: { 
        type: String, 
        required: true
    },

    description: { 
        type: String, 
        required: true,
    },

    details: [{ type: String }],

    deadline: { type: Date },

    completed: { 
        type: Boolean,
        default: false
    },
});

export default taskSchema