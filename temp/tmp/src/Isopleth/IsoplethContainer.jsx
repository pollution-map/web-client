import { useEffect, useState, useCallback } from 'react';
import { Marker, FeatureGroup, Popup } from 'react-leaflet'
import Isopleth from "./Isopleth";
import  { isoplethCreatorFactory, colorFnFactory,  } from './map-algorithm'

const IsoplethContainer = ({ points, pointsData, width, height }) => {
    
    const [isoplethCreator, delaneyPoints, interpolate] = isoplethCreatorFactory(points, width, height);
    const coloringFunction = colorFnFactory();
    //const isopleth = isoplethCreator(pointsData, 1, 10, 0)
    
    const [isolines, setIsolines] = useState(isoplethCreator(pointsData, 2,  0.222323323323323, 0));



    //setData(isopleth);

    const callback = useCallback(
        () => {
            const isopleth = isoplethCreator(pointsData, 2, 0.222323323323323, 0)
            setIsolines(isopleth);
        },
        [pointsData, isoplethCreator],
    )
    useEffect(() => {
        callback()
    }, [pointsData])

    // rerender when pointsData changes


    console.log('delaney points ', delaneyPoints)


    debugger;
    const interpolatedField = interpolate(pointsData, 2, 0.222323323323323, 0);

    return ( 
        <>
            {points.map((p, i) => (
                <FeatureGroup key={p + i}  >
                    <Marker position={p} />
                    <Popup>Input point</Popup>
                </FeatureGroup>
            ))}
            {delaneyPoints.map((p, i) => (
                <FeatureGroup key={p + i}  >
                    <Marker position={p} />
                    <Popup>Delaney point {p[0]} {p[1]} value {pointsData[i]}</Popup>
                </FeatureGroup>
            ))}
            <Isopleth data={isolines} coloringFunction={coloringFunction}/>
        </>
    )
};

export default IsoplethContainer;