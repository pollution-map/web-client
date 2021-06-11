import { geoContour } from 'd3-geo-voronoi';
import polygonSmooth from '@turf/polygon-smooth'
import * as d3 from 'd3';
import { getGeoPointsW } from '../testdata/testdata'
import { GeoJSON, Pane } from "react-leaflet";
import { useState, useEffect } from 'react';

const izhevskBorders = [
    [
      53.1463623046875,
      56.89944139723202
    ],
    [
      53.15563201904297,
      56.866615877660884
    ],
    [
      53.18653106689453,
      56.85760726762343
    ],
    [
      53.19477081298828,
      56.84352697048807
    ],
    [
      53.15460205078125,
      56.840710275276585
    ],
    [
      53.12988281249999,
      56.85760726762343
    ],
    [
      53.127479553222656,
      56.8729956637964
    ],
    [
      53.098297119140625,
      56.876935576197724
    ],
    [
      53.099327087402344,
      56.82436926311818
    ],
    [
      53.118896484375,
      56.81741747587835
    ],
    [
      53.169021606445305,
      56.80933675096636
    ],
    [
      53.24283599853515,
      56.80802111919723
    ],
    [
      53.31012725830078,
      56.81910856988167
    ],
    [
      53.34617614746094,
      56.8448413557222
    ],
    [
      53.32283020019531,
      56.90225367185202
    ],
    [
      53.1463623046875,
      56.89944139723202
    ]
];

const GeoIsopleth = () => {
    // .thresholds(15);
    const c = geoContour().thresholds(15);
    const [ gpw, setGpw ] =  useState(getGeoPointsW())

    // useEffect(() => {
    //     const i = setInterval(() => {
    //         setGpw(getGeoPointsW());
    //         console.log('set')
    //     }, 1 * 100)
    //     return () => { 
    //         clearInterval(i);
    //     }
    // }, [])
    

    const contours = c([...izhevskBorders, ...gpw]);

    const color = d3.scaleSequential(d3.interpolateCool).domain([0, 255])
    const smoothen = contours
        .map(c => polygonSmooth(c, {iterations: 5}))
        .map((f, i) => ({
            // save value data 
            features: f.features.map(ft => ({
                ...ft,
                properties: {
                    value: contours[i].value
                }
            }))
        }))
        // filter out corrupted polygons after smoothing
        .filter(f => f.features[0].geometry.coordinates.flat(2).every(c => typeof c !== 'undefined'));


    console.log('smoothen', smoothen);

    const onEachFeature = (feature, layer) => {
        const value = feature.properties.value;
        const i = value % 10;
        const l = i === 0 ? 1 : i % 2 === 0 ? 0.25 : 0;
        layer.options.weight = l;   

        layer.bindPopup(value.toString());
    }

    return (
        smoothen.map((f, i) => 
            <Pane key={f.features[0].properties + i} >
                <GeoJSON
                    key={f.features[0].properties  + i}
                    data={ f.features[0]}
                    onEachFeature={onEachFeature}
                    style={{ color: color(f.features[0].properties.value), opacity: 1 }}
                />
            </Pane>
        )
        // <GeoJSON
        //   data={smoothen}
        //   onEachFeature={onEachFeature}
        // />
    )
}

export default GeoIsopleth;