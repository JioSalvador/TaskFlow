<<<<<<< HEAD
import React, { useState } from 'react';
import Board from './dashboardComponents/Board';
import './Dashboard.css';

const App = () => {
  const initialColumns = [
    { id: 'column-1', title: 'To Do' },
    { id: 'column-2', title: 'In Progress' },
    { id: 'column-3', title: 'Done' },
  ];

  const initialCards = [
    { id: 'card-1', content: 'Task 1', columnId: 'column-1' },
    { id: 'card-2', content: 'Task 2', columnId: 'column-1' },
    { id: 'card-3', content: 'Task 3', columnId: 'column-2' },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [cards, setCards] = useState(initialCards);

  const addCard = (columnId, content) => {
    const newCard = {
      id: `card-${cards.length + 1}`,
      content,
      columnId,
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <div className="App">
      <h1>TaskFlow</h1>
      <Board columns={columns} cards={cards} setCards={setCards} addCard={addCard} removeCard={removeCard} />
    </div>
  );
};

export default App;
=======
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
>>>>>>> 7e65ee4 (Initial commit with frontend and implemented workspace creation)
