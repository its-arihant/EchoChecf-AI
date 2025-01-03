import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import LoginSignupPage from './pages/signupPage/LoginSignupPage';
import LogInSignUp from "./pages/signupPage/LogInSignUp"; // SignUp page
import UserForm from "./pages/signupPage/userform"; // UserForm page

function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/login' element={<LoginSignupPage />} />

        {/* New routes */}
        <Route path='/login' element={<LogInSignUp />} />
        <Route path='/user-form' element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
