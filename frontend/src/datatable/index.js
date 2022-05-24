import React from "react"
import '../index.css'
import Popup from "./add_popup.js"
import { useState , useMemo } from 'react'
import '../Pagination/style.scss';
import Pagination from "../Pagination/Pagination";
import '../Pagination/pagination.scss'
let PageSize = 25;

export default function Datatable({ data, deleteTableRows, addTableRows, editTableRows, topPlayer }) {
    const [getButtonAddPopup, setButtonAddPopup] = useState(false)
    const [getButtonTopPlayerPopup, setButtonTopPlayerPopup] = useState(false)
    const [getIndex,setIndex] = useState()
    const [getButtonEditPopup, setButtonEditPopup] = useState(false)

    const [getPlayerName, setPlayerName] = useState("")
    const [getTeamID, setTeamID] = useState("")
    const [getPlayerID, setPlayerID] = useState("")
    const [getSeason, setSeason] = useState("")
    const [getAddPlayerName, setAddPlayerName] = useState("")

    const [currentPage, setCurrentPage] = useState(1);

    var columns = ["Name", "Team ID", "Player ID", "Year"]
    var indexes = [0, 1, 2, 3]
    var data_body = []

    for (var i=1; i < data.length; i++) {
        data_body[i] = data[i]
    }

     const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data_body.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);

      function refresh(){
          setCurrentPage(2);
          setTimeout(() => {  setCurrentPage(1); }, 5);
        };
    return (
    <div>
        <button className="addbutton" onClick={()=>setButtonAddPopup(true)}>Add New Player</button>
        <button className="refreshData" onClick={() => refresh()}>Refresh Data</button>
        <table className = "dataTable" cellPadding={0} cellspacing={50}>
            <thead>
                <tr> 
                    {columns.map((heading) => <th> {heading} </th>)}
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {currentTableData.map((row,index) => (
                    
                    <tr key={index}>
                        {indexes.map((column) => (<td>{row[column]}</td>
                        ))}
                         <td><button className="iconbuttons" onClick= {()=> {setIndex(row[4]);setPlayerName(row[0]);setTeamID(row[1]);setPlayerID(row[2]);setSeason(row[3]);setButtonEditPopup(true);}} ><i class="fa-solid fa-pen-to-square"></i></button></td>
                         <td><button className="iconbuttons" onClick={()=>(deleteTableRows(row[4]))}><i class="fa-solid fa-trash-can"></i></button></td>
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
                    <input className = "input"
                        type="text"
                        defaultValue = {getPlayerName}
                        placeholder = {getPlayerName}
                        value={getPlayerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <label> Team ID: </label>
                    <input className = "input"
                        type="text"
                        defaultValue = {setTeamID}
                        placeholder = {setTeamID}
                        required
                        value={getTeamID}
                        onChange={(e) => setTeamID(e.target.value)}
                    />
                    <label> Player ID: </label>
                    <input className = "input"
                        type="text"
                        defaultValue = {setPlayerID}
                        placeholder = {setPlayerID}
                        required
                        value={getPlayerID}
                        onChange={(e) => setPlayerID(e.target.value)}
                    />
                    <label> Season: </label>
                    <input className = "input"
                        type="text"
                        defaultValue = {setSeason}
                        placeholder = {setSeason}
                        required
                        value={getSeason}
                        onChange={(e) => setSeason(e.target.value)}
                    />
                    <button className="addbutton" onClick={()=>{editTableRows(getPlayerName, getTeamID, getPlayerID, getSeason, getIndex)}}>Apply Changes</button>
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