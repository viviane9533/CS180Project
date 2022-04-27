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
  const [getLongestCareer, setLongestCareer] = useState({})

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

  function topPlayer(rows) {
    var new_rows = new Array()

    for (var i = 1; i <= 5; i++) {
      new_rows[i] = rows[i]
    }

    return new_rows
  }



  // function displayTopPlayer(topPlayer){
  //   var names = new Array()
  //   for (var i = 0; i < 5; i++) {
  //     names[i] = topPlayer[i][0];
  //   }
  //   const myChart = new Chart( {
  //       type: 'bar',
  //       data: {
  //           labels: names,
  //           datasets: [{
  //               label: '# of Votes',
  //               data: [25, 22, 19, 16, 15],
  //               backgroundColor: [
  //                   'rgba(255, 99, 132, 0.2)',
  //                   'rgba(54, 162, 235, 0.2)',
  //                   'rgba(255, 206, 86, 0.2)',
  //                   'rgba(75, 192, 192, 0.2)',
  //                   'rgba(153, 102, 255, 0.2)',
  //               ],
  //               borderColor: [
  //                   'rgba(255, 99, 132, 1)',
  //                   'rgba(54, 162, 235, 1)',
  //                   'rgba(255, 206, 86, 1)',
  //                   'rgba(75, 192, 192, 1)',
  //                   'rgba(153, 102, 255, 1)',
  //               ],
  //               borderWidth: 1
  //           }]
  //       },
  //       options: {
  //           scales: {
  //               y: {
  //                   min: 10,
  //                   max: 25,
  //               }
  //           }
  //       }
  //   });
  //   return myChart;
  // }



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
        <Datatable data={search(getData.data.message)} deleteTableRows={deleteTableRows} addTableRows={addTableRows} topPlayer={topPlayer(getData.data.message)}/>
        :
        <h3>LOADING</h3>}
      </div>
    </div>
  );
}

export default App;