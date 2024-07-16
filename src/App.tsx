import { BaseStyles, ThemeProvider } from '@primer/react'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoutes'
import Profile from './pages/Profile'
import Todo from './pages/Todo'


function App() {


  return (
    <>
      <ThemeProvider>
        <BaseStyles>
          
          <Router>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/todo" element={<Todo />} />
                
              </Route>
            </Routes>
          </Router>
        </BaseStyles>
      </ThemeProvider>

    </>
  )
}

export default App
