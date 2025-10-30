import { useTaskContext } from '../context/TaskContext';

export const useTasks = () => {
  const { state, dispatch } = useTaskContext();

  const addWorkspace = (workspace) => {
    const newWorkspace = {
      id: Date.now(),
      name: workspace.name,
      description: workspace.description,
      tasks: [],
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_WORKSPACE', payload: newWorkspace });
  };

  const editWorkspace = (updatedWorkspace) => {
    dispatch({ type: 'EDIT_WORKSPACE', payload: updatedWorkspace });
  };

  const deleteWorkspace = (workspaceId) => {
    dispatch({ type: 'DELETE_WORKSPACE', payload: workspaceId });
  };

  const addTask = (workspaceId, task) => {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
      priority: task.priority || 'Medium',
      assignedTo: state.currentUser.name,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: { workspaceId, task: newTask } });
  };

  const editTask = (workspaceId, updatedTask) => {
    dispatch({ type: 'EDIT_TASK', payload: { workspaceId, task: updatedTask } });
  };

  const deleteTask = (workspaceId, taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: { workspaceId, taskId } });
  };

  const moveTask = (workspaceId, taskId, newStatus) => {
    dispatch({ type: 'MOVE_TASK', payload: { workspaceId, taskId, newStatus } });
  };

  const updateTaskStatus = (workspaceId, taskId, newStatus) => {
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { workspaceId, taskId, newStatus } });
  };

  // Statistics helpers
  const getWorkspaceStats = (workspaceId) => {
    const workspace = state.workspaces.find(w => w.id === workspaceId);
    if (!workspace) return { total: 0, pending: 0, inProgress: 0, completed: 0 };

    const tasks = workspace.tasks;
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'Pending').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      completed: tasks.filter(t => t.status === 'Completed').length
    };
  };

  const getOverallStats = () => {
    const allTasks = state.workspaces.flatMap(w => w.tasks);
    return {
      totalWorkspaces: state.workspaces.length,
      totalTasks: allTasks.length,
      pendingTasks: allTasks.filter(t => t.status === 'Pending').length,
      inProgressTasks: allTasks.filter(t => t.status === 'In Progress').length,
      completedTasks: allTasks.filter(t => t.status === 'Completed').length
    };
  };

  const getUpcomingTasks = (days = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + days);
    
    return state.workspaces.flatMap(workspace => 
      workspace.tasks
        .filter(task => {
          const dueDate = new Date(task.dueDate);
          return dueDate <= cutoffDate && task.status !== 'Completed';
        })
        .map(task => ({ ...task, workspaceName: workspace.name }))
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    );
  };

  return {
    // State
    workspaces: state.workspaces,
    currentUser: state.currentUser,
    
    // Workspace operations
    addWorkspace,
    editWorkspace,
    deleteWorkspace,
    
    // Task operations
    addTask,
    editTask,
    deleteTask,
    moveTask,
    updateTaskStatus,
    
    // Statistics
    getWorkspaceStats,
    getOverallStats,
    getUpcomingTasks
  };
};