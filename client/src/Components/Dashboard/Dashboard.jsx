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