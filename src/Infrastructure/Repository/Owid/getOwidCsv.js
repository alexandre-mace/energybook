import Papa from "papaparse";

async function getOwidCsv(file, setter, countrySetter, index) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    let rowsData = [].concat.apply([], rows.map(row => Object.keys(row).map((dataset, index) => ({
        name: Object.keys(row)[index],
        value: parseFloat(Object.values(row)[index]),
        year: row['Year']
    })).filter(dataset => dataset.name !== 'Year')));

    const labels = Object.keys(rows[0]).map((key, index) => key).filter(label => label !== 'Year')
    setter({
        keys: rows.map(row => row.Year),
        datasets: labels.map(label => ({
            name: label,
            values: rowsData.filter(row => row.name === label).map(row => row.value)
        }))
    })
}
export default getOwidCsv;