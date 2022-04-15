import React from "react"
import './index.css'
export default function Datatable({ data }) {
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
            {data_body.map((row) => (
                <tr>
                    {columns.map((column) => (<td>{row[column]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
    )
}