import React from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from 'recharts';

  function BarChartComponent ({xdata, ydata}) {
        function barData() {
            // console.log("%d",xdata.length)
            // console.log(xdata)
            var data = []
            for (var i = 0; i < xdata.length; i++) {
                var a = {name: xdata[i], users: ydata[i]}
                data[i] = a
                console.log(a)
            }
            return data
        }

        return (
            <div>
            <BarChart
            width={800}
            height={300}
            data={barData()}
            // data = {data}
            margin={{
            top: 5,
            right: 200,
            left: 5,
            bottom: 5,
            }}
            barSize={50}
        >
    
            <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
            />
            <YAxis />

            
            

        </BarChart>
        </div>
        );
    }
  

export default BarChartComponent