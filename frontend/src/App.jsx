import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/employer-dashboard"
            element={
              <ProtectedRoute>
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;