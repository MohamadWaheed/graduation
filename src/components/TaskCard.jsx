import React, { useState } from 'react';
import { Card, Button, Badge, Dropdown } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

const TaskCard = ({ task, workspaceId }) => {
  const { editTask, deleteTask, moveTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDragging, setIsDragging] = useState(false);

  const handleEdit = () => {
    editTask(workspaceId, editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(workspaceId, task.id);
    }
  };

  const handleMove = (newStatus) => {
    moveTask(workspaceId, task.id, newStatus);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('workspaceId', workspaceId.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isOverdue = date < today && task.status !== 'Completed';
    const isToday = date.toDateString() === today.toDateString();
    
    return {
      formatted: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      }),
      isOverdue,
      isToday
    };
  };

  const dateInfo = formatDate(task.dueDate);

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bi-exclamation-triangle-fill';
      case 'medium': return 'bi-dash-circle-fill';
      case 'low': return 'bi-check-circle-fill';
      default: return 'bi-circle';
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'In Progress': return 'info';
      case 'Completed': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <Card 
      className={`task-card mb-3 ${task.status.replace(' ', '-')} ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'rotate(5deg)' : 'none',
        transition: 'all 0.2s ease'
      }}
    >
      <Card.Body>
        {isEditing ? (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-sm mb-2"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                placeholder="Task title"
              />
              <textarea
                className="form-control form-control-sm"
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                placeholder="Task description"
                rows={2}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select form-select-sm"
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control form-control-sm"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              />
            </div>
            <div className="d-flex gap-2">
              <Button size="sm" variant="success" onClick={handleEdit}>
                <i className="bi bi-check me-1"></i>
                Save
              </Button>
              <Button size="sm" variant="secondary" onClick={handleCancel}>
                <i className="bi bi-x me-1"></i>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title className="h6 mb-0">{task.title}</Card.Title>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="link" 
                  size="sm" 
                  className="text-muted p-0"
                  style={{ border: 'none' }}
                >
                  <i className="bi bi-three-dots"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setIsEditing(true)}>
                    <i className="bi bi-pencil me-2"></i>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => handleMove('Pending')}>
                    <i className="bi bi-clock me-2"></i>
                    Mark as Pending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleMove('In Progress')}>
                    <i className="bi bi-arrow-right me-2"></i>
                    Mark as In Progress
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleMove('Completed')}>
                    <i className="bi bi-check-circle me-2"></i>
                    Mark as Completed
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    <i className="bi bi-trash me-2"></i>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            
            {task.description && (
              <Card.Text className="text-muted small mb-3">
                {task.description}
              </Card.Text>
            )}
            
            <div className="d-flex flex-wrap gap-2 mb-2">
              <Badge bg={getStatusBadgeVariant(task.status)} className="small">
                {task.status}
              </Badge>
              
              {task.priority && (
                <Badge bg="light" text="dark" className="small">
                  <i className={`bi ${getPriorityIcon(task.priority)} me-1 ${getPriorityClass(task.priority)}`}></i>
                  {task.priority}
                </Badge>
              )}
              
              {task.assignedTo && (
                <Badge bg="secondary" className="small">
                  <i className="bi bi-person me-1"></i>
                  {task.assignedTo}
                </Badge>
              )}
            </div>
            
            <div className="d-flex justify-content-between align-items-center small text-muted">
              <span>
                <i className="bi bi-calendar me-1"></i>
                <span className={
                  dateInfo.isOverdue ? 'text-danger fw-bold' : 
                  dateInfo.isToday ? 'text-warning fw-bold' : ''
                }>
                  {dateInfo.formatted}
                  {dateInfo.isOverdue && ' (Overdue)'}
                  {dateInfo.isToday && ' (Due Today)'}
                </span>
              </span>
              
              <div className="d-flex gap-1">
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => setIsEditing(true)}
                  className="p-1"
                  style={{ fontSize: '0.7rem' }}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={handleDelete}
                  className="p-1"
                  style={{ fontSize: '0.7rem' }}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TaskCard;