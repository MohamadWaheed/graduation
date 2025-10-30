import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="hero-section min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-start">
            <h1 className="display-4 fw-bold mb-4">
              Organize Your Work, <br />
              <span className="text-warning">Boost Productivity</span>
            </h1>
            <p className="lead mb-4">
              Task Management System helps you organize workspaces and tasks efficiently. 
              Track your progress from Pending to Completed with our intuitive interface.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Button 
                as={Link} 
                to="/home" 
                variant="light" 
                size="lg"
                className="fw-semibold"
              >
                <i className="bi bi-arrow-right me-2"></i>
                Get Started
              </Button>
              <Button 
                as={Link} 
                to="/about" 
                variant="outline-light" 
                size="lg"
                className="fw-semibold"
              >
                <i className="bi bi-info-circle me-2"></i>
                Learn More
              </Button>
            </div>
          </Col>
          
          <Col lg={6} className="mt-5 mt-lg-0">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <h5 className="card-title mb-4 text-center">Key Features</h5>
                
                <Row>
                  <Col sm={6} className="mb-4">
                    <div className="text-center">
                      <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-kanban text-white fs-4"></i>
                      </div>
                      <h6>Workspace Management</h6>
                      <small className="text-muted">Organize tasks by projects</small>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="mb-4">
                    <div className="text-center">
                      <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-check-circle text-white fs-4"></i>
                      </div>
                      <h6>Task Tracking</h6>
                      <small className="text-muted">Monitor progress status</small>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="mb-4">
                    <div className="text-center">
                      <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-calendar-event text-white fs-4"></i>
                      </div>
                      <h6>Due Date Management</h6>
                      <small className="text-muted">Never miss deadlines</small>
                    </div>
                  </Col>
                  
                  <Col sm={6} className="mb-4">
                    <div className="text-center">
                      <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                           style={{ width: '60px', height: '60px' }}>
                        <i className="bi bi-arrow-left-right text-white fs-4"></i>
                      </div>
                      <h6>Drag & Drop</h6>
                      <small className="text-muted">Easy task organization</small>
                    </div>
                  </Col>
                </Row>
                
                <div className="text-center mt-4">
                  <Link to="/register" className="btn btn-primary">
                    <i className="bi bi-person-plus me-2"></i>
                    Create Free Account
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;