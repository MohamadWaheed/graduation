import React, { useState } from 'react';
import { Card, Button, Badge, ProgressBar, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';

const WorkspaceCard = ({ workspace }) => {
  const { deleteWorkspace, getWorkspaceStats } = useTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const stats = getWorkspaceStats(workspace.id);
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call delay
    setTimeout(() => {
      deleteWorkspace(workspace.id);
      setShowDeleteModal(false);
      setIsDeleting(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Card className="h-100 workspace-card shadow-sm fade-in">
        <Card.Header className="bg-white border-0 pb-0">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="h5 mb-0 text-primary">{workspace.name}</Card.Title>
            <div className="dropdown">
              <button
                className="btn btn-link btn-sm text-muted"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link 
                    className="dropdown-item" 
                    to={`/workspace/${workspace.id}`}
                  >
                    <i className="bi bi-eye me-2"></i>
                    View Details
                  </Link>
                </li>
                <li>
                  <button 
                    className="dropdown-item text-danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Delete Workspace
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {workspace.description && (
            <Card.Subtitle className="text-muted small">
              {workspace.description}
            </Card.Subtitle>
          )}
        </Card.Header>
        
        <Card.Body className="d-flex flex-column">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <small className="text-muted">Progress</small>
              <small className="text-muted">{completionPercentage}%</small>
            </div>
            <ProgressBar 
              variant={completionPercentage === 100 ? 'success' : 'primary'}
              now={completionPercentage}
              style={{ height: '6px' }}
            />
          </div>
          
          {/* Task Statistics */}
          <div className="mb-3">
            <div className="row text-center">
              <div className="col-4">
                <div className="p-2">
                  <div className="h5 mb-0 text-warning">{stats.pending}</div>
                  <small className="text-muted">Pending</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2">
                  <div className="h5 mb-0 text-info">{stats.inProgress}</div>
                  <small className="text-muted">In Progress</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2">
                  <div className="h5 mb-0 text-success">{stats.completed}</div>
                  <small className="text-muted">Completed</small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Badges */}
          <div className="mb-3">
            <div className="d-flex flex-wrap gap-1">
              <Badge bg="primary" className="small">
                {stats.total} Tasks
              </Badge>
              {completionPercentage === 100 && (
                <Badge bg="success" className="small">
                  <i className="bi bi-check-circle me-1"></i>
                  Complete
                </Badge>
              )}
              {workspace.updatedAt && (
                <Badge bg="light" text="dark" className="small">
                  <i className="bi bi-clock me-1"></i>
                  Updated {formatDate(workspace.updatedAt)}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-auto">
            <Button 
              as={Link} 
              to={`/workspace/${workspace.id}`}
              variant="primary" 
              className="w-100 mb-2"
            >
              <i className="bi bi-kanban me-2"></i>
              View Workspace
            </Button>
          </div>
        </Card.Body>
        
        {workspace.createdAt && (
          <Card.Footer className="bg-light border-0">
            <small className="text-muted">
              <i className="bi bi-calendar me-1"></i>
              Created {formatDate(workspace.createdAt)}
            </small>
          </Card.Footer>
        )}
      </Card>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete <strong>{workspace.name}</strong>? 
            This action cannot be undone and will permanently remove all tasks in this workspace.
          </p>
          <div className="alert alert-warning">
            <i className="bi bi-exclamation-triangle me-2"></i>
            This will delete {stats.total} task{stats.total !== 1 ? 's' : ''} permanently.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash me-2"></i>
                Delete Workspace
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WorkspaceCard;