import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

const Profile = () => {
  const { currentUser, workspaces, getOverallStats, getUpcomingTasks } = useTasks();
  const stats = getOverallStats();
  const upcomingTasks = getUpcomingTasks(7);

  const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getRandomColor = (index) => {
    const colors = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];
    return colors[index % colors.length];
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-5">
        <h1 className="display-5 fw-bold text-primary mb-2">
          {getGreeting()}, {currentUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted">Here's your task management overview.</p>
      </div>

      <Row className="g-4 mb-5">
        {/* User Profile Card */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '100px', height: '100px' }}>
                <span className="text-white display-4 fw-bold">{getInitials(currentUser.name)}</span>
              </div>
              <h3 className="fw-bold mb-2">{currentUser.name}</h3>
              <p className="text-muted mb-3">{currentUser.email}</p>
              
              {currentUser.role && (
                <Badge bg="light" text="dark" className="mb-3">
                  {currentUser.role}
                </Badge>
              )}
              
              <div className="text-start">
                <p className="text-muted small mb-2">
                  <i className="bi bi-calendar me-2"></i>
                  Member since {formatDate(currentUser.joinDate)}
                </p>
                <p className="text-muted small mb-0">
                  <i className="bi bi-clock me-2"></i>
                  Profile ID: {currentUser.id}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Statistics Cards */}
        <Col md={8}>
          <Row className="g-3">
            <Col sm={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="text-primary mb-2">
                    <i className="bi bi-kanban fs-1"></i>
                  </div>
                  <h3 className="fw-bold text-primary mb-1">{stats.totalWorkspaces}</h3>
                  <p className="text-muted mb-0">Active Workspaces</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col sm={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="text-success mb-2">
                    <i className="bi bi-check-circle fs-1"></i>
                  </div>
                  <h3 className="fw-bold text-success mb-1">{stats.completedTasks}</h3>
                  <p className="text-muted mb-0">Completed Tasks</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col sm={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="text-info mb-2">
                    <i className="bi bi-arrow-right-circle fs-1"></i>
                  </div>
                  <h3 className="fw-bold text-info mb-1">{stats.inProgressTasks}</h3>
                  <p className="text-muted mb-0">In Progress</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col sm={6}>
              <Card className="shadow-sm border-0">
                <Card.Body className="text-center p-4">
                  <div className="text-warning mb-2">
                    <i className="bi bi-clock fs-1"></i>
                  </div>
                  <h3 className="fw-bold text-warning mb-1">{stats.pendingTasks}</h3>
                  <p className="text-muted mb-0">Pending Tasks</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Overall Progress */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Overall Progress</h4>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Task Completion Rate</span>
                <span className="fw-bold">{completionRate}%</span>
              </div>
              <ProgressBar 
                variant={completionRate >= 80 ? 'success' : completionRate >= 50 ? 'warning' : 'danger'}
                now={completionRate}
                style={{ height: '12px' }}
                className="mb-3"
              />
              <p className="text-muted mb-0">
                {stats.completedTasks} of {stats.totalTasks} tasks completed across all workspaces
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Workspace Overview */}
      <Row className="mb-5">
        <Col>
          <h3 className="fw-bold mb-4">Workspace Overview</h3>
          <Row className="g-4">
            {workspaces.map((workspace, index) => {
              const workspaceStats = {
                total: workspace.tasks.length,
                completed: workspace.tasks.filter(t => t.status === 'Completed').length,
                pending: workspace.tasks.filter(t => t.status === 'Pending').length,
                inProgress: workspace.tasks.filter(t => t.status === 'In Progress').length
              };
              
              const workspaceCompletion = workspaceStats.total > 0 
                ? Math.round((workspaceStats.completed / workspaceStats.total) * 100)
                : 0;

              return (
                <Col lg={4} md={6} key={workspace.id}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-white border-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="fw-bold text-primary mb-0">{workspace.name}</h5>
                        <Badge bg={getRandomColor(index)}>
                          {workspaceStats.total} tasks
                        </Badge>
                      </div>
                      {workspace.description && (
                        <p className="text-muted small mb-0 mt-1">{workspace.description}</p>
                      )}
                    </Card.Header>
                    
                    <Card.Body>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Progress</small>
                          <small className="text-muted">{workspaceCompletion}%</small>
                        </div>
                        <ProgressBar 
                          variant={workspaceCompletion === 100 ? 'success' : 'primary'}
                          now={workspaceCompletion}
                          style={{ height: '6px' }}
                        />
                      </div>
                      
                      <Row className="text-center">
                        <Col>
                          <div className="p-2">
                            <h6 className="text-warning mb-0">{workspaceStats.pending}</h6>
                            <small className="text-muted">Pending</small>
                          </div>
                        </Col>
                        <Col>
                          <div className="p-2">
                            <h6 className="text-info mb-0">{workspaceStats.inProgress}</h6>
                            <small className="text-muted">In Progress</small>
                          </div>
                        </Col>
                        <Col>
                          <div className="p-2">
                            <h6 className="text-success mb-0">{workspaceStats.completed}</h6>
                            <small className="text-muted">Completed</small>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* Upcoming Tasks */}
      {upcomingTasks.length > 0 && (
        <Row>
          <Col>
            <h3 className="fw-bold mb-4">Upcoming Deadlines (Next 7 Days)</h3>
            <Row className="g-4">
              {upcomingTasks.map((task, index) => {
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                const isOverdue = daysUntilDue < 0;
                const isToday = daysUntilDue === 0;
                const isTomorrow = daysUntilDue === 1;
                
                const getDateStatus = () => {
                  if (isOverdue) return { variant: 'danger', text: 'Overdue', days: Math.abs(daysUntilDue) };
                  if (isToday) return { variant: 'warning', text: 'Due Today', days: 0 };
                  if (isTomorrow) return { variant: 'info', text: 'Due Tomorrow', days: 1 };
                  return { variant: 'secondary', text: `Due in ${daysUntilDue} days`, days: daysUntilDue };
                };

                const dateStatus = getDateStatus();

                return (
                  <Col lg={6} key={task.id}>
                    <Card className="shadow-sm border-0">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{task.title}</h6>
                          <Badge bg={dateStatus.variant}>
                            {dateStatus.text}
                          </Badge>
                        </div>
                        
                        <p className="text-muted small mb-2">{task.workspaceName}</p>
                        
                        {task.description && (
                          <p className="text-muted small mb-3">{task.description}</p>
                        )}
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <span className={`badge bg-light text-${dateStatus.variant} small`}>
                            <i className="bi bi-calendar me-1"></i>
                            {task.dueDate}
                          </span>
                          
                          <Badge bg={task.status === 'Pending' ? 'warning' : task.status === 'In Progress' ? 'info' : 'success'}>
                            {task.status}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      )}

      {/* Empty State */}
      {workspaces.length === 0 && (
        <Row>
          <Col>
            <Card className="text-center py-5">
              <Card.Body>
                <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                <h4 className="text-muted">No workspaces created yet</h4>
                <p className="text-muted">Create your first workspace to start organizing your tasks.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;