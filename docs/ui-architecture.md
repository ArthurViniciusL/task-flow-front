# TaskFlow Frontend Architecture Document

This document outlines the frontend architecture for the TaskFlow project, detailing the technology stack, project structure, component standards, state management, API integration, routing, styling guidelines, testing requirements, and developer standards.

## Template and Framework Selection

Based on the project's existing structure and `prd.md`, the TaskFlow frontend will utilize the following technologies:

*   **Frontend Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS

The project is built upon an existing codebase, as indicated by the presence of `package.json`, `vite.config.ts`, `tailwind.config.ts`, and `.ts` files within the `src/` directory. This document aims to align with and build upon these established patterns.

### Change Log

| Date         | Version | Description                              | Author     |
| :----------- | :------ | :--------------------------------------- | :--------- |
| 2025-11-06   | 1.0     | Initial draft based on PRD and existing codebase | Gemini-CLI |

## Frontend Tech Stack

This section summarizes the key technologies adopted for the TaskFlow frontend, derived from the main architecture document and existing project context.

### Technology Stack Table

| Category          | Technology                                   | Version   | Purpose                                      | Rationale                                                         |
| :---------------- | :------------------------------------------- | :-------- | :------------------------------------------- | :---------------------------------------------------------------- |
| Framework         | React                                        | Latest    | Building interactive user interfaces         | Modern, component-based, widely adopted for SPAs.                 |
| UI Library        | Custom UI Library (Shadcn UI inspired)       | N/A       | Reusable UI components                       | Aligns with existing `src/components/ui` structure; promotes consistency. |
| State Management  | React Context API / Zustand / Redux Toolkit  | Latest    | Managing application state                   | Flexibility for project complexity; Context for simple, Zustand/Redux for complex. |
| Routing           | React Router                                 | Latest    | Client-side navigation                       | Standard and flexible routing solution for React applications.    |
| Build Tool        | Vite                                         | Latest    | Fast development server and build            | Excellent developer experience, fast HMR.                         |
| Styling           | Tailwind CSS                                 | Latest    | Utility-first CSS framework                  | Rapid UI development, highly customizable, efficient styling.     |
| Testing           | Vitest / React Testing Library               | Latest    | Unit, integration testing                    | Fast, integrated with Vite; focus on user-centric testing.        |
| Component Library | N/A                                          | N/A       | (Covered by UI Library and custom components)|                                                                   |
| Form Handling     | React Hook Form / Zod (for validation)       | Latest    | Efficient form management and validation     | Reduces boilerplate, performance-oriented.                        |
| Animation         | Framer Motion                                | Latest    | Declarative animations                       | Simple yet powerful API for complex animations.                   |
| Dev Tools         | React Developer Tools, browser DevTools      | Latest    | Debugging and performance monitoring         | Essential for development and optimization.                       |

## Project Structure

The project structure is designed to be modular, scalable, and easy to navigate, following React best practices and inspirations from established patterns while respecting the existing codebase layout.

```plaintext
src/
├── app/                  # Main application pages/views
│   ├── Index.tsx
│   └── NotFound.tsx
├── assets/               # Static assets like images, fonts
├── components/           # Reusable presentational components
│   ├── ui/               # UI primitives (buttons, inputs, etc. - e.g., Shadcn-style)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── NavLink.tsx
│   └── ...
├── context/              # React Context providers for global state
├── hooks/                # Custom React Hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                  # Utility functions, constants, configurations (e.g., utils.ts for Tailwind-related functions)
│   └── utils.ts
├── services/             # API client services and data fetching logic (NEW)
├── store/                # State management stores (if Zustand/Redux is chosen) (NEW)
├── types/                # TypeScript type definitions (NEW)
├── utils/                # General-purpose utility functions (distinct from lib for specific configurations)
├── App.css               # Global application styles (though mostly handled by Tailwind)
├── App.tsx               # Main application component
├── index.css             # Base CSS and Tailwind imports
├── main.tsx              # Entry point for React application
└── vite-env.d.ts         # Vite environment type definitions
```

## Component Standards

This section defines patterns for component creation, emphasizing best practices for maintainability, reusability, and type safety with TypeScript.

### Component Template

A minimal, complete React component template using TypeScript.

