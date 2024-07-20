import React, { useEffect } from "react";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import map_marker_cctv from "../assets/sodam/map_marker_cctv.png";
import map_marker_start from "../assets/sodam/map_marker_start.png";
import map_marker_end from "../assets/sodam/map_marker_end.png";
import map_marker_light from "../assets/map_marker_light.png";
import map_marker from "../assets/map_marker (1).png";

const NavigationMap = ({
  latitudeList = [],
  longitudeList = [],
  safetyLatitudeList = [],
  safetyLongitudeList = [],
  safetyTypeList = [],
  lat,
  lng,
}) => {
  const CCTVmarkers = safetyLatitudeList.map((latitude, index) => {
    if (safetyTypeList[index] === 302) {
      return (
        <MapMarker
          key={index}
          position={{ lat: latitude, lng: safetyLongitudeList[index] }}
          image={{
            src: map_marker_cctv,
            size: {
              width: 24,
              height: 24,
            },
          }}
        />
      );
    }
    return null;
  });

  const LightMarkers = safetyLatitudeList.map((latitude, index) => {
    if (safetyTypeList[index] === 305) {
      return (
        <MapMarker
          key={index}
          position={{ lat: latitude, lng: safetyLongitudeList[index] }}
          image={{
            src: map_marker_light,
            size: {
              width: 24,
              height: 24,
            },
          }}
        />
      );
    }
    return null;
  });

  const ParentLocationMarker = ({ lat, lng }) => {
    if (lat !== undefined && lng !== undefined) {
      return (
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: map_marker,
            size: {
              width: 56,
              height: 56,
            },
          }}
        />
      );
    }
    return null;
  };

  const polylineCoordinates = latitudeList.map((latitude, index) => ({
    lat: latitude,
    lng: longitudeList[index],
  }));

  const AdjustBounds = () => {
    const map = useMap();

    useEffect(() => {
      if (map && latitudeList.length > 0 && longitudeList.length > 0) {
        const bounds = new window.kakao.maps.LatLngBounds();
        latitudeList.forEach((lat, index) => {
          bounds.extend(
            new window.kakao.maps.LatLng(lat, longitudeList[index])
          );
        });
        map.setBounds(bounds);
      }
    }, [map, latitudeList, longitudeList]);

    return null;
  };

  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_SDK_APPKEY}&libraries=services`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Map
      center={
        latitudeList.length > 0 && longitudeList.length > 0
          ? { lat: latitudeList[0], lng: longitudeList[0] }
          : { lat: lat, lng: lng }
      }
      style={{ width: "100%", height: "100%" }}
      level={4}
    >
      {CCTVmarkers}
      {LightMarkers}
      <ParentLocationMarker lat={lat} lng={lng} />
      {latitudeList.length > 0 && longitudeList.length > 0 && (
        <>
          <Polyline
            path={polylineCoordinates}
            strokeWeight={3}
            strokeColor={"#27c384"}
          />
          <MapMarker
            position={{ lat: latitudeList[0], lng: longitudeList[0] }}
            image={{ src: map_marker_start, size: { width: 36, height: 36 } }}
          />
          <MapMarker
            position={{
              lat: latitudeList[latitudeList.length - 1],
              lng: longitudeList[longitudeList.length - 1],
            }}
            image={{ src: map_marker_end, size: { width: 36, height: 36 } }}
          />
        </>
      )}
      <AdjustBounds />
    </Map>
  );
};

export default NavigationMap;
