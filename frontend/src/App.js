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
    freshData();
  }, [])
  
  function freshData() {
    axios.get('http://127.0.0.1:5000/flask/Import').then(response => {
      console.log("SUCCESS", response)
      setData(response)
    }).catch(error => {
      console.log(error)
    })
  }
 

  // axios.post("http://127.0.0.1:5000/flask/Import", 
  //            { type : "Add" , message : "Kobe Bryant, 1, 1, 22\n"})
  //         .then(function (response) {
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  // axios.post("http://127.0.0.1:5000/flask/Import", 
  //           { type : "Delete" , message : "Zichao Bryant, 1, 1, 22\n"})
  //         .then(function (response) {
  //           console.log(response);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });

  const deleteTableRows = (index)=>{
    var b = getData.data.message[index]
    var a = ''
    for (var i = 0; i < b.length; i++) {
      if (i < b.length - 1){
       a += b[i] + ','
      } else {
        a += b[i] + ''
      }
    }
    axios.post("http://127.0.0.1:5000/flask/Import", 
              { type : "Delete" , message : a })
          .then(function (response) {
            console.log(response);
            freshData();
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  const addTableRows = (new_name, new_team_id, new_player_id, new_season)=>{
    var a = new_name + ',' + new_team_id + ',' + new_player_id + ','+ new_season + '\n'

    axios.post("http://127.0.0.1:5000/flask/Import", 
              { type : "Add" , message : a })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          freshData()
  }

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
      <div className = "sidebar">
      <div><button className = "homeicon"><i class="fa-solid fa-house"></i></button></div>
    <div><button className = "graphIcons"><i class="fa-solid fa-chart-area"></i></button></div>
    <div><button className = "graphIcons"><i class="fa-solid fa-chart-column"></i></button></div>
    <div><button className = "graphIcons"><i class="fa-regular fa-chart-bar"></i></button></div>
    </div>
      <p>GM FOX</p>
      <div className = "SearchBarContainer"> 
      <div className = "SearchInputContainer">
        < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
      </div>
      </div>
      <div> {getData.status === 200 ? 
        <Datatable data={search(getData.data.message)} deleteTableRows={deleteTableRows} addTableRows={addTableRows}/>
        :
        <h3>LOADING</h3>}
      </div>
    </div>
  );
}

export default App;