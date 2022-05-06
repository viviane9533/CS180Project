import React from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Label, Cell, Text} from 'recharts';

  function Bar_game ({xdata, ydata}) {
        function barData() {
            // console.log("%d",xdata.length)
            // console.log(xdata)
            var data = []
            for (var i = 0; i < xdata.length; i++) {
                var a = {name: xdata[i], player_numbers: ydata[i]}
                data[i] = a
                // console.log(a)
            }
            return data
        }

        function CustomTooltip({ payload, label, active }) {
            if (active) {
              return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}  ${' matches'}`}</p>
                    <p className="intro">{`${label} ${' has played '} ${payload[0].value} ${ ' games so far in 2019'}`}</p>

                </div>
              );
            }
            return null
        }
          

        return (
            <div>
            <BarChart
            width={1500}
            height={300}
            data={barData()}
            margin={{
            top: 5,
            right: 900,
            left: 0,
            bottom: 5,
            }}
            barSize={30}
        >
    
            <Bar dataKey="player_numbers" fill="#FFC0CB" background={{ fill: "#ADD8E6" }} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }} 
            tick={{fontSize: 10}}
            interval = {0}
            angle = {45}
            />
            <YAxis type="number" domain={[1200, 1800]} />
            <Tooltip content={<CustomTooltip />} />
            
            

        </BarChart>
        </div>
        );
    }
  

export default Bar_game