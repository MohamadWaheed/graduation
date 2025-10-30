import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-check2-square me-2 fs-4 text-primary"></i>
              <span className="fw-bold fs-5">Task Management System</span>
            </div>
            <p className="mb-0 text-muted">
              Organize your workspaces and boost productivity with our intuitive task management solution.
            </p>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="mb-2">
              <Link to="/about" className="text-white text-decoration-none me-3">
                <i className="bi bi-info-circle me-1"></i>
                About
              </Link>
              <Link to="/profile" className="text-white text-decoration-none me-3">
                <i className="bi bi-person me-1"></i>
                Profile
              </Link>
              <Link to="/home" className="text-white text-decoration-none">
                <i className="bi bi-kanban me-1"></i>
                Dashboard
              </Link>
            </div>
            <small className="text-muted">
              © {currentYear} TMS. Educational React Project.
            </small>
          </div>
        </div>
        
        <hr className="my-3" />
        
        <div className="row text-center">
          <div className="col-12">
            <p className="mb-0 text-muted small">
              Built with React, React Router, Bootstrap, and modern web technologies
            </p>
            <p className="mb-0 text-muted small">
              <i className="bi bi-heart-fill text-danger me-1"></i>
              Designed for learning and demonstration purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;