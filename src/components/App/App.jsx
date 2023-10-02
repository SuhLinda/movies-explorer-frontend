import { Routes, Route } from 'react-router-dom';

import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path='/signup'
          element={
            <Register />
          }
        />
        <Route
          path='/signin'
          element={
            <Login />
          }
        />
        <Route
          path='/'
          element={
            <Main />
          }

        />
        <Route
          path="/movies"
          element={
            <Movies />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <SavedMovies />
          }
        />
        <Route
          path='/profile'
          element={
            <Profile />
          }
        />
        <Route
          path='*'
          element={
            <ErrorNotFound />
          }
        />
      </ Routes>
    </div>
  )
}

export default App;
