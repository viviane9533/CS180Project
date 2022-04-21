import React from "react"

export default function Datatable({ data, deleteTableRows, addTableRows }) {
    const columns = Object.keys(data[0])
    // const {fullName, emailAddress, salary}= data;
    var data_body = new Array()

    for (var i=1; i < data.length; i++) {
        data_body[i] = data[i]
    }

    return (
    <table className="table table-bordered">
        <thead>
            <tr> 
                {data[0].map((heading) => <th> {heading} </th>)}
                <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
            </tr>
        </thead>
        <tbody>
            {data_body.map((row, index) => (
                <tr key={index}>
                    {columns.map((column) => (<td>{row[column]}</td>))}
                    <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
                </tr>

            ))}
        </tbody>
    </table>
    )
}
