import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import React from "react";
import PlayableEnergyConsumptionBySource from "./PlayableEnergyConsumptionBySource";
import EnergyConsumptionBySector from "./EnergyConsumptionBySector";
import ElectricityConsumption from "./ElectricityConsumption";
import EnergyConsumption from "./EnergyConsumption";
import FinalEnergyConsumptionBySource from "./FinalEnergyConsumptionBySource";

const PlayableEnergyConsumption = () => {
    const [bySource, setBySource] = React.useState(true)
    const [byFinalSource, setByFinalSource] = React.useState(false)
    const [bySector, setBySector] = React.useState(false)
    const [electricity, setElectricity] = React.useState(false)
    const [defaultConsumption, setDefaultConsumption] = React.useState(false)

    return (
        <>
            <div className="container mt-3 mt-md-5">
                <div className="row">
                    <div className="col">
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={bySource}
                                        onChange={() => {
                                            setBySource(!(bySource))
                                            setByFinalSource(false)
                                            setBySector(false)
                                            setElectricity(false)
                                            setDefaultConsumption(false)
                                        }}
                                        name="bySource"
                                        color="primary"
                                    />
                                }
                                label="Consumption by Source"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={byFinalSource}
                                        onChange={() => {
                                            setByFinalSource(!(byFinalSource))
                                            setBySource(false)
                                            setBySector(false)
                                            setElectricity(false)
                                            setDefaultConsumption(false)
                                        }}
                                        name="bySource"
                                        color="primary"
                                    />
                                }
                                label="Consumption by final source"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={bySector}
                                        onChange={() => {
                                            setBySector(!(bySector))
                                            setByFinalSource(false)
                                            setBySource(false)
                                            setElectricity(false)
                                            setDefaultConsumption(false)
                                        }}
                                        name="bySector"
                                        color="primary"
                                    />
                                }
                                label="Consumption by sector"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={defaultConsumption}
                                        onChange={() => {
                                            setDefaultConsumption(!(defaultConsumption))
                                            setByFinalSource(false)
                                            setBySector(false)
                                            setBySource(false)
                                            setElectricity(false)
                                        }}
                                        name="defaultConsumption"
                                        color="primary"
                                    />
                                }
                                label="Default consumption"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={electricity}
                                        onChange={() => {
                                            setElectricity(!(electricity))
                                            setByFinalSource(false)
                                            setBySource(false)
                                            setBySector(false)
                                            setDefaultConsumption(false)
                                        }}
                                        name="electricity"
                                        color="primary"
                                    />
                                }
                                label="Electricity consumption"
                            />
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className={'min-chart-wrapper-height'}>
                {bySource &&
                <PlayableEnergyConsumptionBySource/>
                }
                {byFinalSource &&
                 <FinalEnergyConsumptionBySource mode={"doughnut"}/>
                }
                {bySector &&
                <EnergyConsumptionBySector/>
                }
                {defaultConsumption &&
                <EnergyConsumption/>
                }
                {electricity &&
                <ElectricityConsumption/>
                }
            </div>
        </>
    )
}
export default PlayableEnergyConsumption