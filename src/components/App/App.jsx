import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.cookieEnabled === true) {
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn)
  }, [isLoggedIn]);

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
                isLoggedIn={isLoggedIn}
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
                isLoggedIn={isLoggedIn}
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
            <ProtectedRoute
              element={Movies}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setImage={setImage}
              setText={setText}
              navigate={navigate}
              openInfoTooltip={openInfoTooltip}
              closeInfoTooltip={closeInfoTooltip}
            />
          }>
          </Route>
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setImage={setImage}
                setText={setText}
                navigate={navigate}
                openInfoTooltip={openInfoTooltip}
                closeInfoTooltip={closeInfoTooltip}
              />
          }>
          </Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                openInfoTooltip={openInfoTooltip}
                setImage={setImage}
                setText={setText}
              />
          }>
          </Route>
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
