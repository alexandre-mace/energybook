import Papa from "papaparse";

async function getOwidBubbleCsv(file, setter, year) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects


    const data = rows.filter(row => parseInt(row.Year) === year).filter(row => (row['Energy use (kg of oil equivalent per capita)'] !== '' && row['Poverty - $1.90 a day (% of population)'] !== ''))
    setter(data.map(data => ({
        label: data.Entity,
        data: {x: parseFloat(data['Energy use (kg of oil equivalent per capita)']), y: parseFloat(data['Poverty - $1.90 a day (% of population)'])}
    })))
}
export default getOwidBubbleCsv;