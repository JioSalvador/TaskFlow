import { useState } from 'react';
import './Dashboard.css';
import Header from './dashboardComponents/Header';
import Sidebar from './dashboardComponents/Sidebar';
import Main from './dashboardComponents/Main';
import { BoardContext } from './dashboardContext/BoardContext';

function Dashboard() {
  const boardData = {
    active: 0,
    boards: [
      {
        name: 'My TaskFlow',
        bgcolor: '#069',
        list: [
          { id: '1', title: 'To do', items: [{ id: 'cdrFt', title: 'Project Description 1' }] },
          { id: '2', title: 'In Progress', items: [{ id: 'cdrFv', title: 'Project Description 2' }] },
          { id: '3', title: 'Done', items: [{ id: 'cdrFb', title: 'Project Description 3' }] },
        ],
      },
    ],
  };

  const [allboard, setAllBoard] = useState(boardData); 
  const [activeWorkspace, setActiveWorkspace] = useState(null); // Track the selected workspace

  return (
    <>
      <Header />
      <BoardContext.Provider value={{ allboard, setAllBoard }}>
        <div className='dashboardContent'>
          {/* Pass setActiveWorkspace to Sidebar to allow workspace selection */}
          <Sidebar onSelectWorkspace={setActiveWorkspace} />

          <div className='dashboardContentMain'>
            {/* Render Main content dynamically based on activeWorkspace */}
            <Main activeWorkspace={activeWorkspace} />
          </div>
        </div>
      </BoardContext.Provider>
    </>
  );
}

export default Dashboard;
