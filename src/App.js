import React, { useEffect, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import './App.css';
// Import the display and down icons
import displayIcon from './icons_FEtask/Display.svg'; // Update the path based on your project structure
import downIcon from './icons_FEtask/down.svg'; // Update the path based on your project structure

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('Status'); // Default grouping by Status
  const [ordering, setOrdering] = useState('Priority'); // Default ordering by Priority
  const [showDisplayOptions, setShowDisplayOptions] = useState(false); // To show/hide the display dropdown

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Toggle the display dropdown
  const toggleDisplayOptions = () => {
    setShowDisplayOptions((prev) => !prev);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="display-container">
          <button className="display-button" onClick={toggleDisplayOptions}>
            <img src={displayIcon} alt="Display Icon" className="display-icon" /> 
            Display
            <img src={downIcon} alt="Dropdown Icon" className="down-icon" /> 
          </button>
          {showDisplayOptions && (
            <div className="dropdown-content">
              <div className="grouping-option">
                <label>
                  Grouping
                  <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                    <option value="Status">Status</option>
                    <option value="User">User</option>
                    <option value="Priority">Priority</option>
                  </select>
                </label>
              </div>
              <div className="ordering-option">
                <label>
                  Ordering
                  <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                    <option value="Priority">Priority</option>
                    <option value="Title">Title</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      </header>
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
    </div>
  );
};

export default App;
