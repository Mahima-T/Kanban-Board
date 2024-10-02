import React from 'react';
import Card from './Card';
import './KanbanBoard.css';

import NoPriorityIcon from './icons_FEtask/No-priority.svg';
import UrgentIcon from './icons_FEtask/SVG - Urgent Priority colour.svg';
import HighIcon from './icons_FEtask/Img - High Priority.svg';
import MediumIcon from './icons_FEtask/Img - Medium Priority.svg';
import LowIcon from './icons_FEtask/Img - Low Priority.svg';
import ProfileIcon from './icons_FEtask/profile.svg'; 
import ThreeDotIcon from './icons_FEtask/3 dot menu.svg'; 
import AddIcon from './icons_FEtask/add.svg'; 
import BacklogIcon from './icons_FEtask/Backlog.svg';
import ToDoIcon from './icons_FEtask/To-do.svg';
import InProgressIcon from './icons_FEtask/in-progress.svg';

const KanbanBoard = ({ tickets, users, grouping, ordering }) => {
  const groupTickets = (tickets) => {
    let groupedTickets;

    if (grouping === 'Status') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'User') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        acc[ticket.userId] = acc[ticket.userId] || [];
        acc[ticket.userId].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'Priority') {
      groupedTickets = tickets.reduce((acc, ticket) => {
        let priority;
        switch (ticket.priority) {
          case 0:
            priority = 'No Priority';
            break;
          case 1:
            priority = 'Urgent';
            break;
          case 2:
            priority = 'High';
            break;
          case 3:
            priority = 'Medium';
            break;
          case 4:
            priority = 'Low';
            break;
          default:
            priority = 'No Priority';
        }

        acc[priority] = acc[priority] || [];
        acc[priority].push(ticket);
        return acc;
      }, {});
    }

    return groupedTickets;
  };

  const sortTickets = (tickets) => {
    if (ordering === 'Priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (ordering === 'Title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'To Do':
        return <img src={ToDoIcon} alt="To Do" className="status-icon" />;
      case 'In Progress':
        return <img src={InProgressIcon} alt="In Progress" className="status-icon" />;
      case 'Backlog':
        return <img src={BacklogIcon} alt="Backlog" className="status-icon" />;
      default:
        return null;
    }
  };

  const renderPriorityIcon = (priority) => {
    switch (priority) {
      case 'No Priority':
        return <img src={NoPriorityIcon} alt="No Priority" className="priority-icon" />;
      case 'Urgent':
        return <img src={UrgentIcon} alt="Urgent" className="priority-icon" />;
      case 'High':
        return <img src={HighIcon} alt="High" className="priority-icon" />;
      case 'Medium':
        return <img src={MediumIcon} alt="Medium" className="priority-icon" />;
      case 'Low':
        return <img src={LowIcon} alt="Low" className="priority-icon" />;
      default:
        return null;
    }
  };

  const getUserDetails = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? { name: user.name, photo: user.photo } : { name: 'Unknown', photo: ProfileIcon };
  };

  return (
    <div className="kanban-board">
      {grouping === 'User' ? (
        users.map(user => {
          const userTickets = tickets.filter(ticket => ticket.userId === user.id);
          if (userTickets.length === 0) return null;
          const { name, photo } = getUserDetails(user.id);
          return (
            <div key={user.id} className="ticket-group">
              <h2 className="user-heading">
                <img src={ProfileIcon} alt="Profile Icon" className="profile-icon" />
                {photo && <img src={photo} alt={name} className="user-photo" />}
                {name}
                <img src={AddIcon} alt="Add Ticket" className="action-icon" /> {/* Moved Add icon here */}
                <img src={ThreeDotIcon} alt="More Options" className="action-icon" />
                <span className="ticket-count">{userTickets.length}</span>
              </h2>
              {sortTickets(userTickets).map(ticket => (
                <Card key={ticket.id} ticket={ticket} users={users} />
              ))}
            </div>
          );
        })
      ) : (
        Object.entries(groupedTickets).map(([groupKey, group]) => (
          <div key={groupKey} className="ticket-group">
            <h2 className="priority-heading">
              {grouping === 'Status' ? renderStatusIcon(groupKey) : renderPriorityIcon(groupKey)}
              <span className={grouping === 'Status' ? "status-name" : "priority-name"}>{groupKey}</span>
              <span className="ticket-count">{group.length}</span>
              <img src={AddIcon} alt="Add Ticket" className="action-icon" /> {/* Moved Add icon here */}
              <img src={ThreeDotIcon} alt="More Options" className="action-icon" />
            </h2>
            {sortTickets(group).map(ticket => (
              <Card key={ticket.id} ticket={ticket} users={users} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default KanbanBoard;
