import { Workspace } from '../models/workspaceModel.js';

// THIS IS FOR THE WORKSPACES
export const getWorkspace = async (req, res) => {
    const userId = req.userId;

    try{
        const workspaces = await Workspace.find({ userId });

        if(!workspaces || workspaces.length === 0){
            res.status(400).json({success: false, message: `No workspace(s) found.`});
        }

        res.status(200).json({ success: true, workspaces });
    }catch(err){
        console.log(err);
        res.status(500).json({ success: false, message: `Server error: ${err.message}`})
    }
}

export const addWorkspace = async (req, res) => {
    const { name, image, color } = req.body;
    //console.log(`${name}, ${color}`)
    const userId = req.userId;

    if (!name || !color) {
        return res.status(400).json({ success: false, message: "name and/or color are required!" });
    }

    try {
        const newWorkspace = new Workspace({
            name: name,
            image: image,
            color: color,
            userId: userId,
            lists: []
        });

        await newWorkspace.save();

        res.status(201).json({ success: true, workspace: newWorkspace });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error, could not create workspace." });
    }
};

export const deleteWorkspace = async (req, res) => {  
    try{
        const { workspaceId } = req.params; 
        const userId = req.userId;

        const workspace = await Workspace.findOneAndDelete({ _id: workspaceId, userId: userId});
        // Runs condition if workspace = null
        if(!workspace){
            res.status(400).json({ 
                success: false, 
                message: `Cannot find workspace by ID: ${workspaceId}`
            })
        }
        res.status(200).json({success: true, message: "Sucessfully deleted."})
    }catch(err){
        res.status(500).json({ success: false, message: `Server error: ${err.message}` })
    }
};





// THIS IS FOR THE LISTS
export const getList = async (req, res) => {
    const userId = req.userId;
    const { workspaceId } = req.params;

    try{
        const workspace = await Workspace.findOne({ _id: workspaceId, userId: userId });

        if(!workspace){
            return res.status(400).json({ success: false, message: "Workspace not found"})
        }

        res.status(200).json({ success: true, lists: workspace.lists})
    }catch(err){
        res.status(500).json({ success: false, message: `Server error: ${err.message}` })
    }
}

export const addList = async (req, res) => {
    const { title } = req.body;
    const { workspaceId } = req.params;
    const userId = req.userId;

    try {
        const workspace = await Workspace.findOne({ _id: workspaceId, userId: userId });

        if (!workspace) {
            return res.status(400).json({ success: false, message: "Workspace not found!" });
        }

        // Create a new list with the provided title
        const newList = { title };  // Ensure title is passed to the list

        // Push the new list to the workspace's lists array
        workspace.lists.push(newList);

        await workspace.save();  // Save the workspace with the new list

        res.status(200).json({ success: true, message: "List added successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
};

    // should I add an edit list name??

export const deleteList = async (req, res) => {
    try {
        const { workspaceId, listId } = req.params;
        const userId = req.userId;

        const workspace = await Workspace.findOne({ _id: workspaceId, userId: userId });

        if (!workspace) {
            return res.status(400).json({ success: false, message: "Workspace not found!" });
        }

        const updatedWorkspace = await Workspace.findOneAndUpdate(
            { _id: workspaceId, userId: userId },
            { $pull: { lists: { _id: listId } } },
            { new: true }
        );

        if (!updatedWorkspace) {
            return res.status(400).json({ success: false, message: "Failed to delete the list!" });
        }

        res.status(200).json({ success: true, message: "List deleted successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
};





// THIS IS FOR THE TASKS
export const getTasks = async (req, res) => {
    const userId = req.userId;
    const { workspaceId, listId } = req.params;

    try{
        const workspace = await Workspace.findOne({ _id: workspaceId, userId });
        const list = workspace.lists.find(list => list._id.toString() === listId);
        if(!workspace || !list){
            return res
                .status(400)
                .json({ 
                    success: false, 
                    message: "Workspace/List not found!"
                });
        }

        res.status(200).json({ success: true, tasks: list.tasks })
    }catch(err){
        res.status(500).json({ success: false, message: `Server error: ${err.message}`})
    }
}

export const createTask = async (req, res) => {
    const userId = req.userId;
    const { workspaceId, listId } = req.params;
    const { task, description, details, deadline } = req.body;

    try{
        const workspace = await Workspace.findOne({ _id: workspaceId, userId });
        const list = workspace.lists.find(list => list._id.toString() === listId);

        if(!workspace || !list || !task){
            return res.status(400).json({ success: false, message: "Workspace/List does not exist!" })
        }

        const newTask = { task, description, details, deadline };

        list.tasks.push(newTask);

        await workspace.save();

        res.status(200).json({ success: true, message: "Task successfully added!" })

    }catch(err){
        res.status(500).json({ success: false, message: `Server error: ${err.message}` })
    }
};

    // maybe use useEffect() for the crossing out of the task? 🤔

export const editTask = async (req, res) => {
    const { workspaceId, listId, taskId } = req.params;
    const { task, description, details, deadline, completed } = req.body;

    try {
        const workspace = await Workspace.findOne({ _id: workspaceId, userId: req.userId });
        const list = workspace.lists.find(list => list._id.toString() === listId);
        const taskToEdit = list.tasks.find(task => task._id.toString() === taskId);
        if (!workspace || !list || !taskToEdit) {
            return res.status(400).json({ success: false, message: "Workspace not found!" });
        }

        taskToEdit.task = task || taskToEdit.task;
        taskToEdit.description = description || taskToEdit.description;
        taskToEdit.details = details || taskToEdit.details;
        taskToEdit.deadline = deadline || taskToEdit.deadline;
        taskToEdit.completed = completed !== undefined ? completed : taskToEdit.completed; 

        await workspace.save();

        res.status(200).json({ success: true, message: "Task successfully updated!" });
    } catch (err) {
        res.status(500).json({ success: false, message: `Server error: ${err.message}` });
    }
};
    

export const deleteTask = async (req, res) => {
    const userId = req.userId;
    const { workspaceId, listId, taskId } = req.params;

    try{
        const workspace = await Workspace.findOne({ _id: workspaceId, userId });
        const list = workspace.lists.find(list => list._id.toString() === listId);
        if(!workspaceId || !listId || !taskId){
            return res.status(400).json({ success: false, message: `Workspace/List/Task does not exist!`})
        }
        const updatedWorkspace = await Workspace.findOneAndUpdate(
            { _id: workspaceId, userId, "lists._id": listId },
            { $pull: { "lists.$.tasks": { _id: taskId } } },
            { new: true }
        );

        if(!updatedWorkspace){
            return res.status(400).json({ success: false, message: "Task does not exist!"})
        }

        res.status(200).json({ success: true, message: "Task deleted successfully!"})
    }catch(err){
        res.status(500).json({ success: false, message: `Server error ${err.message}` })
    }
};