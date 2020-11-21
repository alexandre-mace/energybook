import React from 'react';
import '../../../App.css';
import Loader from "../utils/Loader";
import EnergyConsumption from "../charts/EnergyConsumption";
import ElectricityConsumption from "../charts/ElectricityConsumption";
import Co2Emissions from "../charts/Co2Emissions";
import EnergyConsumptionBySource from "../charts/EnergyConsumptionBySource";
import RenewableEnergyInvestment from "../charts/RenewableEnergyInvestment";
import RenewableEnergyInvestmentByGdp from "../charts/RenewableEnergyInvestmentByGdp";
import RenewableEnergyInvestmentByTechology from "../charts/RenewableEnergyInvestmentByTechnology";
import CapitaEnergyUseVsPoverty from "../charts/CapitaEnergyUseVsPoverty";
import EnergyConsumptionBySector from "../charts/EnergyConsumptionBySector";
import {CircleIndicator} from "../utils/ScrollIndicator";
import ScrollBackToTop from "../utils/BackToTop";
import FinalEnergyConsumptionBySource from "../charts/FinalEnergyConsumptionBySource";

function Narrative() {
    const [loading, setLoading] = React.useState(true)

    const delayedCloseLoader = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
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
                <CircleIndicator/>
                <ScrollBackToTop/>
                <div className="container pt-1 mb-3 mb-md-3">
                    <div className="row">
                        <div className="col">
                            <h4>Welcome to the narrative section <span role={"img"} aria-label={"book"}>📖</span></h4>
                            <p>Here you will be learning energy stuff from the start.</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumption animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>As you can see, the energy consumption is overall growing.</p>
                            <p>Thanks to energy we can produce the amazing thing that
                                is <strong>electricity</strong> <span role={"img"} aria-label={"thunder"}>&#9889;</span>.
                            </p>
                            <p>The power of the many used tools in our world (but dont forget about
                                thermic).</p>
                        </div>
                    </div>
                </div>

                <ElectricityConsumption animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>So yes, <strong>energy</strong> is cool.</p>
                            <p>But there is a big issue currently highly coupled with energy consumption, <strong>CO₂
                                emissions</strong>. 🏭</p>
                            <p>Carbon dioxide (CO₂) is the primary greenhouse gas emitted through human activities. CO₂ emissions are carbon dioxide that planes, cars, factories, etc. produce, thought to be harmful to planet Earth.</p>
                            <p>Carbon dioxide (CO₂) is released into Earth’s atmosphere mostly by the burning of carbon-containing fuels and the decay of wood and other plant matter. Under all conditions found naturally on Earth, CO₂ is an invisible, odorless gas. It is removed from the atmosphere mostly by plants, which extract carbon from CO2 to build their tissues, and by the oceans, in which CO2 dissolves.</p>
                        </div>
                    </div>
                </div>

                <Co2Emissions animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>It’s widely recognised that to avoid the worst impacts of climate change, the world urgently needs to reduce its emissions.</p>
                            <p>Note the weird trick, since we started looking after CO₂ emissions in the 90's, we
                                took
                                CO₂ emissions to another planet. </p>
                            <p>How can we <i>partly</i> solve it?</p>
                            <p>By using <strong>renewable energy</strong> (and decarbonized energy).</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySource onlyCategories={true} animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Renewable energy is energy that is collected from renewable resources, which are naturally replenished on a human timescale, such as sunlight, wind, rain, tides, waves, and geothermal heat.</p>
                            <p>That is definetely not a lot of <strong>renewables</strong>, lets see what is in there...
                            </p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySource onlyRenewables={true} animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>And, let's take a deeper look at which are the <strong>non renewables</strong>, the biggest
                                part of energy consumption source.</p>
                            <p>A non-renewable resource (also called a finite resource) is a natural resource that cannot be readily replaced by natural means at a quick enough pace to keep up with consumption.</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySource onlyNonRenewables={true} animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Let's put them <strong>together</strong> to get the global point of view.</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySource animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Being year precise, here is <strong>another representation</strong> of it.</p>
                        </div>
                    </div>
                </div>

                <EnergyConsumptionBySource mode={"doughnut"} animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>What are we currently doing?</p>
                            <p>Let's see the actual <strong>investment</strong>.</p>
                        </div>
                    </div>
                </div>

                <RenewableEnergyInvestment animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Of course, every continents do not have the same GDP per capita.</p>
                            <p>So with a more accurate representation of <strong>proportions</strong>...</p>
                        </div>
                    </div>
                </div>

                <RenewableEnergyInvestmentByGdp animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>The graphic speaks for itself.</p>
                            <p>Also, the world has changed his mind on which technology to invest deeper overtime.</p>
                        </div>
                    </div>
                </div>

                <RenewableEnergyInvestmentByTechology animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>That being said, we can ask ourselves this question: the ones who invested the most in renewables
                                compared to their GDP, are they also the ones who consume the most?</p>
                        </div>
                    </div>
                </div>

                <CapitaEnergyUseVsPoverty animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Digging deeper, which <strong>sector</strong> consumes the most?</p>
                        </div>
                    </div>
                </div>
                <EnergyConsumptionBySector animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>Earlier on, I said <strong>"do not forget about thermic"</strong> and here is why.</p>
                        </div>
                    </div>
                </div>

                <FinalEnergyConsumptionBySource mode={"lines"} animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col">
                            <p>As you can see, what drives the renewables part is only about electricity production, but we are surrounded by objects and products that comes from thermic.</p>
                            <p>The main point of our discussions only represents about <strong>20% of the problem</strong>.</p>
                            <p>Below is the doughnut representation.</p>
                        </div>
                    </div>
                </div>

                <FinalEnergyConsumptionBySource mode={"doughnut"} animation={false}/>

                <div className="container my-3 my-md-5">
                    <div className="row">
                        <div className="col text-center">
                            <p>Hope you liked it, and remember: the best energy is the one that you don't use.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Narrative;
