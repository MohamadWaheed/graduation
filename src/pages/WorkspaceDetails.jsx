import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Breadcrumb } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';

const WorkspaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workspaces, moveTask, getWorkspaceStats } = useTasks();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);

  const workspace = workspaces.find(ws => ws.id === parseInt(id));
  const stats = getWorkspaceStats(parseInt(id));

  if (!workspace) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Workspace Not Found</Alert.Heading>
          <p>The workspace you're looking for doesn't exist or has been deleted.</p>
          <Button variant="danger" onClick={() => navigate('/home')}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceWorkspaceId = parseInt(e.dataTransfer.getData('workspaceId'));
    
    if (sourceWorkspaceId === parseInt(id)) {
      moveTask(parseInt(id), taskId, newStatus);
    }
    
    setDraggedTask(null);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const getTasksByStatus = (status) => {
    return workspace.tasks.filter(task => task.status === status);
  };

  const statuses = [
    { 
      key: 'Pending', 
      color: 'warning', 
      icon: 'bi-clock',
      description: 'Tasks waiting to be started'
    },
    { 
      key: 'In Progress', 
      color: 'info', 
      icon: 'bi-arrow-right-circle',
      description: 'Tasks currently being worked on'
    },
    { 
      key: 'Completed', 
      color: 'success', 
      icon: 'bi-check-circle',
      description: 'Finished tasks'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/home">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>{workspace.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Workspace Header */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="flex-grow-1">
            <h1 className="display-5 fw-bold text-primary mb-2">
              {workspace.name}
            </h1>
            {workspace.description && (
              <p className="text-muted lead mb-3">{workspace.description}</p>
            )}
            
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <span className="badge bg-primary fs-6">
                <i className="bi bi-kanban me-1"></i>
                {stats.total} Tasks
              </span>
              <span className="badge bg-light text-dark fs-6">
                <i className="bi bi-calendar me-1"></i>
                Created {formatDate(workspace.createdAt)}
              </span>
              {workspace.updatedAt && (
                <span className="badge bg-light text-dark fs-6">
                  <i className="bi bi-clock me-1"></i>
                  Updated {formatDate(workspace.updatedAt)}
                </span>
              )}
            </div>
          </div>
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowAddTaskModal(true)}
            className="shadow-sm"
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Task
          </Button>
        </div>

        {/* Stats Cards */}
        <Row className="g-3 mb-4">
          {statuses.map(status => {
            const count = getTasksByStatus(status.key).length;
            return (
              <Col md={4} key={status.key}>
                <div className={`card border-${status.color} border-top border-4 h-100`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className={`text-${status.color} fw-bold mb-1`}>
                          <i className={`bi ${status.icon} me-2`}></i>
                          {status.key}
                        </h6>
                        <p className="text-muted small mb-0">{status.description}</p>
                      </div>
                      <div className="text-end">
                        <h3 className={`text-${status.color} mb-0`}>{count}</h3>
                        <small className="text-muted">tasks</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Progress Bar */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Progress Overview</h6>
              <small className="text-muted">
                {stats.completed} of {stats.total} tasks completed
              </small>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div 
                className="progress-bar bg-success" 
                role="progressbar" 
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <Row className="g-4">
        {statuses.map(status => {
          const tasks = getTasksByStatus(status.key);
          return (
            <Col md={4} key={status.key}>
              <div 
                className={`status-column border rounded-3 p-3 h-100`}
                onDragOver={allowDrop}
                onDrop={(e) => handleDrop(e, status.key)}
                style={{
                  backgroundColor: draggedTask && draggedTask.status !== status.key ? '#f8f9fa' : '#f8f9fa',
                  minHeight: '500px'
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className={`text-${status.color} fw-bold mb-0`}>
                    <i className={`bi ${status.icon} me-2`}></i>
                    {status.key}
                  </h5>
                  <span className={`badge bg-${status.color} fs-6`}>
                    {tasks.length}
                  </span>
                </div>

                {tasks.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className={`bi ${status.icon} display-6 d-block mb-2 opacity-50`}></i>
                    <p className="mb-3">No tasks in {status.key.toLowerCase()}</p>
                    {status.key === 'Pending' && (
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setShowAddTaskModal(true)}
                      >
                        <i className="bi bi-plus me-1"></i>
                        Add Task
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        className={draggedTask?.id === task.id ? 'opacity-50' : ''}
                      >
                        <TaskCard task={task} workspaceId={workspace.id} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Add Task Modal */}
      <AddTaskModal
        show={showAddTaskModal}
        onHide={() => setShowAddTaskModal(false)}
        workspaceId={workspace.id}
      />
    </Container>
  );
};

export default WorkspaceDetails;