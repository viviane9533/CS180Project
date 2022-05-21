import logo from './logo.svg';
import Datatable from "./datatable/index.js";
import BarChartComponent from "./datatable/BarComponent.js";
import Bar_game from "./datatable/Bar_game.js";
import './App.css';
import Popup from "./graph_popup.js"

import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from 'recharts';
import TextField from "@mui/material/TextField";

import React, { useEffect, useState , Component} from 'react';
import axios from 'axios'
import Select from 'react-select';

function App() {

  const [getButtonGraph1Popup, setButtonGraph1Popup] = useState(false)
  const [getButtonGraph2Popup, setButtonGraph2Popup] = useState(false)
  const [getData, setData] = useState({})
  const [getLongestCareer, setLongestCareer] = useState({})
  const [getGamesPlayed, setGamesPlayed] = useState({})
  const [getQuery, setQuery] = useState("")
  const [getFilter,setFilter] = useState("")
  const [getFilter2,setFilter2] = useState("")
  const [getSearchColumns, setSearchColumns] = useState([0,3])
  const [getSearchColumns2, setSearchColumns2] = useState([1,2])




  // get data part

  // first part
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


  // career part
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
 

  // game part
  function freshgetGamesPlayedData() {
    axios.get('http://127.0.0.1:5000/flask/Export/GamesPlayed').then(response => {
      console.log("SUCCESS", response)
      setGamesPlayed(response)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(()=>{
    freshgetGamesPlayedData();
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
// dropdown table

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

  function gamePlayer(rawData) {
    var players = []
    for (var i = 0; i < 10; i++) {

      console.log(rawData[1])
      players[i] = rawData[i][1]
      
    }
    return players
  }
 
  function gameNum(rawData) {
    var game_num = []
    for (var i = 0; i < 10; i++) {

      console.log(rawData[1])
      game_num[i] = rawData[i][2]
      
    }
    return game_num
  }

  return (
      <div className="App">
        <div className = "sidebar">
        <div><button className = "homeicon"><i class="fa-solid fa-house"></i></button></div>
        <div><button className = "graphIcons" onClick={()=>setButtonGraph1Popup(true)}><i class="fa-solid fa-chart-column"></i></button></div>
        <div><button className = "graphIcons" onClick={()=>setButtonGraph2Popup(true)}><i class="fa-solid fa-chart-area"></i></button></div>
        <div><button className = "graphIcons"><i class="fa-regular fa-chart-bar"></i></button></div>
        </div>
        <p>GM FOX</p>
      
        <div className = "SearchBarContainer"> 
        <div className = "SearchInputContainer">
          < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
        </div>
        </div>
        <div style={{ padding: '75px', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          <Select options={seasons} value={seasons.label} onChange={(seasons) => setFilter(seasons.value)} />
          <Select options={teams} value={teams.label} onChange={(teams) => setFilter2(teams.value)} />

          </div>
       
        <Popup trigger={getButtonGraph1Popup} setTrigger={setButtonGraph1Popup}>
          <p>Analysis of NBA Players' Career Length</p>
        <div> {getLongestCareer.status === 200 ? 
          <BarChartComponent xdata={longestCareerYears(getLongestCareer.data.message)} ydata={longestCareerPlayers(getLongestCareer.data.message)}/>
          :
          <h3>LOADING</h3>}
        </div>
        </Popup>
       

        <Popup trigger={getButtonGraph2Popup} setTrigger={setButtonGraph2Popup}>
          <p>TOP 10 NBA PLAYERS</p>
        <div> {getGamesPlayed.status === 200 ? 
          <Bar_game xdata={gamePlayer(getGamesPlayed.data.message)} ydata={gameNum(getGamesPlayed.data.message)}/>
          :
          <h3>LOADING</h3>}
        </div>
        </Popup>

        <div> {getData.status === 200 ? 
          <Datatable data={teamSearch(yearSearch(search(getData.data.message)))} deleteTableRows={deleteTableRows} addTableRows={addTableRows}/>
          :
          <h3>LOADING</h3>}
        </div>
        
      </div>
  );
}

export default App;

