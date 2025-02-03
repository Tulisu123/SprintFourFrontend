import React, { useEffect, useState, /*useLayoutEffect */ } from 'react';
import { APIProvider, Map, /*useMapsLibrary, useMap*/ } from '@vis.gl/react-google-maps';
import {
    setKey,
    fromAddress,
} from "react-geocode";

const API_KEY = 'AIzaSyDkzO6s6YGwc3GuJIuADmZoM2xyyZrvAiE';

export const DetailsMap = ({ address, coordinates }) => {
    return (
        <APIProvider apiKey={API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
            {coordinates &&
                <Map
                    style={{ width: '100%', height: '480px' }}
                    defaultZoom={13}
                    defaultCenter={coordinates}
                    onCameraChanged={(ev) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    }>
                </Map>}
        </APIProvider >
    );
};
