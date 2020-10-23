import Papa from "papaparse";

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

async function getEnerdataCsv(file, setter, indexesSetter, indexes) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    indexesSetter(rows.map(row => row.zone));
    if (indexes.length > 0 && rows) {
        setter({
            keys: Object
                .keys(rows.filter(data => indexes.includes(data.zone))[0])
                .filter(data => data !== 'zone')
            ,
            values: rows.filter(data => indexes.includes(data.zone))
                .map(data => Object.values(data))
                .map(data => data.filter(value => value !== 'World')
                    .map(value => isNumeric(value) ? parseFloat(value) : value)).map(data => ({
                    name: data.pop(),
                    values: data
                }))
        })
    }
}
export default getEnerdataCsv;