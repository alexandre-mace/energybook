async function getOwidJson(
    file,
    setter,
    countrySetter,
    index,
    showRenewableCategory = false,
    showOnlyRenewableCategories = false ,
    showOnlyNonRenewableCategories = false
) {
    countrySetter(Object.values(file.entityKey).map(entity => entity.name))
    const renewableCategories = ['Other renewables', 'Hydropower', 'Solar', 'Wind', 'Biofuels'];
    const data = Object.values(file.variables).map((variable) => {
        let datasets = [];
        for (let i = 0; i < variable.entities.length; i++) {
            let countryEntityKey = variable.entities[i]
            datasets.push({
                year: variable.years[i],
                value: variable.values[i],
                zone: file.entityKey[countryEntityKey].name
            })
        }

        datasets = datasets.filter(dataset => (dataset.zone === index && dataset.year > 1970))

        if (!showRenewableCategory) {
            return {
                name: variable.display.name ?? variable.name.split(' ')[0],
                keys: datasets.map(dataset => dataset.year),
                values: datasets.map(dataset => dataset.value)
                    .map(value => value * (
                        variable.display.conversionFactor
                            ? variable.display.conversionFactor
                            : variable.display.name ? 1 : 277.78)
                    )
            }
        }

        return {
            name: renewableCategories.includes(variable.display.name ?? variable.name.split(' ')[0]) ? 'Renewable' : 'Non renewable',
            keys: datasets.map(dataset => dataset.year),
            values: datasets.map(dataset => dataset.value)
                .map(value => value * (
                    variable.display.conversionFactor
                        ? variable.display.conversionFactor
                        : variable.display.name ? 1 : 277.78)
                )
        }
    })

    if (!showRenewableCategory) {
        if (showOnlyRenewableCategories) {
            setter(data.filter(data => renewableCategories.includes(data.name)))
            return;
        }
        if (showOnlyNonRenewableCategories) {
            setter(data.filter(data => !renewableCategories.includes(data.name)))
            return;
        }
        setter(data)
        return;
    }

    const renewables = data.filter(dataset => dataset.name === 'Renewable');
    const nonRenewables = data.filter(dataset => dataset.name === 'Non renewable');
    let keys = data[0].keys;

    let renewableValues = [];
    data[0].keys.forEach((value, key) => {
        renewables.forEach(dataset => {
            if (!renewableValues[key]) {
                renewableValues.push(dataset.values[key])
            } else {
                renewableValues[key] = renewableValues[key] + dataset.values[key]
            }
        })
    });

    let nonRenewableValues = [];
    data[0].keys.forEach((value, key) => {
        nonRenewables.forEach(dataset => {
            if (!nonRenewableValues[key]) {
                nonRenewableValues.push(dataset.values[key])
            } else {
                nonRenewableValues[key] = nonRenewableValues[key] + dataset.values[key]
            }
        })
    });

    setter([
        {
            name: 'Renewable',
            keys: keys,
            values: renewableValues
        },
        {
            name: 'Non renewable',
            keys: keys,
            values: nonRenewableValues
        }
    ])
}
export default getOwidJson