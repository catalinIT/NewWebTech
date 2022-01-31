import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CrewEditingForm from './CrewEditingForm';
import CrewRouted from "./CrewRouted";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/crew/:id" element={<CrewRouted />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
