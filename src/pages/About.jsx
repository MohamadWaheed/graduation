import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

const About = () => {
  const technologies = [
    { name: 'React 18', description: 'Modern JavaScript library for building user interfaces' },
    { name: 'React Router v6', description: 'Declarative routing for React applications' },
    { name: 'Bootstrap 5', description: 'Popular CSS framework for responsive design' },
    { name: 'React Bootstrap', description: 'Bootstrap components built with React' },
    { name: 'Vite', description: 'Next generation frontend build tool' },
    { name: 'Context API', description: 'React state management solution' },
    { name: 'Custom Hooks', description: 'Reusable stateful logic in React' },
    { name: 'Local Storage', description: 'Client-side data persistence' }
  ];

  const features = [
    { 
      title: 'Workspace Management', 
      description: 'Organize your tasks by creating and managing multiple workspaces',
      icon: 'bi-kanban',
      color: 'primary'
    },
    { 
      title: 'Task Tracking', 
      description: 'Monitor task progress through different status stages',
      icon: 'bi-bar-chart',
      color: 'success'
    },
    { 
      title: 'Drag & Drop', 
      description: 'Intuitive interface for moving tasks between status columns',
      icon: 'bi-arrow-left-right',
      color: 'info'
    },
    { 
      title: 'Due Date Management', 
      description: 'Never miss deadlines with smart due date tracking',
      icon: 'bi-calendar-event',
      color: 'warning'
    },
    { 
      title: 'Priority Levels', 
      description: 'Categorize tasks by priority to focus on what matters most',
      icon: 'bi-exclamation-triangle',
      color: 'danger'
    },
    { 
      title: 'Real-time Statistics', 
      description: 'Get insights into your productivity with live task analytics',
      icon: 'bi-graph-up',
      color: 'secondary'
    }
  ];

  const learningObjectives = [
    'Understanding React functional components and hooks',
    'Implementing Context API for global state management',
    'Using useReducer for complex state updates',
    'Creating custom hooks for reusable logic',
    'Setting up client-side routing with React Router',
    'Building responsive user interfaces with Bootstrap',
    'Handling form validation and user input',
    'Implementing drag and drop functionality',
    'Managing component lifecycle and effects',
    'Creating modular and maintainable code structure'
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary mb-3">About Task Management System</h1>
            <p className="lead text-muted">
              An educational React project designed to demonstrate modern web development concepts 
              and best practices through a practical task management application.
            </p>
          </div>
        </Col>
      </Row>

      {/* Project Overview */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <h2 className="fw-bold mb-4">Project Overview</h2>
              <p className="mb-4">
                The Task Management System (TMS) is a comprehensive React application that serves as both 
                a functional task management tool and an educational project. Built with modern React 
                patterns and best practices, it demonstrates the power of component-based architecture 
                and state management.
              </p>
              <p className="mb-4">
                This project focuses on helping users organize their workspaces and tasks efficiently, 
                with an intuitive interface that supports drag-and-drop functionality and real-time 
                status updates. The application uses a client-side approach with dummy data to showcase 
                React's capabilities without requiring a backend server.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="primary" className="fs-6">Educational</Badge>
                <Badge bg="success" className="fs-6">Interactive</Badge>
                <Badge bg="info" className="fs-6">Modern UI</Badge>
                <Badge bg="warning" className="fs-6">Responsive</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Key Features */}
      <Row className="mb-5">
        <Col>
          <h2 className="fw-bold text-center mb-5">Key Features</h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className={`bg-${feature.color} rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                         style={{ width: '60px', height: '60px' }}>
                      <i className={`bi ${feature.icon} text-white fs-4`}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Tech Stack */}
      <Row className="mb-5">
        <Col>
          <h2 className="fw-bold text-center mb-5">Technology Stack</h2>
          <Row className="g-4">
            {technologies.map((tech, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-primary mb-2">{tech.name}</h6>
                    <p className="small text-muted mb-0">{tech.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Learning Objectives */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <h2 className="fw-bold mb-4">Learning Objectives</h2>
              <p className="mb-4">
                This project is designed to teach and demonstrate the following React concepts 
                and web development principles:
              </p>
              <ul className="list-unstyled">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {objective}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Project Structure */}
      <Row className="mb-5">
        <Col>
          <h2 className="fw-bold text-center mb-5">Project Structure</h2>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center">
                <pre className="bg-light p-4 rounded text-start d-inline-block">
{`src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── TaskCard.jsx    # Individual task display
│   ├── WorkspaceCard.jsx # Workspace display
│   └── AddTaskModal.jsx # Task creation modal
├── pages/              # Route components
│   ├── Landing.jsx     # Home/landing page
│   ├── Home.jsx        # Dashboard
│   └── WorkspaceDetails.jsx # Workspace view
├── context/            # Global state management
│   └── TaskContext.jsx # Main app context
├── hooks/              # Custom React hooks
│   ├── useTasks.js     # Task operations
│   └── useLocalStorage.js # Data persistence
├── App.jsx             # Main app component
├── main.jsx           # Application entry point
└── dummyData.js       # Sample data`}
                </pre>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Educational Value */}
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm border-0 bg-primary text-white">
            <Card.Body className="p-5 text-center">
              <h2 className="fw-bold mb-3">Educational Value</h2>
              <p className="lead mb-4">
                This project serves as a comprehensive learning resource for students and developers 
                looking to understand modern React development patterns.
              </p>
              <div className="row g-4">
                <div className="col-md-4">
                  <i className="bi bi-code-slash display-4 mb-3 d-block"></i>
                  <h5>Clean Code</h5>
                  <p>Follows React best practices and coding conventions</p>
                </div>
                <div className="col-md-4">
                  <i className="bi bi-layers display-4 mb-3 d-block"></i>
                  <h5>Architecture</h5>
                  <p>Demonstrates scalable project structure and organization</p>
                </div>
                <div className="col-md-4">
                  <i className="bi bi-lightning display-4 mb-3 d-block"></i>
                  <h5>Performance</h5>
                  <p>Implements efficient state management and rendering</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;