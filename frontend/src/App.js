import './App.css';
import './bootstrap/css/bootstrap.css';
import ShipList from './ShipList';
import { Link } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [crewList, setList] = useState([]);

  return (
    <div className='container'>
      <ShipList setList = {setList}/>
    </div>
  );
}

export default App;
