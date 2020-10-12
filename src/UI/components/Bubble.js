import React from 'react';
import {Bubble as ChartBubble} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import 'chartjs-plugin-datalabels';

function getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
}

const Bubble = ({datasets, options = {}}) => (
    <ChartBubble
        options={options}
        data={{
            labels: datasets.map(data => data.label),
            datasets: datasets.map(dataset => {
                return {
                    label: dataset.label,
                    backgroundColor: `rgba(${getRandomColor()},0.4)`,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [{x: dataset.data.x, y: dataset.data.y, r: 5}]
                }
            })
        }} />
)
export default Bubble;