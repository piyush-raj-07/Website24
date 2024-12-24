import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// redirect unauthenticated user to login page (use this for protected routes)
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user.isVerified) {
        return <Navigate to="/verify-email" replace />;
    }
    return children;
}

// redirect authenticated users based on verification status
export const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated) {
        // If user is authenticated but not verified, send to verification
        if (!user.isVerified) {
            return <Navigate to="/verify-email" replace />;
        }
        // If user is authenticated and verified, send to home
        return <Navigate to="/" replace />;
    }
    return children;
}

// ensure only unverified but authenticated users can access verification page
export const RequireUnverifiedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (user.isVerified) {
        return <Navigate to="/" replace />;
    }

    return children;
} 