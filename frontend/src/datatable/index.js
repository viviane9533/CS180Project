import React from "react"
import '../index.css'
import Popup from "./add_popup.js"
import { useState , useMemo } from 'react'
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import '../Pagination/style.scss';
import Pagination from "../Pagination/Pagination";
import '../Pagination/pagination.scss'
let PageSize = 25;

export default function Datatable({ data, deleteTableRows, addTableRows, topPlayer }) {
    const [getButtonAddPopup, setButtonAddPopup] = useState(false)
    const [getButtonTopPlayerPopup, setButtonTopPlayerPopup] = useState(false)

    const [getPlayerName, setPlayerName] = useState("")
    const [getTeamID, setTeamID] = useState("")
    const [getPlayerID, setPlayerID] = useState("")
    const [getSeason, setSeason] = useState("")

    const [currentPage, setCurrentPage] = useState(1);


    const columns = Object.keys(data[0])
    var data_body = new Array()

    for (var i=1; i < data.length; i++) {
        data_body[i] = data[i]
    }

     const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data_body.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);

    return (
    <div>
        <button className="addbutton" onClick={()=>setButtonAddPopup(true)}>Add New Player</button>
        {/* <a href="http://127.0.0.1:5500/index.html"><button className="btn btn-outline-danger" />Top Player</a> */}
        {/* <button className="btn btn-outline-danger" value="topPlayer" onclick="javascript:window.location.href='http://127.0.0.1:5500/index.html'" /> */}
        <table className = "dataTable" cellPadding={0} cellspacing={50}>
            <thead>
                <tr> 
                    {data[0].map((heading) => <th> {heading} </th>)}
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {currentTableData.map((row,index) => (
                    
                    <tr key={index}>
                        {columns.map((column) => (<td>{row[column]}</td>
                        ))}
                         <td><button className="iconbuttons"><i class="fa-solid fa-pen-to-square"></i></button></td>
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

            
        </table>
        <Pagination
    className="pagination-bar"
    currentPage={currentPage}
    totalCount={data_body.length}
    pageSize={PageSize}
    onPageChange={page => setCurrentPage(page)}
  />
    </div>
    
    )
}