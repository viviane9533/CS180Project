<<<<<<< HEAD
import MVPDatatable from "./datatable/MVPTable.js";
=======
import MVPDatatable from "./datatable/MVPtable.js";
>>>>>>> a690e0066240d1905221ac99c79011fce997e9a3
import React, { useEffect, useState , Component, useCallback } from 'react';
import axios from 'axios'

function MVP() {
    const [getMVPData, setMVPData] = useState({})
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
    return (
        <div>
        <p> MVP of BASKETBALL GAME SINCE 10/07/2003</p>
        <div> {getMVPData.status === 200 ? 
          <MVPDatatable data={getMVPData.data.message} />
          :
          <h3>LOADING</h3>}
        </div>
        </div>
    );
}
export default MVP;