```typescript
// src/components/MyComponent/MyComponent.tsx
import React, { FC } from 'react';
import { cn } from '@/lib/utils'; // Assuming 'cn' utility from '@/lib/utils' for Tailwind class merging

// Define the props interface for the component
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add specific props for MyComponent here
  text: string;
  variant?: 'default' | 'primary' | 'secondary';
}

// Default props values (if needed, though prefer direct defaults in FC)
// const defaultProps: Partial<MyComponentProps> = {
//   variant: 'default',
// };

const MyComponent: FC<MyComponentProps> = ({ text, variant = 'default', className, ...props }) => {
  const baseStyles = "p-4 rounded-md";
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-500 text-white",
    secondary: "bg-green-500 text-white",
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {text}
    </div>
  );
};

// MyComponent.defaultProps = defaultProps; // If using defaultProps object

export { MyComponent };


// Optional: Index file for easier imports if component has sub-components/styles
// src/components/MyComponent/index.ts
// export * from './MyComponent';
// export * from './MyComponent.types'; // if types are in a separate file
```

### Naming Conventions

*   **Components:** PascalCase (e.g., `MyComponent.tsx`, `UserCard.tsx`).
*   **Files:**
    *   Component files: `ComponentName.tsx` (for the main component).
    *   Sub-components: `ComponentName/SubComponentName.tsx`.
    *   Styles for components (if not using Tailwind directly in JSX): `ComponentName.module.css` (or `.scss`).
    *   Hooks: `useFunctionName.ts` (e.g., `useAuth.ts`).
    *   Utilities: `utilityName.ts` (e.g., `formatDate.ts`).
    *   Context: `ContextNameProvider.tsx` for the provider, `useContextName.ts` for the hook.
    *   Stories/Tests: `ComponentName.stories.tsx`, `ComponentName.test.tsx`.
*   **Variables/Functions:** camelCase.
*   **Types/Interfaces:** PascalCase, often prefixed with `I` (for Interface) or suffixed with `Props`, `State`, `Type` (e.g., `IUser`, `ButtonProps`).

## State Management

The choice for state management will depend on the complexity of the application state. For simpler, localized state or context sharing, React Context API will be used. For more complex global state management, Zustand or Redux Toolkit will be adopted.

### Store Structure (Example with Zustand)

If Zustand is chosen for global state:

```plaintext
src/store/
├── authStore.ts    # Manages authentication state (user, token)
├── taskStore.ts    # Manages task-related state (tasks list, filters)
├── projectStore.ts # Manages project-related state
└── index.ts        # Exports all stores or combines them if needed
```

### State Management Template (Example with Zustand)

A basic Zustand store template with TypeScript.

```typescript
// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string; role: 'admin' | 'manager' | 'collaborator' } | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: AuthState['user'] | null) => void;
  login: (token: string, user: AuthState['user']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('authToken'), // Initialize from localStorage
  user: null, // User is typically fetched after token validation or upon login
  isAuthenticated: !!localStorage.getItem('authToken'), // Derived state

  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token, isAuthenticated: !!token });
  },
  setUser: (user) => set({ user }),
  login: (token, user) => {
    localStorage.setItem('authToken', token);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
```

## API Integration

This section defines the patterns for integrating with the backend API, focusing on efficient data fetching, error handling, and type safety.

### Service Template

An example API service template using `axios` and TypeScript.

```typescript
// src/services/taskService.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore'; // Assuming Zustand auth store

// Define base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Get token from Zustand store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling and potential token refresh
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login or refresh token
      useAuthStore.getState().logout();
      // Optionally, redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Define types for tasks
interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to_user_id: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  project_id?: string;
}

// Task service functions
export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData: Omit<Task, 'id'>): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id: string, taskData: Partial<Task>): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
```

### API Client Configuration

As shown in the `service-template` above, the `apiClient` instance in `src/services/taskService.ts` is configured with:

*   **`baseURL`**: `import.meta.env.VITE_API_BASE_URL` (or `http://localhost:3000/api` as fallback). This allows easy environment-specific configuration.
*   **Request Interceptor**: Automatically attaches the JWT `Authorization` header (`Bearer <token>`) to all outgoing requests by retrieving the token from the `useAuthStore` (Zustand example).
*   **Response Interceptor**: Handles common errors like `401 Unauthorized` by logging out the user and redirecting to the login page. This provides a centralized way to manage API errors.

## Routing

