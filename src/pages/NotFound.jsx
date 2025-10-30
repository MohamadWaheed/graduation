import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="text-center">
            {/* 404 Illustration */}
            <div className="mb-5">
              <div className="display-1 fw-bold text-primary opacity-75">404</div>
              <div className="position-relative">
                <i className="bi bi-exclamation-triangle display-1 text-warning position-absolute" 
                   style={{ 
                     left: '50%', 
                     top: '50%', 
                     transform: 'translate(-50%, -50%)',
                     zIndex: 1
                   }}></i>
                <i className="bi bi-search display-2 text-muted"></i>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-5">
              <h1 className="fw-bold mb-3">Page Not Found</h1>
              <p className="lead text-muted mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-muted">
                Don't worry, even the best developers sometimes get lost. 
                Let's get you back on track!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button 
                variant="primary" 
                size="lg"
                as={Link} 
                to="/"
                className="fw-semibold"
              >
                <i className="bi bi-house me-2"></i>
                Go Home
              </Button>
              
              <Button 
                variant="outline-primary" 
                size="lg"
                onClick={goBack}
                className="fw-semibold"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Go Back
              </Button>
              
              <Button 
                variant="outline-secondary" 
                size="lg"
                as={Link} 
                to="/home"
                className="fw-semibold"
              >
                <i className="bi bi-kanban me-2"></i>
                Dashboard
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-5 pt-4 border-top">
              <p className="text-muted mb-3">You might be looking for:</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <Link to="/about" className="text-decoration-none">
                  <i className="bi bi-info-circle me-1"></i>
                  About Page
                </Link>
                <Link to="/profile" className="text-decoration-none">
                  <i className="bi bi-person me-1"></i>
                  Profile
                </Link>
                <Link to="/login" className="text-decoration-none">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Link>
                <Link to="/register" className="text-decoration-none">
                  <i className="bi bi-person-plus me-1"></i>
                  Register
                </Link>
              </div>
            </div>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-3 bg-light rounded">
                <small className="text-muted">
                  <strong>Development Note:</strong> This is a custom 404 page. 
                  Check your routing configuration in App.jsx.
                </small>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;