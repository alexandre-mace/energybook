import React from 'react';
import {Line as ChartLine} from 'react-chartjs-2';

function getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
}


const MultipleLines = ({datasets, options = {}}) => (
    <ChartLine
        options={options}
        data={{
            labels: datasets[0].keys,
            datasets: datasets.map(dataset => {
                const color = getRandomColor()
                return {
                label: dataset.name,
                // fill: false,
                lineTension: 0.1,
                displayColors: false,
                backgroundColor: `rgba(${color},0.6)`,
                borderColor: `rgba(${color},1)`,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: `rgba(${color},1)`,
                pointBackgroundColor: `rgba(${color},1)`,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: `rgba(${color},1)`,
                pointHoverBorderColor: `rgba(${color},1)`,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 1000,
                data: dataset.values
            }})
        }} />
)
export default MultipleLines;