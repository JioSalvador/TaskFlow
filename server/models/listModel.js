import mongoose from 'mongoose'
import taskSchema from './taskModel.js'

const listSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
},
    tasks: [taskSchema],
});

export default listSchema