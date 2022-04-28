import React from "react"
import '../index.css'
import Popup from "./add_popup.js"
import { useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

export default function Datatable({ data, deleteTableRows, addTableRows, topPlayer }) {
    const [getButtonAddPopup, setButtonAddPopup] = useState(false)
    const [getButtonTopPlayerPopup, setButtonTopPlayerPopup] = useState(false)

    const [getPlayerName, setPlayerName] = useState("")
    const [getTeamID, setTeamID] = useState("")
    const [getPlayerID, setPlayerID] = useState("")
    const [getSeason, setSeason] = useState("")

    const columns = Object.keys(data[0])
    var data_body = new Array()

    for (var i=1; i < data.length; i++) {
        data_body[i] = data[i]
    }

    return (
    <div>
        <button className="btn btn-outline-danger" onClick={()=>setButtonAddPopup(true)}>Add</button>
        <a href="http://127.0.0.1:5500/index.html"><button className="btn btn-outline-danger" />Top Player</a>
        {/* <button className="btn btn-outline-danger" value="topPlayer" onclick="javascript:window.location.href='http://127.0.0.1:5500/index.html'" /> */}
        <table className = "dataTable" cellPadding={0} cellspacing={50}>
            <thead>
                <tr> 
                    {data[0].map((heading) => <th> {heading} </th>)}
    
                </tr>
            </thead>
            <tbody>
                {data_body.map((row,index) => (
                    
                    <tr key={index}>
                        {columns.map((column) => (<td>{row[column]}</td>
                        ))}
                        <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
                    </tr>
                    
                ))}
            </tbody>
            <Popup trigger={getButtonAddPopup} setTrigger={setButtonAddPopup}>
                <h3>Add a Player</h3>
                <form className="form">
                    <label> Player name: </label>
                    <input
                        type="text"
                        required
                        value={getPlayerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <label> Team ID: </label>
                    <input
                        type="text"
                        required
                        value={getTeamID}
                        onChange={(e) => setTeamID(e.target.value)}
                    />
                    <label> Player ID: </label>
                    <input
                        type="text"
                        required
                        value={getPlayerID}
                        onChange={(e) => setPlayerID(e.target.value)}
                    />
                    <label> Season: </label>
                    <input
                        type="text"
                        required
                        value={getSeason}
                        onChange={(e) => setSeason(e.target.value)}
                    />
                    <button onClick={()=>addTableRows(getPlayerName, getTeamID, getPlayerID, getSeason)}>Add Player</button>
                </form>
            </Popup>

            
        </table>
    </div>
    
    )
}