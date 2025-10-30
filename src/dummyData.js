export const dummyWorkspaces = [
  {
    id: 1,
    name: 'Personal Tasks',
    description: 'Tasks for personal projects and daily activities',
    tasks: [
      {
        id: 101,
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, and vegetables',
        status: 'Pending',
        dueDate: '2024-06-15',
        priority: 'High',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-10T10:00:00Z'
      },
      {
        id: 102,
        title: 'Workout session',
        description: '30 minutes cardio at the gym',
        status: 'In Progress',
        dueDate: '2024-06-14',
        priority: 'Medium',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-09T08:00:00Z'
      },
      {
        id: 103,
        title: 'Read book chapter',
        description: 'Finish chapter 5 of "Clean Code"',
        status: 'Completed',
        dueDate: '2024-06-13',
        priority: 'Low',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-08T14:00:00Z'
      }
    ]
  },
  {
    id: 2,
    name: 'Work Projects',
    description: 'Professional tasks and project management',
    tasks: [
      {
        id: 201,
        title: 'Prepare client presentation',
        description: 'Create slides for Q3 quarterly review',
        status: 'Completed',
        dueDate: '2024-06-12',
        priority: 'High',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-05T09:00:00Z'
      },
      {
        id: 202,
        title: 'Code review',
        description: 'Review pull requests from team members',
        status: 'In Progress',
        dueDate: '2024-06-16',
        priority: 'Medium',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-11T11:00:00Z'
      },
      {
        id: 203,
        title: 'Update documentation',
        description: 'Update API documentation for new endpoints',
        status: 'Pending',
        dueDate: '2024-06-18',
        priority: 'Low',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-12T16:00:00Z'
      }
    ]
  },
  {
    id: 3,
    name: 'Learning Goals',
    description: 'Educational objectives and skill development',
    tasks: [
      {
        id: 301,
        title: 'Complete React course',
        description: 'Finish advanced React patterns module',
        status: 'In Progress',
        dueDate: '2024-06-20',
        priority: 'High',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-01T10:00:00Z'
      },
      {
        id: 302,
        title: 'Practice JavaScript',
        description: 'Solve 5 coding challenges on LeetCode',
        status: 'Pending',
        dueDate: '2024-06-17',
        priority: 'Medium',
        assignedTo: 'mohamed waheed',
        createdAt: '2024-06-10T15:00:00Z'
      }
    ]
  }
];

export const currentUser = {
  id: 1,
  name: 'mohamed waheed',
  email: 'mohamed.waheed@example.com',
  avatar: 'https://via.placeholder.com/150/007bff/ffffff?text=JD',
  joinDate: '2024-01-15',
  role: 'Project Manager'
};

export const taskStatuses = ['Pending', 'In Progress', 'Completed'];
export const taskPriorities = ['Low', 'Medium', 'High'];