import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/workspace";

axios.defaults.withCredentials = true;

export const useWorkspaceStore = create((set) => ({
  workspaces: [],
  isLoading: false,
  error: null,


  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ workspaces: response.data.workspaces, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error fetching workspaces", isLoading: false });
    }
  },

  createWorkspace: async (name, color) => {
    set({ error: null });
    try {
      const response = await axios.post(API_URL, { name, color });
      set((state) => ({
        workspaces: [...state.workspaces, response.data.workspace],
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Error creating workspace" });
    }
  },

  deleteWorkspace: async (workspaceId) => {
    set({ error: null });
    try {
      await axios.delete(`${API_URL}/${workspaceId}`);
      set((state) => ({
        workspaces: state.workspaces.filter((workspace) => workspace._id !== workspaceId),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || "Error deleting workspace" });
    }
  },

  addList: async (workspaceId, title) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/${workspaceId}/lists`, { title });
      set((state) => {
        const updatedWorkspaces = state.workspaces.map((workspace) =>
          workspace._id === workspaceId ? { ...workspace, lists: [...workspace.lists, response.data.list] } : workspace
        );
        return { workspaces: updatedWorkspaces };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error adding list" });
    }
  },

  deleteList: async (workspaceId, listId) => {
    set({ error: null });
    try {
      await axios.delete(`${API_URL}/${workspaceId}/lists/${listId}`);
      set((state) => {
        const updatedWorkspaces = state.workspaces.map((workspace) =>
          workspace._id === workspaceId
            ? { ...workspace, lists: workspace.lists.filter((list) => list._id !== listId) }
            : workspace
        );
        return { workspaces: updatedWorkspaces };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error deleting list" });
    }
  },

  addTask: async (workspaceId, listId, task) => {
    set({ error: null });
    try {
      const response = await axios.post(`${API_URL}/${workspaceId}/lists/${listId}/tasks`, task);
      set((state) => {
        const updatedWorkspaces = state.workspaces.map((workspace) =>
          workspace._id === workspaceId
            ? {
                ...workspace,
                lists: workspace.lists.map((list) =>
                  list._id === listId ? { ...list, tasks: [...list.tasks, response.data.task] } : list
                ),
              }
            : workspace
        );
        return { workspaces: updatedWorkspaces };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error adding task" });
    }
  },

  editTask: async (workspaceId, listId, taskId, updatedTask) => {
    set({ error: null });
    try {
      const response = await axios.put(
        `${API_URL}/${workspaceId}/lists/${listId}/tasks/${taskId}`,
        updatedTask
      );

      set((state) => {
        const updatedWorkspaces = state.workspaces.map((workspace) =>
          workspace._id === workspaceId
            ? {
                ...workspace,
                lists: workspace.lists.map((list) =>
                  list._id === listId
                    ? {
                        ...list,
                        tasks: list.tasks.map((task) =>
                          task._id === taskId ? { ...task, ...updatedTask } : task
                        ),
                      }
                    : list
                ),
              }
            : workspace
        );
        return { workspaces: updatedWorkspaces };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error editing task" });
    }
  },

  deleteTask: async (workspaceId, listId, taskId) => {
    set({ error: null });
    try {
      await axios.delete(`${API_URL}/${workspaceId}/lists/${listId}/tasks/${taskId}`);
      set((state) => {
        const updatedWorkspaces = state.workspaces.map((workspace) =>
          workspace._id === workspaceId
            ? {
                ...workspace,
                lists: workspace.lists.map((list) =>
                  list._id === listId
                    ? { ...list, tasks: list.tasks.filter((task) => task._id !== taskId) }
                    : list
                ),
              }
            : workspace
        );
        return { workspaces: updatedWorkspaces };
      });
    } catch (err) {
      set({ error: err.response?.data?.message || "Error deleting task" });
    }
  },
}));