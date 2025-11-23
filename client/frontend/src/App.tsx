
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { Layout } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import Tasks from './pages/Tasks';
import type { RootState } from './app/store';



// Auth Guard Component
const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  
  // Note: In a complex app, we might check token expiration here
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="habits" element={<Habits />} />
            <Route path="tasks" element={<Tasks />} />
            {/* Placeholder routes for future implementation */}
            <Route path="leaderboard" element={<div className="text-white">Leaderboard Coming Soon</div>} />
            <Route path="profile" element={<div className="text-white">Profile Settings Coming Soon</div>} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;