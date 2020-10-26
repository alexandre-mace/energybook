import energyUsePerCapitaVsPoverty
    from "../../Domain/data/datasets/energy-use-per-capita-vs-share-of-population-in-extreme-poverty.csv";
import getOwidBubbleCsv from "../Repository/Owid/getOwidBubbleCsv";

const getEnergyUsePerCapitaVsPoverty = (setter, year) => {
    getOwidBubbleCsv(
        energyUsePerCapitaVsPoverty,
        setter,
        year
    )
}
export default getEnergyUsePerCapitaVsPoverty;