import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Plus, X } from 'react-feather';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Popover } from 'react-tiny-popover';
import { useWorkspaceStore } from '../../../store/workspaceStore';
import { useAuthStore } from '../../../store/authStore';
import './Sidebar.css';

const Sidebar = ({ onSelectWorkspace }) => {
    const blankBoard = {
        name: '',
        bgcolor: '#f60000',
    };

    const [boardData, setBoardData] = useState(blankBoard);
    const [collapsed, setCollapsed] = useState(false);
    const [showpop, setShowpop] = useState(false);

    const { workspaces, fetchWorkspaces, createWorkspace } = useWorkspaceStore();
    const { logout } = useAuthStore();

    useEffect(() => {
        fetchWorkspaces();
    }, [fetchWorkspaces]);

    const handleCreateWorkspace = async () => {
        if (!boardData.name || !boardData.bgcolor) {
            console.error('Please provide both a workspace name and color');
            return;
        }

        await createWorkspace(boardData.name, boardData.bgcolor);
        fetchWorkspaces();
        setBoardData(blankBoard);
        setShowpop(false);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
            <div className="flex-grow">
                {collapsed && (
                    <div className="p-2">
                        <button onClick={() => setCollapsed(!collapsed)} className="hover-btn">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {!collapsed && (
                    <div>
                        <div className="workspace">
                            <h4>User's Workspaces</h4>
                            <button onClick={() => setCollapsed(!collapsed)} className="hover-btn">
                                <ChevronLeft size={18} />
                            </button>
                        </div>

                        <div className="boardlist">
                            <h6>Your Workspaces</h6>
                            <Popover
                                isOpen={showpop}
                                align="start"
                                positions={['right', 'top', 'bottom', 'left']}
                                content={
                                    <div className="popover">
                                        <button onClick={() => setShowpop(!showpop)} className="close-btn">
                                            <X size={16} />
                                        </button>
                                        <h4>Create Workspace</h4>
                                        <img src="https://placehold.co/200x120/png" alt="Workspace Preview" />
                                        <label>Workspace Title *</label>
                                        <input
                                            value={boardData.name}
                                            onChange={(e) => setBoardData({ ...boardData, name: e.target.value })}
                                            type="text"
                                        />
                                        <label>Workspace Color</label>
                                        <input
                                            value={boardData.bgcolor}
                                            onChange={(e) => setBoardData({ ...boardData, bgcolor: e.target.value })}
                                            type="color"
                                        />
                                        <button onClick={handleCreateWorkspace}>Create</button>
                                    </div>
                                }
                            >
                                <button onClick={() => setShowpop(!showpop)} className="hover-btn">
                                    <Plus size={16} />
                                </button>
                            </Popover>
                        </div>

                        {/* Render Workspaces */}
                        <ul>
                            {workspaces.length > 0 ? (
                                workspaces.map((workspace) => (
                                    <li key={workspace._id}>
                                        <button
                                            className="boardlist-item"
                                            onClick={() => onSelectWorkspace(workspace)}
                                        >
                                            <span
                                                style={{
                                                    backgroundColor: workspace.color,
                                                    width: '10px',
                                                    height: '10px',
                                                    display: 'inline-block',
                                                    marginRight: '8px',
                                                    borderRadius: '50%',
                                                }}
                                            ></span>
                                            <span>{workspace.name}</span>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No workspaces created yet.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            <div className="logout">
                <button onClick={handleLogout} className="logout-btn">
                    <MdPowerSettingsNew size={18} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
