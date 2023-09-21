import {useState, useEffect, useMemo} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.jsx';

import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Main from '../Main/Main.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../Movies/SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');


  const navigate = useNavigate();

  function openInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }




  return (
    <CurrentUserContext.Provider value={currentUser || ''}>
      <div className="app">
        <Routes>
          <Route
            path='/signup'
            element={
              <Register
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
                setImage={setImage}
                setText={setText}
                navigate={navigate}
                openInfoTooltip={openInfoTooltip}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
                setImage={setImage}
                setText={setText}
                navigate={navigate}
                openInfoTooltip={openInfoTooltip}
              />
            }
          />
          <Route
            path='/'
            element={
              <Main/>
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                isLoggedIn={isLoggedIn}/>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <SavedMovies/>
            }
          />
          <Route
            path='/profile'
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                openInfoTooltip={openInfoTooltip}
                setImage={setImage}
                setText={setText}
              />
            }
          />

          <Route
            path='*'
            element={
              <ErrorNotFound/>
            }
          />
        </ Routes>
        <InfoTooltip
          image={image}
          text={text}
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
        />
      </div>
    </ CurrentUserContext.Provider>
  )
}

export default App;
