import { elementData } from "../data/data";
import { getLinearNormalizedAtomicWeight } from "../data/data";

const colorDict = {

    "light": {
        "alkaliMetals": "orange",
        "alkalineEarthMetals": "yellow",
        "reactiveNonMetals": "green",
        "transitionMetals": "pink",
        "postTransitionMetals": "lightblue",
        "metalloids": "teal",
        "nobleGases": "plum",
        "lanthanoids": "beige",
        "actinoids": "violet",
        "noSeries": "grey"
    },

    "dark": {

        "alkaliMetals": "brown",
        "alkalineEarthMetals": "darkgoldenrod",
        "reactiveNonMetals": "darkgreen",
        "transitionMetals": "maroon",
        "postTransitionMetals": "darkslateblue",
        "metalloids": "darkseagreen",
        "nobleGases": "darkorchid",
        "lanthanoids": "olive",
        "actinoids": "mediumpurple",
        "noSeries": "grey"


    }

}


function getSeriesKey(series){
    let seriesKey;
    switch(series){
        case "No series":
            seriesKey = "noSeries"
            break
        case "Actinoids":
            seriesKey = "actinoids"
            break
        case "Lanthanoids":
            seriesKey = "lanthanoids"
            break
        case "Reactive nonmetals":
            seriesKey = "reactiveNonMetals"
            break
        case "Post-transition metals":
            seriesKey = "postTransitionMetals"
            break
        case "Metalloids":
            seriesKey = "metalloids";
            break;
        case "Alkali metals":
            seriesKey = "alkaliMetals"
            break;
        case "Alkaline earth metals":
            seriesKey = "alkalineEarthMetals"
            break;
        case "Transition metals":
            seriesKey = "transitionMetals"
            break;
        case "Noble gases":
            seriesKey = "nobleGases";
            break;
        default:
            seriesKey = "reactiveNonmetals"
            break;
    }
    return seriesKey;
}


function getBackgroundColorWithSeriesKey(theme,seriesKey){
    return colorDict[theme][seriesKey]
}

function getSeriesColor(theme,series){
    let seriesKey = getSeriesKey(series)
    return getBackgroundColorWithSeriesKey(theme,seriesKey)
}

function getAtomicWeightBGColor(elementInfo){
    let normalizedAW = getLinearNormalizedAtomicWeight(elementInfo.atomicWeight)
    console.log("normalizedAW: " + normalizedAW)
    let greenVal = 255*(1-normalizedAW);
    let blueVal = 255*(1-normalizedAW);

    return `rgb(255,${greenVal},${blueVal})`;
}

function getElementColor(mode,theme,elementInfo){
    switch(mode){
        case "regular":
            return getSeriesColor(theme,elementInfo.series)
        case "slg":
            return getSeriesColor(theme,elementInfo.series)
            break;
        case 'atomic-weight':
            return getAtomicWeightBGColor(elementInfo)
        default:
            return getSeriesColor(theme,elementInfo.series)

    }

}


function searchElements(searchString){
    let resultsArray =elementData.filter((elementInfo) => {
        return  elementInfo.name.includes(searchString) || 
                elementInfo.symbol.toUpperCase() === searchString.toUpperCase() ||
                elementInfo.atomicNumber === parseInt(searchString);
            })

    return resultsArray;
}

function determineState(mp,bp,currentTemp){

}

function convertTemp(fromUnit,fromVal,toUnit){
    switch(fromUnit){
        case 'C':
            if(toUnit === 'K'){
                return fromVal + 273.15;
            } else {
                return (fromVal * 9/5) + 32
            }
          
        case 'K':
            if(toUnit === 'C'){
                return fromVal - 273.15;
            } else {
                return ((fromVal - 273.15) * 9/5) + 32
            }
            break;
        case 'F':
            if(toUnit === 'C'){
                return (fromVal - 32) * 5/9
            } else {
                return ((fromVal - 32) * 5/9) + 273.15
            };
        default:
            break;
    }
}

function getAtomicNumberFromTableDataString(dataString){
    let startIndex = dataString.indexOf("atnum-") + 6;
    let numStr = dataString.slice(startIndex)
   
    let result =  parseInt(numStr);

    return result
}

export { getAtomicNumberFromTableDataString, determineState, convertTemp, getElementColor, searchElements,getSeriesColor, getAtomicWeightBGColor}