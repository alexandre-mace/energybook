import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";
import RenewableEnergyInvestment from "./RenewableEnergyInvestment";
import RenewableEnergyInvestmentByTechology from "./RenewableEnergyInvestmentByTechnology";
import RenewableEnergyInvestmentByGdp from "./RenewableEnergyInvestmentByGdp";
import {FormLabel} from "@material-ui/core";

const PlayableEnergyInvestment = ({animation = true}) => {
    const [byTechnology, setByTechnology] = React.useState(false)
    const [byGdp, setByGdp] = React.useState(false)

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col">
                        <FormGroup row>
                            <FormLabel component="legend">Filter by</FormLabel>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={byTechnology}
                                        onChange={() => {
                                            setByTechnology(!(byTechnology))
                                            setByGdp(false)
                                        }}
                                        name="byTechnology"
                                        color="primary"
                                    />
                                }
                                label="Technology"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={byGdp}
                                        onChange={() => {
                                            setByGdp(!(byGdp))
                                            setByTechnology(false)
                                        }}
                                        name="byGdp"
                                        color="primary"
                                    />
                                }
                                label="GDP"
                            />
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className={'min-chart-wrapper-height'}>
                {(!byTechnology && !byGdp) &&
                <RenewableEnergyInvestment/>
                }
                {byTechnology &&
                <RenewableEnergyInvestmentByTechology/>
                }
                {byGdp &&
                <RenewableEnergyInvestmentByGdp/>
                }
            </div>
        </>
    )
}
export default PlayableEnergyInvestment