import React from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from 'recharts';

  function BarChartComponent (xdata, ydata) {
        function barData(x, y) {
        const data = []
    
        for (var i = 0; i < x.length; i++) {
            var a = {}
            a["name"] = x[i]
            a["users"] = y[i]
            data[i] = a
        }
        return data
    }
        return (
            <div>
            <BarChart
            width={500}
            height={300}
            data={barData(xdata, ydata)}
            margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
            }}
            barSize={20}
        >
            <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        </div>
        );
    }
  

export default BarChartComponent