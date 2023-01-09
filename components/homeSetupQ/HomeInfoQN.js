import React, { Component, useState } from "react";
import CoolingType from "./CoolingType";
import FinishSetup from "./FinishSetup";
import HeatingType from "./HeatingType";
import HomeTypes from "./HomeTypes";
import Yards from "./Yards";
import ZipCode from "./ZipCode";

const HomeInfoQN = () => {
  const [page, setPage] = useState(0);
  const [homeType, setHomeType] = useState("");
  const [yardType, setYardType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [coolingType, setCoolingType] = useState("");
  const [zipcode, setZipcode] = useState("");

  const componentList = [
    <FinishSetup page={page} setPage={setPage} />,
    <HomeTypes
      page={page}
      setPage={setPage}
      homeType={homeType}
      setHomeType={setHomeType}
    />,
    <Yards
      page={page}
      setPage={setPage}
      yardType={yardType}
      setYardType={setYardType}
    />,
    <HeatingType
      page={page}
      setPage={setPage}
      heatingType={heatingType}
      setHeatingType={setHeatingType}
    />,
    <CoolingType
      page={page}
      setPage={setPage}
      coolingType={coolingType}
      setCoolingType={setCoolingType}
    />,
    <ZipCode
      page={page}
      setPage={setPage}
      zipcode={zipcode}
      setZipcode={setZipcode}
      coolingType={coolingType}
      setCoolingType={setCoolingType}
      heatingType={heatingType}
      setHeatingType={setHeatingType}
      yardType={yardType}
      setYardType={setYardType}
      homeType={homeType}
      setHomeType={setHomeType}
    />,
  ];

  return <div>{componentList[page]}</div>;
};

export default HomeInfoQN;
