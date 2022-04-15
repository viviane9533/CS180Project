import logo from './logo.svg';
import Datatable from "./datatable"
import './App.css';
import { SearchBar } from './components/searchBar';
import { putton } from './components/searchBar';
import TextField from "@mui/material/TextField";

import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  const [getData, setData] = useState({})
  const [getQuery, setQuery] = useState("")
  const [getSearchColumns, setSearchColumns] = useState([0,3])

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/flask/Import').then(response => {
      console.log("SUCCESS", response)
      setData(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  function search(rows) {
    var new_rows = new Array()
    var j = 0
    var equals = false

    new_rows[j] = rows[0]

    for (var i = 1; i < rows.length; i++) {
        equals = false

        for (var k = 0; k < getSearchColumns.length; k++) {
          var str = rows[i][getSearchColumns[k]].toLowerCase()
          equals = equals || str.includes(getQuery.toLowerCase())
        }

        if (equals) {
          j = j + 1
          new_rows[j] = rows[i]
        }
    }

    return new_rows
  }

  const columns = getData[0]  

  return (
    <div className="App">
      <p>GM FOX</p>
      <div className = "SearchBarContainer"> 
      <div className = "SearchInputContainer">
        < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
      </div>
      </div>
      <div> {getData.status === 200 ? 
        <Datatable data={search(getData.data.message)}/>
        :
        <h3>LOADING</h3>}
      </div>
    </div>
  );
}

export default App;
