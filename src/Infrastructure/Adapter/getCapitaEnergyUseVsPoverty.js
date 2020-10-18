import energyUsePerCapitaVsPoverty
    from "../../Dataset/energy-use-per-capita-vs-share-of-population-in-extreme-poverty.csv";
import getOwidBubbleCsv from "../Repository/Owid/getOwidBubbleCsv";

const getEnergyUsePerCapitaVsPoverty = (setter, indexesSetter, index, year) => {
    getOwidBubbleCsv(
        energyUsePerCapitaVsPoverty,
        setter,
        indexesSetter,
        index,
        year
    )
}
export default getEnergyUsePerCapitaVsPoverty;