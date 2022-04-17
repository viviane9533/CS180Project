import React from "react"
export default function TableRows({rowsData, deleteTableRows, handleChange}) {
    return(
        rowsData.map((data, index)=>{
            const {PLAYER_NAME, TEAM_ID, PLAYER_ID, SEASON}= data;
            return(
                <tr key={index}>
                <td>
               <input type="text" value={PLAYER_NAME} onChange={(evnt)=>(handleChange(index, evnt))} name="PLAYER_NAME" className="form-control"/> </td>
                <td><input type="text" value={TEAM_ID}  onChange={(evnt)=>(handleChange(index, evnt))} name="TEAM_ID" className="form-control"/> </td>
                <td><input type="text" value={PLAYER_ID}  onChange={(evnt)=>(handleChange(index, evnt))} name="PLAYER_ID" className="form-control" /> </td>
                <td><input type="text" value={SEASON}  onChange={(evnt)=>(handleChange(index, evnt))} name="SEASON" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>
            
            )
        })
    )
}
