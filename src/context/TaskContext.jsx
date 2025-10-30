import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { dummyWorkspaces, currentUser } from '../dummyData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

const initialState = {
  workspaces: dummyWorkspaces,
  currentUser: currentUser,
  loading: false,
  error: null
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'ADD_WORKSPACE':
      return {
        ...state,
        workspaces: [...state.workspaces, action.payload]
      };
    
    case 'EDIT_WORKSPACE':
      return {
        ...state,
        workspaces: state.workspaces.map(workspace =>
          workspace.id === action.payload.id
            ? { ...workspace, ...action.payload, updatedAt: new Date().toISOString() }
            : workspace
        )
      };
    
    case 'DELETE_WORKSPACE':
      return {
        ...state,
        workspaces: state.workspaces.filter(workspace => workspace.id !== action.payload)
      };
    
    case 'ADD_TASK':
      return {
        ...state,
        workspaces: state.workspaces.map(workspace =>
          workspace.id === action.payload.workspaceId
            ? {
                ...workspace,
                tasks: [...workspace.tasks, action.payload.task],
                updatedAt: new Date().toISOString()
              }
            : workspace
        )
      };
    
    case 'EDIT_TASK':
      return {
        ...state,
        workspaces: state.workspaces.map(workspace =>
          workspace.id === action.payload.workspaceId
            ? {
                ...workspace,
                tasks: workspace.tasks.map(task =>
                  task.id === action.payload.task.id
                    ? { ...task, ...action.payload.task, updatedAt: new Date().toISOString() }
                    : task
                ),
                updatedAt: new Date().toISOString()
              }
            : workspace
        )
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        workspaces: state.workspaces.map(workspace =>
          workspace.id === action.payload.workspaceId
            ? {
                ...workspace,
                tasks: workspace.tasks.filter(task => task.id !== action.payload.taskId),
                updatedAt: new Date().toISOString()
              }
            : workspace
        )
      };
    
    case 'MOVE_TASK':
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        workspaces: state.workspaces.map(workspace =>
          workspace.id === action.payload.workspaceId
            ? {
                ...workspace,
                tasks: workspace.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? { 
                        ...task, 
                        status: action.payload.newStatus || action.payload.newStatus,
                        updatedAt: new Date().toISOString()
                      }
                    : task
                ),
                updatedAt: new Date().toISOString()
              }
            : workspace
        )
      };
    
    case 'LOAD_WORKSPACES':
      return {
        ...state,
        workspaces: action.payload,
        loading: false,
        error: null
      };
    
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [storedWorkspaces, setStoredWorkspaces] = useLocalStorage('tms_workspaces', dummyWorkspaces);

  // Load stored workspaces on mount
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // Simulate loading delay
    setTimeout(() => {
      dispatch({ type: 'LOAD_WORKSPACES', payload: storedWorkspaces });
    }, 500);
  }, []);

  // Save workspaces to localStorage whenever they change
  useEffect(() => {
    if (state.workspaces.length > 0 && !state.loading) {
      setStoredWorkspaces(state.workspaces);
    }
  }, [state.workspaces, state.loading, setStoredWorkspaces]);

  // Simulate API error handling
  const handleError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error.message || 'An error occurred' });
    setTimeout(() => dispatch({ type: 'SET_ERROR', payload: null }), 5000);
  };

  return (
    <TaskContext.Provider value={{ 
      state, 
      dispatch, 
      handleError 
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};