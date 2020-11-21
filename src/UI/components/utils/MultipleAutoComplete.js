import {Autocomplete as MuiAutoComplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import React from "react";

const sortCountries = (countries) => {
    let data = countries.sort((a, b) => a.localeCompare(b))

    data = data.filter(data => data !== "")
    data.forEach(function(item,i){

        if(item === "World"){
            data.splice(i, 1);
            data.unshift(item);
        }
    });

    return data
}
const MultitpleAutoComplete = ({options, setIndexes, indexes, label = ''}) => {
    return (
        <MuiAutoComplete
            multiple
            size="small"
            options={options.length > 0 ? typeof options[0] === 'string' ? sortCountries(options) : options : []}
            getOptionLabel={(option) => option.toString()}
            defaultValue={indexes}
            fullWidth={false}
            value={indexes}
            onChange={
                (event, value) => {
                    setIndexes(value === null ? options[options.length - 1] : value)
                }
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth={false}
                    className={"widthTranslate"}
                    style={{width: (100 + indexes.length * 50)}}
                    label={label}
                    placeholder={label}
                />
            )}
        />
    )
}
export default MultitpleAutoComplete;