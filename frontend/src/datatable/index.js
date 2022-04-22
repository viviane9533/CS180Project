import React from "react"
import '../index.css'
export default function Datatable({ data, deleteTableRows }) {
    const columns = Object.keys(data[0])
    var data_body = new Array()

    for (var i=1; i < data.length; i++) {
        data_body[i] = data[i]
    }

    return (
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
                    {/* button added */}
                    <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
                </tr>
                
            ))}
        </tbody>
    </table>
    )
}