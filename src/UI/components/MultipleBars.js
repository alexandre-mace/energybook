import React from 'react';
import Bar from 'react-chartjs-2';
import 'chartjs-plugin-labels';

function getRandomColor() {
    var o = Math.round, r = Math.random, s = 255;
    return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
}

const MultipleBars = ({datasets, options = {}}) => {
    return (
        <Bar
            type={'bar'}
            options={options}
            data={{
                labels: datasets.keys,
                datasets: datasets.datasets.map(dataset => {
                const label = dataset.name

                return {
                    label: label,
                    stack: 2,
                    data: dataset.values,
                    backgroundColor: `rgba(${getRandomColor()},0.6)`
                }})
            }} />
    )}
export default MultipleBars;