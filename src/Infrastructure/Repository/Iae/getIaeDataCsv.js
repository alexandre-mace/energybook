import Papa from "papaparse";

async function getIaeDataCsv(file, setter) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    const values = Object.keys(rows[0]).filter(row => row !== 'year')
    setter({
        keys: rows.map(row => row.year)
        ,
        values: values.filter(value => value !== 'Units').map(value => ({
            name: value,
            values: rows.map(row => row[value])
        }))
    })
}
export default getIaeDataCsv;