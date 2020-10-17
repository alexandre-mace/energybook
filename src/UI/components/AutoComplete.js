import {Autocomplete as MuiAutoComplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import React from "react";

const AutoComplete = ({options, setIndex, index}) => {
    return (
        <MuiAutoComplete
            size="small"
            options={options}
            getOptionLabel={(option) => option.toString()}
            defaultValue={index}
            fullWidth={false}
            onChange={
                (event, value) => setIndex(value === null ? options[options.length - 1] : value)
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    fullWidth={false}
                    className={"widthTranslate"}
                    style={{width: (100 + (!isNaN(index.length) ? (index.length ** 1.7) : 10))}}
                    label={options[index]}
                    placeholder={options[index]}
                />
            )}
        />
    )
}
export default AutoComplete;