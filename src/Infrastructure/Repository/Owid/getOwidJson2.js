async function getOwidJson2(
    file,
    setter
) {
    let data = Object.values(file.variables).map((variable) => {
        let datasets = [];
        for (let i = 0; i < variable.entities.length; i++) {
            let countryEntityKey = variable.entities[i]
            datasets.push({
                year: variable.years[i],
                value: variable.values[i],
                zone: file.entityKey[countryEntityKey].name
            })
        }

        return {
            name: datasets.map(dataset => dataset.zone),
            keys: datasets.map(dataset => dataset.year),
            values: datasets.map(dataset => dataset.value)
        }
    })

    data = data[0].name.map((key, index) => ({
        name: data[0].name[index],
        keys: data[0].keys[index],
        value: data[0].values[index]
    }))
    data = Object.values(file.entityKey).map(entity => data.filter(dataset => dataset.name === entity.name))

    setter(data.map(dataset => {
        let name = dataset[0].name
        let keys = []
        let values = []

        dataset.forEach((value, index) => {
            keys.push(value.keys)
            values.push(value.value)
        })

        return {
            name: name,
            keys: keys,
            values: values
        }
    }))
}
export default getOwidJson2;