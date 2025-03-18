import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import LoginSignupPage from './pages/signupPage/LoginSignupPage';
import LogInSignUp from "./pages/signupPage/LogInSignUp";
import UserForm from "./pages/signupPage/userform";
// import RecipeDetails from './pages/RecipesDetailPage/RecipeDetails';
import RecipeDetailPage from './pages/RecipesDetailPage/RecipeDetailPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path='/login' element={<LoginSignupPage />} />
        <Route path='/login' element={<LogInSignUp />} />
        <Route path='/user-form' element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
