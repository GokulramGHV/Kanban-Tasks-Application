import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavContainer from './Components/NavContainer';
import Redirect from './Components/Redirect';
import BoardsView from './Pages/Boards';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SearchView from './Pages/Search';
import SignUp from './Pages/SignUp';
import TasksView from './Pages/TasksView';
import TodoView from './Pages/TodoView';
// import './App.css';

let isAuthenticated = localStorage.getItem('token') ? true : false;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route
            path="/"
            element={
              <NavContainer>
                <Home />
              </NavContainer>
            }
          />
        ) : (
          <Route path="/" element={<Redirect to="/login" />} />
        )}

        {isAuthenticated ? (
          <Route path="boards">
            <Route
              index
              element={
                <NavContainer>
                  <BoardsView />
                </NavContainer>
              }
            />
            <Route
              path=":boardID/tasks"
              element={
                <NavContainer>
                  <TasksView />
                </NavContainer>
              }
            />
          </Route>
        ) : (
          <Route path="boards">
            <Route index element={<Redirect to="/login" />} />
            <Route path=":boardID/tasks" element={<Redirect to="/login" />} />
          </Route>
        )}

        {isAuthenticated ? (
          <Route
            path="/to-do"
            element={
              <NavContainer>
                <TodoView />
              </NavContainer>
            }
          />
        ) : (
          <Route path="/" element={<Redirect to="/login" />} />
        )}

        {isAuthenticated ? (
          <Route path="search">
            <Route
              index
              element={
                <NavContainer>
                  <SearchView />
                </NavContainer>
              }
            />
            <Route
              path=":searchTerm/tasks"
              element={
                <NavContainer>
                  <SearchView />
                </NavContainer>
              }
            />
          </Route>
        ) : (
          <Route path="boards">
            <Route index element={<Redirect to="/login" />} />
            <Route path=":boardID/tasks" element={<Redirect to="/login" />} />
          </Route>
        )}

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
