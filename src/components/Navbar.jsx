import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';


const Navbar = () => {
  const location = useLocation();
  const { currentUser, getOverallStats } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  
  const stats = getOverallStats();
  
  const isActive = (path) => location.pathname === path;

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi bi-check2-square me-2"></i>
          TMS
        </BSNavbar.Brand>
        
        <BSNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setIsOpen(!isOpen)}
        />
        
        <BSNavbar.Collapse id="basic-navbar-nav" className={isOpen ? 'show' : ''}>
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={isActive('/') ? 'active fw-semibold' : ''}
            >
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/home" 
              className={isActive('/home') ? 'active fw-semibold' : ''}
            >
              <i className="bi bi-kanban me-1"></i>
              Dashboard
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/about" 
              className={isActive('/about') ? 'active fw-semibold' : ''}
            >
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
          </Nav>
          
          <Nav>
            {/* Quick stats dropdown */}
            <NavDropdown 
              title={
                <span>
                  <i className="bi bi-bar-chart me-1"></i>
                  Stats
                </span>
              } 
              id="stats-dropdown"
            >
              <NavDropdown.ItemText>
                <div className="d-flex justify-content-between">
                  <span>Total Tasks:</span>
                  <span className="fw-bold">{stats.totalTasks}</span>
                </div>
              </NavDropdown.ItemText>
              <NavDropdown.ItemText>
                <div className="d-flex justify-content-between">
                  <span>Completed:</span>
                  <span className="text-success fw-bold">{stats.completedTasks}</span>
                </div>
              </NavDropdown.ItemText>
              <NavDropdown.ItemText>
                <div className="d-flex justify-content-between">
                  <span>In Progress:</span>
                  <span className="text-info fw-bold">{stats.inProgressTasks}</span>
                </div>
              </NavDropdown.ItemText>
              <NavDropdown.ItemText>
                <div className="d-flex justify-content-between">
                  <span>Pending:</span>
                  <span className="text-warning fw-bold">{stats.pendingTasks}</span>
                </div>
              </NavDropdown.ItemText>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile">
                <i className="bi bi-person me-2"></i>
                View Profile
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link 
              as={Link} 
              to="/profile" 
              className={isActive('/profile') ? 'active fw-semibold' : ''}
            >
              <i className="bi bi-person-circle me-1"></i>
              Profile
            </Nav.Link>
            
            {isActive('/login') ? (
              <Nav.Link as={Link} to="/register" className="btn btn-outline-light ms-2 px-3">
                <i className="bi bi-person-plus me-1"></i>
                Register
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light ms-2 px-3">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Nav.Link>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;