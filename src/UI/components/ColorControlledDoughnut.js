import React from 'react';
import {Doughnut as ChartDoughnut} from 'react-chartjs-2';
import 'chartjs-plugin-labels';

function getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
}


const ColorControlledDoughnut = ({datasets, options = {}}) => (
    <ChartDoughnut
        height={100}
        options={{
            plugins: {
                datalabels: false,
                labels: {
                    render: 'label',
                    fontSize: 14,
                    fontStyle: 'bold',
                    fontColor: '#000',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                }
            }
        }}
        data={{
            labels: datasets.map(dataset => dataset.name),
            datasets: [{
                data: datasets.map(dataset => dataset.value),
                backgroundColor: datasets.map(dataset => dataset.color)
            }]
        }} />
)
export default ColorControlledDoughnut;