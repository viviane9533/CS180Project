import logo from './logo.svg';
import Datatable from "./datatable/index.js";
import BarChartComponent from "./datatable/BarComponent.js";
import './App.css';
import Popup from "./graph_popup.js"

import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from 'recharts';
import TextField from "@mui/material/TextField";

import React, { useEffect, useState , Component} from 'react';
import axios from 'axios'


function App() {

  const [getButtonGraph1Popup, setButtonGraph1Popup] = useState(false)
  const [getData, setData] = useState({})
  const [getLongestCareer, setLongestCareer] = useState({})
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

  

  function freshCareerData() {
    axios.get('http://127.0.0.1:5000/flask/Export/Longest').then(response => {
      console.log("SUCCESS", response)
      setLongestCareer(response)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(()=>{
    freshCareerData();
  }, [])
 

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
    var new_rows = []
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

  function longestCareerYears(rawData) {
    var year_length = []
    for (var i = 0; i < rawData.length; i++) {

      console.log(rawData[0])
      year_length[i] = rawData[i][0]
      
    }
    return year_length
  }

  function longestCareerPlayers(rawData) {
    var player_num = []
    for (var i = 0; i < rawData.length; i++) {

      console.log(rawData[0])
      player_num[i] = rawData[i][1]
      
    }
    return player_num
  }

 
  return (
      <div className="App">
        <div className = "sidebar">
        <div><button className = "homeicon"><i class="fa-solid fa-house"></i></button></div>
        <div><button className = "graphIcons" onClick={()=>setButtonGraph1Popup(true)}><i class="fa-solid fa-chart-area"></i></button></div>
        <div><button className = "graphIcons"><i class="fa-solid fa-chart-column"></i></button></div>
        <div><button className = "graphIcons"><i class="fa-regular fa-chart-bar"></i></button></div>
        </div>
        <p>GM FOX</p>
        <div className = "SearchBarContainer"> 
        <div className = "SearchInputContainer">
          < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
        </div>
        </div>
        <Popup trigger={getButtonGraph1Popup} setTrigger={setButtonGraph1Popup}>
          <p>Analysis of NBA Players' Career Length</p>
        <div> {getLongestCareer.status === 200 ? 
          <BarChartComponent xdata={longestCareerYears(getLongestCareer.data.message)} ydata={longestCareerPlayers(getLongestCareer.data.message)}/>
          :
          <h3>LOADING</h3>}
        </div>
        </Popup>
       

        <div> {getData.status === 200 ? 
          <Datatable data={search(getData.data.message)} deleteTableRows={deleteTableRows} addTableRows={addTableRows}/>
          :
          <h3>LOADING</h3>}
        </div>
        
      </div>
  );
}

export default App;

