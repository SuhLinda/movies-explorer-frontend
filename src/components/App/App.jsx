import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';

import { SIGNUP, SIGNIN, BASE_PAGE, MOVIES_PAGE, SAVED_MOVIES_PAGE, PROFILE_PAGE, NOT_FOUND_PAGE, IS_LOGGED_IN, SAVED_MOVIES } from '../../utils/constants.jsx';

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
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem(IS_LOGGED_IN)) || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem(SAVED_MOVIES)) || []);

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
            path={SIGNUP}
            element={
            <ProtectedRoute
              element={Register}
              isLoggedIn={!isLoggedIn}
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
            path={SIGNIN}
            element={
            <ProtectedRoute
              element={Login}
              isLoggedIn={!isLoggedIn}
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
            path={BASE_PAGE}
            element={
              <Main
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path={MOVIES_PAGE}
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setImage={setImage}
                setText={setText}
                openInfoTooltip={openInfoTooltip}
                closeInfoTooltip={closeInfoTooltip}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path={SAVED_MOVIES_PAGE}
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
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path={PROFILE_PAGE}
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
            }
          />
          <Route
            path={NOT_FOUND_PAGE}
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
