import React from 'react';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const ComparatorSlider = ({sliderValue, setter, max, step}) => {
    const handleSliderChange = (event, newValue, setter) => {
        setter(newValue);
    };

    const handleInputChange = (event, setter) => {
        setter(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = (value, setter) => {
        if (value < 0) {
            setter(0);
        } else if (value > 1000000) {
            setter(1000000);
        }
    };

    return (
        <div className={"row no-gutter sliders"}>
            <div className="col-12 col-sm-9 pr-0">
                <Slider
                    value={typeof sliderValue === 'number' ? sliderValue : 0}
                    onChange={((event, newValue) => handleSliderChange(event, newValue, setter))}
                    max={max}
                    step={step}
                    aria-labelledby="input-slider"
                />
            </div>
            <div className="col-12 col-sm-3">
                <Input
                    value={sliderValue}
                    margin="dense"
                    onChange={((event) => handleInputChange(event, setter))}
                    onBlur={() => handleBlur(sliderValue, setter)}
                    style={{width: 120}}
                    inputProps={{
                        step: step,
                        min: 0,
                        max: max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </div>
        </div>
    )
}
export default ComparatorSlider;