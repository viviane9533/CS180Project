import Datatable from "./datatable/index.js";
import React, { useEffect, useState , Component, useCallback } from 'react';
import axios from 'axios'

function Home() {
    const [getData, setData] = useState({})
    const [getQuery, setQuery] = useState("")
    const [getSearchColumns, setSearchColumns] = useState([0,3])
    // search table part
    function freshData() {
        axios.get('http://127.0.0.1:5000/flask/Import').then(response => {
          console.log("SUCCESS", response)
          setData(response)
        }).catch(error => {
          console.log(error)
        })
      }
    
      useEffect(()=>{
        freshData();
      }, [])

    // delete part
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

   // add part
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

  // edit part
  const editTableRows = (new_name, new_team_id, new_player_id, new_season)=>{
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

  // search fucntion
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

    return (
        <div>
        <p>GM FOX</p>
        <div className = "SearchBarContainer"> 
        <div className = "SearchInputContainer">
          < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
        </div>
        </div>
        <div> {getData.status === 200 ? 
          <Datatable data={search(getData.data.message)} deleteTableRows={deleteTableRows} addTableRows={addTableRows} editTableRows={editTableRows}/>
          :
          <h3>LOADING</h3>}
        </div>
        </div>
    );
}
export default Home;