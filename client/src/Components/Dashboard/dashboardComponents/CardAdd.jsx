import React, { useState } from 'react';
import { X, Plus } from 'react-feather';
import './CardAdd.css'; // Import the external CSS file

const CardAdd = (props) => {
    const [cardTitle, setCardTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [checklist, setChecklist] = useState([{ text: '', done: false }]);
    const [show, setShow] = useState(false);

    const saveCard = () => {
        if (!cardTitle) {
            return;
        }
        props.getcard(
            {
                title: cardTitle,
                description,
                dueDate,
                checklist,
            },
            props.listIndex
        );
        setCardTitle('');
        setDescription('');
        setDueDate('');
        setChecklist([{ text: '', done: false }]);
        setShow(!show);
    };

    const handleAddChecklistItem = () => {
        setChecklist([...checklist, { text: '', done: false }]);
    };

    const handleChecklistChange = (index, value) => {
        const newChecklist = [...checklist];
        newChecklist[index].text = value;
        setChecklist(newChecklist);
    };

    const closeBtn = () => {
        setCardTitle('');
        setDescription('');
        setDueDate('');
        setChecklist([{ text: '', done: false }]);
        setShow(!show);
    };

    return (
        <div>
            <div className="card-container">
                {show && (
                    <div>
                        <textarea
                            value={cardTitle}
                            onChange={(e) => setCardTitle(e.target.value)}
                            className="textarea"
                            cols="30"
                            rows="2"
                            placeholder="Enter Card Title..."
                        ></textarea>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea"
                            cols="30"
                            rows="2"
                            placeholder="Enter Description..."
                        ></textarea>

                        <div className="checklist">
                            {checklist.map((item, idx) => (
                                <div key={idx} className="checklist-item">
                                    <input
                                        type="text"
                                        value={item.text}
                                        onChange={(e) => handleChecklistChange(idx, e.target.value)}
                                        className="input-field"
                                        placeholder="Details"
                                    />
                                </div>
                            ))}
                        </div>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="textarea"
                        />
                        <button
                            type="button"
                            onClick={handleAddChecklistItem}
                            className="add-details-btn"
                        >
                            <Plus size={16} />
                            <span className="ml-2">Add More Details</span>
                        </button>
                        <div className="button-group">
                            <button onClick={() => saveCard()} className="save-btn">
                                Add Card
                            </button>
                            <button onClick={() => closeBtn()} className="close-btn">
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                )}
                {!show && (
                    <button onClick={() => setShow(!show)} className="show-btn">
                        <Plus size={16} /> Add a card
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardAdd;