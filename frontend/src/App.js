import logo from './logo.svg';
import Datatable from "./datatable"
import './App.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios'


function App() {

  const [getData, setData] = useState({})
  const [getQuery, setQuery] = useState("")

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/flask/Import').then(response => {
      console.log("SUCCESS", response)
      setData(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      
      <p>GM FOX</p>
        <div>{getData.status === 200 ? 
          <h3>{getData.data.message[6][0]}</h3>
          :
          <h3>LOADING</h3>}</div>

        <div> filter goes here </div>
        <div> {getData.status === 200 ? 
          <Datatable data={getData.data.message}/>
           :
          <h3>LOADING</h3>}
        </div>
    </div>
  );
}

export default App;
