import Papa from "papaparse";

async function getEnerdataCsv(file, setter, countrySetter, index) {
    const response = await fetch(file)
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
    const rows = results.data // array of objects

    countrySetter(rows.map(row => row.zone));
    setter({
        keys: Object
            .keys(rows.filter(data => data.zone === index)[0])
            .filter(data => data !== 'zone')
        ,
        values: Object
            .values(rows.filter(data => data.zone === index)[0])
            .filter(value => value !== 'World')
            .map(value => parseFloat(value))
    })
}
export default getEnerdataCsv;