The routing for the TaskFlow frontend will be managed using React Router, enabling declarative navigation and structured route definitions.

### Route Configuration

Example of a basic route configuration with protected routes using a simple authentication check.

```typescript
// src/router/index.tsx
import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore'; // Assuming Zustand auth store

// Import page components
import { Index } from '@/app/Index';
import { NotFound } from '@/app/NotFound';
import LoginPage from '@/app/Auth/LoginPage'; // Placeholder for actual login component
import DashboardPage from '@/app/Dashboard/DashboardPage'; // Placeholder for actual dashboard component
import TasksPage from '@/app/Tasks/TasksPage'; // Placeholder for actual tasks component

// Protected Route Component
const ProtectedRoute: FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          {/* Add other protected routes here */}
        </Route>

        {/* Catch all - 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
```

## Styling Guidelines

The TaskFlow frontend utilizes Tailwind CSS for its styling, following a utility-first approach.

### Styling Approach

*   **Utility-First:** Direct application of utility classes in JSX for styling components (e.g., `<div className="flex items-center justify-between p-4 bg-white shadow-md">`).
*   **`cn` Utility:** The `cn` utility (from `src/lib/utils.ts`, inspired by Shadcn UI's `clsx` and `tailwind-merge`) will be used to conditionally apply and merge Tailwind classes programmatically, resolving conflicts gracefully.
*   **Component-Based Styles:** For complex or highly custom components, encapsulation of styles within the component file using Tailwind's `@apply` directive within a `<style>` block (if needed) or by defining custom directives in `tailwind.config.ts`.
*   **Minimal Custom CSS:** Global CSS (`index.css`, `App.css`) will be used primarily for Tailwind imports, base styles, and CSS variables for theming.

### Global Theme Variables

A CSS custom properties (CSS variables) based theme system for colors, spacing, typography, and dark mode support. This allows for easy theme switching and consistent design across the application.

```css
/* src/index.css or a dedicated theme.css file */

/* Base styles and Tailwind imports */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Define global CSS variables for theming */
:root {
  /* Colors */
  --color-primary: #3b82f6;   /* Blue-500 */
  --color-secondary: #10b981; /* Green-500 */
  --color-accent: #f59e0b;    /* Amber-500 */
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-text-default: #1f2937;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;

  /* Spacing (using a consistent scale) */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem;  /* 8px */
  --space-md: 1rem;    /* 16px */
  --space-lg: 1.5rem;  /* 24px */
  --space-xl: 2rem;    /* 32px */

  /* Typography */
  --font-family-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-size-base: 1rem;
  --line-height-base: 1.5;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* Dark mode support */
.dark {
  --color-primary: #60a5fa;   /* Blue-400 */
  --color-secondary: #34d399; /* Green-400 */
  --color-accent: #fbbf24;    /* Amber-400 */
  --color-background: #1f2937; /* Darker gray */
  --color-surface: #374151;   /* Medium dark gray */
  --color-text-default: #f3f4f6;
  --color-text-muted: #9ca3af;
  --color-border: #4b5563;
}

/* Example of how to use these variables in components */
/* .my-component {
  background-color: var(--color-surface);
  color: var(--color-text-default);
  padding: var(--space-md);
  border-radius: var(--radius-md);
} */
```

## Testing Requirements

Comprehensive testing is crucial to ensure the quality, reliability, and maintainability of the TaskFlow frontend.

### Component Test Template

A basic component test template using Vitest and React Testing Library.

```typescript
// src/components/MyComponent/MyComponent.test.tsx
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MyComponent } from './MyComponent'; // Adjust path as needed

describe('MyComponent', () => {
  // Clean up DOM after each test to prevent tests from affecting each other
  afterEach(() => {
    cleanup();
  });

  it('should render the component with default variant', () => {
    render(<MyComponent text="Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toHaveClass('bg-gray-100');
  });

  it('should render the component with primary variant', () => {
    render(<MyComponent text="Primary Button" variant="primary" />);
    expect(screen.getByText('Primary Button')).toBeInTheDocument();
    expect(screen.getByText('Primary Button')).toHaveClass('bg-blue-500');
  });

  it('should apply additional className prop', () => {
    render(<MyComponent text="Styled Component" className="text-lg font-bold" />);
    const element = screen.getByText('Styled Component');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('text-lg font-bold');
  });

  it('should pass through arbitrary props', () => {
    render(<MyComponent text="Test ID" data-testid="my-component-id" />);
    expect(screen.getByTestId('my-component-id')).toBeInTheDocument();
  });
});
```

### Testing Best Practices

1.  **Unit Tests**: Test individual components, hooks, and utility functions in isolation to ensure each piece works as expected. Focus on input/output and internal logic.
2.  **Integration Tests**: Test how different components or modules interact with each other. This includes testing component trees, API service integrations, and state management flows.
3.  **End-to-End (E2E) Tests**: Use tools like Cypress or Playwright to simulate real user scenarios and test critical user flows across the entire application, ensuring the system works correctly from start to finish.
4.  **Coverage Goals**: Aim for a reasonable code coverage (e.g., 80%) to ensure a significant portion of the codebase is covered by tests, focusing on critical paths.
5.  **Test Structure**: Follow the Arrange-Act-Assert (AAA) pattern for clearer, more readable tests.
6.  **Mock External Dependencies**: Systematically mock API calls, global browser objects, routing hooks, and complex state management logic to isolate the component/unit under test and ensure deterministic test results.

## Environment Configuration

Environment variables are crucial for managing configuration differences between development, staging, and production environments. Vite provides native support for `.env` files.

```text
# .env.development - for development environment
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_FEATURE_X=true

# .env.production - for production environment
VITE_API_BASE_URL=https://api.taskflow.com/api
VITE_ANALYTICS_ID=UA-XXXXXXXXX
VITE_ENABLE_FEATURE_X=false
```

*   **Prefixing:** All client-side environment variables *must* be prefixed with `VITE_` to be exposed to the browser by Vite.
*   **Usage:** Access in code via `import.meta.env.VITE_YOUR_VARIABLE_NAME`.
*   **Security:** Never commit sensitive API keys or secrets directly into `.env` files that will be bundled for the client-side. Use server-side environment variables for sensitive data.

## Frontend Developer Standards

This section outlines critical coding rules and provides a quick reference for developers working on the TaskFlow frontend.

### Critical Coding Rules

1.  **Strict TypeScript:** Always use TypeScript. Avoid `any` type unless absolutely necessary and justified. Define clear interfaces and types for props, state, API responses.
2.  **Immutability:** Never directly mutate state in React (e.g., `useState`, `useReducer`, Zustand stores). Always create new objects/arrays when updating state.
3.  **Component Reusability:** Design components to be as generic and reusable as possible. Separate presentational logic from business logic.
4.  **Accessibility (A11y):** Prioritize accessibility. Use semantic HTML, provide alt text for images, ensure keyboard navigation, and manage focus correctly.
5.  **Performance:** Optimize rendering with `React.memo`, `useCallback`, `useMemo` where appropriate. Avoid unnecessary re-renders. Lazy load components and routes.
6.  **Error Boundaries:** Implement React Error Boundaries for gracefully handling errors in UI components.
7.  **Consistent Formatting:** Adhere to defined ESLint and Prettier rules to maintain a consistent codebase style.
8.  **Meaningful Naming:** Use descriptive names for variables, functions, components, and files.
9.  **Avoid Prop Drilling:** For deeply nested components requiring the same data, consider using React Context or a global state management solution (Zustand/Redux).
10. **Side Effects Management:** Use `useEffect` hook correctly for side effects, ensuring proper cleanup to prevent memory leaks.

### Quick Reference

*   **Common Commands:**
    *   `npm install` or `bun install`: Install dependencies
    *   `npm run dev` or `bun run dev`: Start development server
    *   `npm run build` or `bun run build`: Build for production
    *   `npm test` or `bun test`: Run tests
    *   `npm run lint` or `bun run lint`: Run ESLint
*   **Key Import Patterns:**
    *   Absolute imports using `@/`: `import { Button } from '@/components/ui/button';`
    *   Relative imports for siblings/children: `import { SubComponent } from './SubComponent';`
*   **File Naming Conventions:** (Refer to "Naming Conventions" above)
*   **Project-Specific Utilities:**
    *   `cn()`: Utility for conditionally joining Tailwind classes (from `src/lib/utils.ts`).
    *   `useAuthStore()`: Global authentication state hook (from `src/store/authStore.ts`).
    *   `apiClient`: Axios instance for API calls with interceptors (from `src/services/apiClient.ts` or specific service files).

