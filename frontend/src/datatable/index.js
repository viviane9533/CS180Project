import React from "react"
import './index.css'
import Popup from "./add_popup.js"
import { useState } from 'react'

export default function Datatable({ data, deleteTableRows, addTableRows, editTableRows }) {
    const [getButtonAddPopup, setButtonAddPopup] = useState(false)
    const [getButtonEditPopup, setButtonEditPopup] = useState(false)
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
        <button className="addbutton" onClick={()=>setButtonAddPopup(true)}>Add New Player</button>
        <table className = "dataTable" cellPadding={0} cellspacing={50}>
            <thead>
                <tr> 
                    <th>Player Name</th>
                    <th>Team ID</th>
                    <th>Player ID</th>
                    <th>Season</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data_body.map((row,index) => (
                    
                    <tr key={index}>
                        {columns.map((column) => (<td>{row[column]}</td>
                        ))}
                        <td><button className="iconbuttons" onClick= {()=> {deleteTableRows(index);setPlayerName(row[0]);setTeamID(row[1]);setPlayerID(row[2]);setSeason(row[3]);setButtonEditPopup(true);}} ><i class="fa-solid fa-pen-to-square"></i></button></td>
                        <td><button className="iconbuttons" onClick={()=>(deleteTableRows(index))}><i class="fa-solid fa-trash-can"></i></button></td>

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
                    <button className="addbutton" onClick={()=>addTableRows(getPlayerName, getTeamID, getPlayerID, getSeason)}>Add Player</button>
                </form>
            </Popup>
            <Popup trigger={getButtonEditPopup} setTrigger={setButtonEditPopup}>
                <h3>Edit Player</h3>
                <form className="form">
                    <label> Player name: </label>
                    <input
                        type="text"
                        defaultValue = {getPlayerName}
                        placeholder = {getPlayerName}
                        value={getPlayerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <label> Team ID: </label>
                    <input
                        type="text"
                        defaultValue = {setTeamID}
                        placeholder = {setTeamID}
                        required
                        value={getTeamID}
                        onChange={(e) => setTeamID(e.target.value)}
                    />
                    <label> Player ID: </label>
                    <input
                        type="text"
                        defaultValue = {setPlayerID}
                        placeholder = {setPlayerID}
                        required
                        value={getPlayerID}
                        onChange={(e) => setPlayerID(e.target.value)}
                    />
                    <label> Season: </label>
                    <input
                        type="text"
                        defaultValue = {setSeason}
                        placeholder = {setSeason}
                        required
                        value={getSeason}
                        onChange={(e) => setSeason(e.target.value)}
                    />
                    <button className="addbutton" onClick={()=>editTableRows(getPlayerName, getTeamID, getPlayerID, getSeason)}>Apply Changes</button>
                </form>
            </Popup>
        </table>
    </div>
    )
}