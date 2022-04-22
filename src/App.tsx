import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavContainer from './Components/NavContainer';
import BoardsView from './Pages/Boards';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import TasksView from './Pages/TasksView';
// import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <NavContainer>
              <Home />
            </NavContainer>
          }
        />
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

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
