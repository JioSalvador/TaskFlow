import React, { useState } from 'react';
import { X, Plus } from 'react-feather'; // import react-feather
import './AddList.css'; // Import the CSS file

const AddList = (props) => {
  const [list, setlist] = useState('');
  const [show, setShow] = useState(false);

  const savelist = () => {
    if (!list) {
      return;
    }
    props.getlist(list);
    setlist('');
    setShow(!show);
  };

  const closeBtn = () => {
    setlist('');
    setShow(!show);
  };

  return (
    <div>
      <div className="list-container">
        {show && (
          <div>
            <textarea
              value={list}
              onChange={(e) => setlist(e.target.value)}
              className="textarea"
              placeholder="Enter list Title..."
              cols="30"
              rows="2"
            ></textarea>
            <div className="buttons">
              <button onClick={() => savelist()} className="add-btn">
                Add list
              </button>
              <button onClick={() => closeBtn()} className="close-btn">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button onClick={() => setShow(!show)} className="show-btn">
            <Plus size={16} /> Add a list
          </button>
        )}
      </div>
    </div>
  );
};

export default AddList;
