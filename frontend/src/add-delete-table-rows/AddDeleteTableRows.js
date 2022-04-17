import TableRows from "../datatable/TableRows";
import React, { useEffect, useState } from 'react';
import axios from 'axios'
// import TableRows from "./TableRows"
function AddDeleteTableRows(){
    const [rowsData, setRowsData] = useState([]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/flask/Import').then(response => {    // my url
          console.log("SUCCESS", response)
          setRowsData(response)
        }).catch(error => {
          console.log(error)
        })
    
      }, [])

    const addTableRows = ()=>{
  
        const rowsInput={
            PLAYER_NAME:'',
            TEAM_ID:'',
            PLAYER_ID:'',
            SEASON:''
        } 
        setRowsData([...rowsData, rowsInput])
      
    }
   const deleteTableRows = (index)=>{
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
   }
 
   const handleChange = (index, evnt)=>{
    
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

}
    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-8">

                <table className="table">
                    <thead>
                      <tr>
                          <th>PLAYER_NAME</th>
                          <th>TEAM_ID</th>
                          <th>PLAYER_ID</th>
                          <th>SEASON</th>

                          <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                      </tr>

                    </thead>
                   <tbody>

                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">

                </div>
            </div>
        </div>
    )

}
export default AddDeleteTableRows