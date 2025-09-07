import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductManagement from './pages/ProductManagement'
import CustomerManagement from './pages/CustomerManagement'
import AccountApplication from './pages/AccountApplication'
import Sidebar from './components/Sidebar'
import { AuthProvider, useAuth } from './contexts/AuthContext'


function AppContent() {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/account-applications" element={<AccountApplication />} />
          <Route path="/account-applications/:id" element={<AccountApplication />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
