import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';
import WorkspaceCard from '../components/WorkspaceCard';
import AddWorkspaceModal from '../components/AddWorkspaceModal';

const Home = () => {
  const { workspaces, addWorkspace, getOverallStats } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [isAddingWorkspace, setIsAddingWorkspace] = useState(false);
  
  const stats = getOverallStats();

  const handleAddWorkspace = async (workspaceData) => {
    setIsAddingWorkspace(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      addWorkspace(workspaceData);
    } catch (error) {
      console.error('Failed to add workspace:', error);
    } finally {
      setIsAddingWorkspace(false);
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container className="py-4">
      {/* Header Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="display-5 fw-bold text-primary mb-2">
              {getWelcomeMessage()}! 👋
            </h1>
            <p className="text-muted lead mb-1">{formatDate()}</p>
            <p className="text-muted">
              Here's what's happening with your tasks today.
            </p>
          </div>
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowModal(true)}
            disabled={isAddingWorkspace}
            className="shadow-sm"
          >
            {isAddingWorkspace ? (
              <>
                <Spinner size="sm" className="me-2" />
                Creating...
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                New Workspace
              </>
            )}
          </Button>
        </div>

        {/* Quick Stats */}
        <Row className="g-4 mb-4">
          <Col md={3} sm={6}>
            <div className="card bg-primary text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="fw-bold">{stats.totalWorkspaces}</h3>
                    <p className="mb-0">Workspaces</p>
                  </div>
                  <div className="align-self-center">
                    <i className="bi bi-kanban fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={3} sm={6}>
            <div className="card bg-warning text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="fw-bold">{stats.pendingTasks}</h3>
                    <p className="mb-0">Pending Tasks</p>
                  </div>
                  <div className="align-self-center">
                    <i className="bi bi-clock fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={3} sm={6}>
            <div className="card bg-info text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="fw-bold">{stats.inProgressTasks}</h3>
                    <p className="mb-0">In Progress</p>
                  </div>
                  <div className="align-self-center">
                    <i className="bi bi-arrow-right-circle fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={3} sm={6}>
            <div className="card bg-success text-white h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h3 className="fw-bold">{stats.completedTasks}</h3>
                    <p className="mb-0">Completed</p>
                  </div>
                  <div className="align-self-center">
                    <i className="bi bi-check-circle fs-1 opacity-75"></i>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Progress Overview */}
        {stats.totalTasks > 0 && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Overall Progress</h5>
              <div className="progress" style={{ height: '10px' }}>
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ 
                    width: `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}%` 
                  }}
                ></div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <small className="text-muted">
                  {stats.completedTasks} of {stats.totalTasks} tasks completed
                </small>
                <small className="text-muted">
                  {Math.round((stats.completedTasks / stats.totalTasks) * 100)}%
                </small>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Workspaces Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Your Workspaces</h2>
          {workspaces.length > 0 && (
            <span className="badge bg-primary fs-6">
              {workspaces.length} workspace{workspaces.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {workspaces.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-inbox display-1 text-muted"></i>
            </div>
            <h4 className="text-muted mb-3">No workspaces yet</h4>
            <p className="text-muted mb-4">
              Create your first workspace to start organizing your tasks efficiently.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Create Your First Workspace
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {workspaces.map(workspace => (
              <Col key={workspace.id} lg={4} md={6}>
                <WorkspaceCard workspace={workspace} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Add Workspace Modal */}
      <AddWorkspaceModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddWorkspace={handleAddWorkspace}
        isLoading={isAddingWorkspace}
      />
    </Container>
  );
};

export default Home;