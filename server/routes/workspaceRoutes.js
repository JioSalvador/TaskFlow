import express from 'express'
import { 
        addList, 
        addWorkspace, 
        editTask, 
        createTask, 
        deleteList, 
        deleteWorkspace, 
        deleteTask, 
        getWorkspace,
        getList,
        getTasks,
    } from '../controllers/workspaceController.js'
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();


// Workspace
router.get('/', verifyToken, getWorkspace); // displays the workspaces in the sidebar
router.post('/', verifyToken, addWorkspace);
router.delete('/:workspaceId', verifyToken, deleteWorkspace);

// List
router.get('/:workspaceId/lists', verifyToken, getList);
router.post('/:workspaceId/lists', verifyToken, addList);
router.delete('/:workspaceId/lists/:listId', verifyToken, deleteList);

// Task
router.get('/:workspaceId/lists/:listId/tasks', verifyToken, getTasks);
router.post('/:workspaceId/lists/:listId/tasks', verifyToken, createTask);
router.put('/:workspaceId/lists/:listId/tasks/:taskId', verifyToken, editTask);
router.delete('/:workspaceId/lists/:listId/tasks/:taskId', verifyToken, deleteTask);

export default router