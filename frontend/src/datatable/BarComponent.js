import React from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from 'recharts';

  function BarChartComponent ({xdata, ydata}) {
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
        function getIntroOfPage(label) {
            if (label === 1) {
                return ' players with a 1-year career length';
            } 
            if (label === 2) {
                return ' players with a 2-year career length';
            } 
            if (label === 3) {
                return ' players with a 3-year career length';
            } 
            if (label === 4) {
                return ' players with a 4-year career length';
            } 
            if (label === 5) {
                return ' players with a 5-year career length';
            } 
            if (label === 6) {
                return ' players with a 6-year career length';
            }
            if (label === 7) {
                return ' players with a 7-year career length';
            }
            if (label === 8) {
                return ' players with a 8-year career length';
            }
            if (label === 9) {
                return ' players with a 9-year career length';
            }
            if (label === 10) {
                return ' players with a 10-year career length';
            }
            if (label === 11) {
                return ' players with a 11-year career length';
            }
        }

        function CustomTooltip({ payload, label, active }) {
            if (active) {
              return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} ${'years'}: ${payload[0].value}  ${' players'}`}</p>
                    <p className="intro">{`${payload[0].value} ${getIntroOfPage(label)}`}</p>

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
            // data = {data}
            margin={{
            top: 5,
            right: 900,
            left: 0,
            bottom: 5,
            }}
            barSize={50}
        >
    
            <Bar dataKey="player_numbers" fill="#8884d8" background={{ fill: "#eee" }} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            
            

        </BarChart>
        </div>
        );
    }
  

export default BarChartComponent