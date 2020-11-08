import React from 'react';
import {Doughnut as ChartDoughnut} from 'react-chartjs-2';
import 'chartjs-plugin-labels';
import useWindowDimensions from "../utils/useWindowDimension";

function getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
}


const Doughnut = ({datasets, options = {}}) => {
    const { width } = useWindowDimensions();

    return (
        <ChartDoughnut
            options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    datalabels: false,
                    labels: [
                        {
                            render: 'label',
                            fontSize: width > 760 ? '14' : '8',
                            fontStyle: 'bold',
                            fontColor: '#000',
                            fontFamily: '"Lucida Console", Monaco, monospace'
                         },
                        {
                            render: 'percentage',
                            fontSize: width > 760 ? '14' : '8',
                            position: 'outside',
                            fontColor: '#000',
                            fontFamily: '"Lucida Console", Monaco, monospace'
                        },
                    ]
                },
                legend: {
                    display: width > 760
                },
            }}
            data={{
                labels: datasets.map(dataset => dataset.name),
                datasets: [{
                    data: datasets.map(dataset => dataset.value),
                    backgroundColor: datasets.map(() => `rgba(${getRandomColor()},0.6)`)
                }]
            }}/>
    )
}
export default Doughnut;