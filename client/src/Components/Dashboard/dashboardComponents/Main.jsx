import React, { useState, useContext } from 'react';
import Modal from './Modal';  // Import the Modal component
import { Trash2, Edit2, Check, MoreHorizontal } from 'react-feather';
import CardAdd from './CardAdd';
import { BoardContext } from '../dashboardContext/BoardContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddList from './AddList';
import Utils from '../dashboardUtils/Utils';
import backgroundImage from '../../Assets/bg.gif';
import './Main.css';

const Main = () => {
    const { allboard, setAllBoard } = useContext(BoardContext);
    const bdata = allboard.boards[allboard.active];
    const [editMode, setEditMode] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [checkedTasks, setCheckedTasks] = useState({});
    const [visibleOptions, setVisibleOptions] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state
    const [selectedCard, setSelectedCard] = useState(null);  // Store selected card data

    const handleCardClick = (card) => {
        setSelectedCard(card);  // Set the clicked card data
        setIsModalOpen(true);  // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
        setSelectedCard(null);  // Clear the selected card data
    };

    // Existing drag-and-drop logic, handleCheckboxChange, etc.
    const handleCheckboxChange = (listIndex, itemIndex) => {
        const taskId = `${listIndex}-${itemIndex}`;
        setCheckedTasks(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };

    const toggleOptions = (listIndex, itemIndex) => {
        if (visibleOptions && visibleOptions.listIndex === listIndex && visibleOptions.itemIndex === itemIndex) {
            setVisibleOptions(null);
        } else {
            setVisibleOptions({ listIndex, itemIndex });
        }
    };

    function onDragEnd(res) {
        if (!res.destination) {
            console.log("No Destination");
            return;
        }
        const newList = [...bdata.list];
        const s_id = parseInt(res.source.droppableId);
        const d_id = parseInt(res.destination.droppableId);
        const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
        newList[d_id - 1].items.splice(res.destination.index, 0, removed);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const cardData = (card, ind) => {
        let newList = [...bdata.list];
        newList[ind].items.push({ 
            id: Utils.makeid(5), 
            title: card.title, 
            description: card.description,
            dueDate: card.dueDate,
            checklist: card.checklist
        });
    
        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    const listData = (e) => {
        let newList = [...bdata.list];
        newList.push(
            { id: newList.length + 1 + '', title: e, items: [] }
        );

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    }

    const handleEditClick = (listIndex, itemIndex) => {
        setEditMode({ listIndex, itemIndex });
        setEditTitle(bdata.list[listIndex].items[itemIndex].title);
    };

    const handleEditSave = () => {
        let newList = [...bdata.list];
        newList[editMode.listIndex].items[editMode.itemIndex].title = editTitle;

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setEditMode(null);
        setVisibleOptions(null);
    };

    const handleCardDelete = (listIndex, itemIndex) => {
        let newList = [...bdata.list];
        newList[listIndex].items.splice(itemIndex, 1);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
        setVisibleOptions(null);
    };

    const handleListDelete = (listIndex) => {
        let newList = [...bdata.list];
        newList.splice(listIndex, 1);

        let board_ = { ...allboard };
        board_.boards[board_.active].list = newList;
        setAllBoard(board_);
    };

    return (
        <div className='main-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className='share-section'>
                <h2>{bdata.name}</h2>
            </div>
            <div className='board-section'>
                <div className='board-scroll'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {bdata.list && bdata.list.map((x, ind) => {
                            return (
                                <div key={ind} className='list-container'>
                                    <div className="list-body">
                                        <div className='list-header'>
                                            <span>{x.title}</span>
                                            <button onClick={() => handleListDelete(ind)} className='delete-btn'>
                                                <Trash2 size={16}></Trash2>
                                            </button>
                                        </div>
                                        <Droppable droppableId={x.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className='droppable-area'
                                                    style={{ backgroundColor: snapshot.isDraggingOver ? '#222' : 'transparent' }}
                                                >
                                                    {x.items && x.items.map((item, index) => {
                                                        const taskId = `${ind}-${index}`;
                                                        return (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        onClick={() => handleCardClick(item)}  // Open modal on card click
                                                                    >
                                                                        {item.title}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}

                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>

                                        <CardAdd getcard={(e) => cardData(e, ind)} />
                                    </div>
                                </div>
                            );
                        })}
                    </DragDropContext>

                    <AddList getlist={(e) => listData(e)} />
                </div>
            </div>

            {/* Modal to show card details */}
            <Modal isOpen={isModalOpen} onClose={closeModal} cardData={selectedCard} />
        </div>
    );
}

export default Main;
