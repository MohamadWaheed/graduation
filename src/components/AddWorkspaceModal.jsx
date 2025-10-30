import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

const AddWorkspaceModal = ({ show, onHide, onAddWorkspace, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Workspace name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Workspace name must be at least 2 characters';
    }
    
    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      await onAddWorkspace(formData);
      
      // Reset form
      setFormData({
        name: '',
        description: ''
      });
      setErrors({});
      
      // Close modal (handled by parent)
      onHide();
    } catch (error) {
      setErrors({ submit: 'Failed to create workspace. Please try again.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const generateNameSuggestions = () => {
    const suggestions = [
      'Personal Projects',
      'Work Tasks',
      'Learning Goals',
      'Team Collaboration',
      'Client Projects',
      'Creative Ideas',
      'Research & Development',
      'Marketing Campaign'
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  const useSuggestion = () => {
    setFormData(prev => ({
      ...prev,
      name: generateNameSuggestions()
    }));
    setErrors({});
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create New Workspace
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.submit && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {errors.submit}
            </div>
          )}
          
          <div className="text-muted mb-4">
            <i className="bi bi-info-circle me-2"></i>
            Workspaces help you organize your tasks by different projects or areas of focus.
          </div>
          
          <Form.Group className="mb-4">
            <Form.Label>Workspace Name *</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Enter workspace name"
                disabled={isLoading}
                className="flex-grow-1"
              />
              <Button 
                type="button"
                variant="outline-secondary"
                onClick={useSuggestion}
                disabled={isLoading}
                style={{ whiteSpace: 'nowrap' }}
              >
                <i className="bi bi-magic me-1"></i>
                Suggest
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Choose a descriptive name like "Personal Tasks" or "Work Projects"
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Describe what this workspace will contain (optional)"
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Optional: Provide context about the purpose of this workspace
            </Form.Text>
          </Form.Group>

          {/* Preview */}
          {(formData.name || formData.description) && (
            <div className="card bg-light border-0 mb-4">
              <div className="card-body">
                <h6 className="text-muted mb-2">Preview:</h6>
                <div className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                       style={{ width: '40px', height: '40px' }}>
                    <i className="bi bi-kanban text-white"></i>
                  </div>
                  <div>
                    <h6 className="mb-0">{formData.name || 'Workspace Name'}</h6>
                    {formData.description && (
                      <small className="text-muted">{formData.description}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="alert alert-info">
            <i className="bi bi-lightbulb me-2"></i>
            <strong>Tips:</strong>
            <ul className="mb-0 mt-2">
              <li>Create separate workspaces for different aspects of your life</li>
              <li>Use descriptive names to make workspaces easy to identify</li>
              <li>You can always edit workspace details later</li>
            </ul>
          </div>
        </Modal.Body>
        
        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="secondary" 
            onClick={onHide}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Creating Workspace...
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>
                Create Workspace
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddWorkspaceModal;