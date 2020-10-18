import React from 'react';
import '../../../App.css';
import Loader from "../utils/Loader";
import EnergyConsumption from "../charts/EnergyConsumption";
import ElectricityConsumption from "../charts/ElectricityConsumption";
import Co2Emissions from "../charts/Co2Emissions";
import RenewableShare from "../charts/RenewableShare";
import EnergyConsumptionBySource from "../charts/EnergyConsumptionBySource";
import RenewableEnergyInvestment from "../charts/RenewableEnergyInvestment";
import RenewableEnergyInvestmentByGdp from "../charts/RenewableEnergyInvestmentByGdp";
import RenewableEnergyInvestmentByTechology from "../charts/RenewableEnergyInvestmentByTechnology";
import CapitaEnergyUseVsPoverty from "../charts/CapitaEnergyUseVsPoverty";
import EnergyConsumptionBySector from "../charts/EnergyConsumptionBySector";

function Narrative() {
    const [loading, setLoading] = React.useState(true)

    const delayedCloseLoader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1300);
    }

    React.useEffect(() => {
        delayedCloseLoader();
    }, [])

    return (
        <>
            {loading &&
                <Loader/>
            }
            <div className={loading ? 'hidden' : ''}>
                <div className="container pt-3 mb-5">
                    <div className="row">
                        <div className="col">
                            <h4>Welcome to the narrative section 📖</h4>
                            <p>Here you will be learning energy stuff from the start.</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumption/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Thanks to energy we can produce the amazing thing that
                                is <strong>electricity</strong> &#9889;.</p>
                            <p>The power of the vast majority of tools used in our world.</p>
                        </div>
                    </div>
                </div>

                <ElectricityConsumption/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>So yes, <strong>energy</strong> is cool</p>
                            <p>But there is a big issue currently highly coupled with energy consumption, <strong>co2
                                emissions</strong>. 🏭</p>
                        </div>
                    </div>
                </div>

                <Co2Emissions/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>PS : Note the weird trick, since we started looking after co2 emissions in the 90's, we took
                                co2 emissions to another planet. </p>
                            <p>How can we <i>partly</i> solve it ?</p>
                            <p>By using <strong>renewable energy</strong>.</p>
                        </div>
                    </div>
                </div>

                <RenewableShare/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>That is definetely not a lot, lets see what is in there...</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySource/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>What are we currently doing ?</p>
                            <p>Let's see the actual <strong>investment</strong>.</p>
                        </div>
                    </div>
                </div>

                <RenewableEnergyInvestment/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Of course, every continents do not have the same GDP per capita</p>
                            <p>So with a more accurate representation of <strong>proportions</strong>...</p>
                        </div>
                    </div>
                </div>

                <RenewableEnergyInvestmentByGdp/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Also, the world has changed his mind on which technology to invest deeper overtime.</p>
                        </div>
                    </div>
                </div>

                <RenewableEnergyInvestmentByTechology/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>That being said, we can question ourselves, the one who invested the most in renewables
                                compared to their GDP, are they also the one who consumes the most ?</p>
                        </div>
                    </div>
                </div>

                <CapitaEnergyUseVsPoverty/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Digging deeper, which <strong>sector</strong> consumes the most ?</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySector/>
            </div>
            }
        </>
    );
}

export default Narrative;
