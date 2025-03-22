import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import LoginSignupPage from './pages/signupPage/LoginSignupPage';
import LogInSignUp from './pages/signupPage/LogInSignUp';
import UserForm from './pages/signupPage/userform';
import RecipeDetailPage from './pages/RecipesDetailPage/RecipeDetailPage';
import HowItWorksPage from './pages/WorkingPage/HowItWorksPage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignupPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipes/:id' element={<RecipeDetailPage />} />
        <Route path='/login' element={<LogInSignUp />} />
        <Route path='/user-form' element={<UserForm />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/how-it-works' element={<HowItWorksPage />} />
        <Route path='/contact' element={<ContactUsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
