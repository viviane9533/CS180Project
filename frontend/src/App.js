import logo from './logo.svg';
import Datatable from "./datatable/index.js";
import MVPDatatable from "./datatable/MVPtable.js";
import BarChartComponent from "./datatable/BarComponent.js";
import Bar_game from "./datatable/Bar_game.js";
import './App.css';
import MVP from './MVP.js';
import Home from './Home.js';
import Popup from "./graph_popup.js"

import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import React, { useEffect, useState , Component, useCallback } from 'react';
import axios from 'axios'




import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


function App() {

  const [getButtonGraph1Popup, setButtonGraph1Popup] = useState(false)
  const [getButtonGraph2Popup, setButtonGraph2Popup] = useState(false)
  const [getButtonGraph3Popup, setButtonGraph3Popup] = useState(false)
  const [getButtonMVPPopup, setButtonMVPPopup] = useState(false)
  const [getData, setData] = useState({})
  const [getMVPData, setMVPData] = useState({})
  const [getLongestCareer, setLongestCareer] = useState({})
  const [getGamesPlayed, setGamesPlayed] = useState({})
  const [getQuery, setQuery] = useState("")
  const [getSearchColumns, setSearchColumns] = useState([0,3])



  // get data part

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

  // MVP
  function freshMVPData() {
    axios.get('http://127.0.0.1:5000/flask/Export/GameMVP').then(response => {
      console.log("SUCCESS", response)
      setMVPData(response)
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(()=>{
    freshMVPData();
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

  // Pie chart
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {/* {payload.name} */}
          {`${payload.name}-YEAR GROUP`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`#players: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  function PieData(xdata, ydata) {
    // console.log("%d",xdata.length)
    // console.log(xdata)
    var data = []
    for (var i = 0; i < xdata.length; i++) {
        var a = {name: xdata[i], value: ydata[i]}
        data[i] = a
        // console.log(a)
    }
    return data
  }
  var run_once = true
  while (getLongestCareer.status == 200 && run_once) {
    var xdata = longestCareerYears(getLongestCareer.data.message)
    var ydata = longestCareerPlayers(getLongestCareer.data.message)
    var data1 = PieData(xdata, ydata)
    run_once = false
  }



  return (
      <div className="App">
      <Router >
        <div>
          <Link to="/">Home</Link>
          <Link to="/MVP">MVP</Link>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/MVP' element={<MVP />} />
        </Routes>
      </Router>
        <div className = "sidebar">
        <div><button className = "homeicon" onClick={()=>getButtonMVPPopup(true)}><i class="fa-solid fa-house"></i></button></div>
        <div><button className = "graphIcons" onClick={()=>setButtonGraph1Popup(true)}><i class="fa-solid fa-chart-column"></i></button></div>
        <div><button className = "graphIcons" onClick={()=>setButtonGraph2Popup(true)}><i class="fa-solid fa-chart-area"></i></button></div>
        <div><button className = "graphIcons" onClick={()=>setButtonGraph3Popup(true)}><i class="fa-regular fa-chart-bar"></i></button></div>
        
        </div>
        {/* <p>GM FOX</p>
        <div className = "SearchBarContainer"> 
        <div className = "SearchInputContainer">
          < input type="text" className = "SearchInput" value={getQuery} onChange={(e) => setQuery(e.target.value)} />
        </div>
        </div> */}
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

        <Popup trigger={getButtonGraph3Popup} setTrigger={setButtonGraph3Popup}>
          <p>NBA PLAYERS CAREER LENGTH SCALE CHART</p>
        <PieChart width={1000} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data1}
          cx={300}
          cy={200}
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
        </PieChart>
        </Popup>

        {/* <div> {getData.status === 200 ? 
          <Datatable data={search(getData.data.message)} deleteTableRows={deleteTableRows} addTableRows={addTableRows} editTableRows={editTableRows}/>
          :
          <h3>LOADING</h3>}
        </div>

        <div> {getMVPData.status === 200 ? 
          <MVPDatatable data={getMVPData.data.message} />
          :
          <h3>LOADING</h3>}
        </div> */}

      </div>
  );
}

export default App;

