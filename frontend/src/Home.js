import Datatable from "./datatable/index.js";
import React, { useEffect, useState , Component, useCallback } from 'react';
import Select from 'react-select';
import axios from 'axios'

function Home() {
    const [getData, setData] = useState({})
    const [getQuery, setQuery] = useState("")
    const [getSearchColumns, setSearchColumns] = useState([0,3])
    const [getSearchColumns2, setSearchColumns2] = useState([1,2])
    const [getFilter,setFilter] = useState("")
    const [getFilter2,setFilter2] = useState("")
    const [getArray, setArray] = useState([])

    // search table part
    function freshData() {
      axios.get('http://127.0.0.1:5000/flask/Import').then(response => {
        console.log("SUCCESS", response)
        setData(response)
        setArray(setIndexes(response.data.message))
      }).catch(error => {
        console.log(error)
      })
    }
  
    useEffect(()=>{
      freshData();
    }, [])
  
    function setIndexes(raw_data) {
      var new_data = raw_data
      var size = new_data[0].length
      
      for (var i = 0; i < new_data.length; i++) {
        new_data[i][size] = i
      }
  
      return new_data
    }

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

  const seasons = [
    { value: '', label: 'All Seasons' },
    { value: '2009', label: '2009' },
    { value: '2010', label: '2010' },
    { value: '2011', label: '2011' },
    { value: '2012', label: '2012' },
    { value: '2013', label: '2013' },
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' }
  ]
  const teams = [
    { value: '', label: 'All Teams' },
    { value: '1610612737', label: 'Atlanta Hawks' },
    { value: '1610612738', label: 'Boston Celtics' },
    { value: '1610612740', label: 'New Orleans Pelicans' },
    { value: '1610612741', label: 'Chicago Bulls' },
    { value: '1610612742', label: 'Dallas Mavericks' },
    { value: '1610612743', label: 'Denver Nuggets' },
    { value: '1610612743', label: 'Houston Rockets' },
    { value: '1610612746', label: 'Los Angeles Clippers' },
    { value: '1610612747', label: 'Los Angeles Lakers' },
    { value: '1610612747', label: 'Miami Heat' },
    { value: '1610612749', label: 'Milwaukee Bucks' },
    { value: '1610612750', label: 'Minnesota Timberwolves' },
    { value: '1610612751', label: 'Brooklyn Nets' },
    { value: '1610612752', label: 'New York Knicks' },
    { value: '1610612753', label: 'Orlando Magic' },
    { value: '1610612752', label: 'Indiana Pacers' },
    { value: '1610612755', label: 'Philadelphia 76ers' },
    { value: '1610612756', label: 'Phoenix Suns' },
    { value: '1610612757', label: 'Portland Trailblazers' },
    { value: '1610612758', label: 'Sacramento Kings' },
    { value: '1610612759', label: 'San Antonio Spurs' },
    { value: '1610612760', label: 'Oklahoma City Thunder' },
    { value: '1610612761', label: 'Toronto Raptors' },
    { value: '1610612762', label: 'Utah Jazz' },
    { value: '1610612763', label: 'Memphis Grizzlies' },
    { value: '1610612764', label: 'Washington Wizards' },
    { value: '1610612765', label: 'Detroit Pistons' },
    { value: '1610612766', label: 'Charlotte Hornets' },
    { value: '1610612739', label: 'Cleveland Cavaliers' },
    { value: '1610612744', label: 'Golden State Warriors' }
  
  ]

  const MyComponent = () => (
    <Select options={seasons} />
  )
  function teamSearch(rows) {
    var new_rows = []
    var j = 0
    var equals = false
  
    new_rows[j] = rows[0]
  
    for (var i = 1; i < rows.length; i++) {
        equals = false
  
        for (var k = 0; k < getSearchColumns2.length; k++) {
          var str = rows[i][getSearchColumns2[k]].toLowerCase()
          equals = equals || str.includes(getFilter2.toLowerCase())
        }
  
        if (equals) {
          j = j + 1
          new_rows[j] = rows[i]
        }
    }
  
    return new_rows
  }
  function yearSearch(rows) {
    var new_rows = []
    var j = 0
    var equals = false
  
    new_rows[j] = rows[0]
  
    for (var i = 1; i < rows.length; i++) {
        equals = false
  
        for (var k = 0; k < getSearchColumns.length; k++) {
          var str = rows[i][getSearchColumns[k]].toLowerCase()
          equals = equals || str.includes(getFilter.toLowerCase())
        }
  
        if (equals) {
          j = j + 1
          new_rows[j] = rows[i]
        }
    }
  
    return new_rows
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

    return (
        <div>
        <div className = "SearchBarContainer"> 
        <div className = "SearchInputContainer">
          < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
        </div>
        </div>
        <div style={{ padding: '75px', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          <Select options={seasons} value={seasons.label} onChange={(seasons) => setFilter(seasons.value)} />
          <Select options={teams} value={teams.label} onChange={(teams) => setFilter2(teams.value)} />

          </div>

        <div> {getData.status === 200 ? 
          <Datatable data={teamSearch(yearSearch(search(getData.data.message)))} deleteTableRows={deleteTableRows} addTableRows={addTableRows} editTableRows={editTableRows}/>
          :
          <h3>LOADING</h3>}
        </div>
        </div>
    );
}
export default Home;