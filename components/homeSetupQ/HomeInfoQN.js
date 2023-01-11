import React, { Component, useState } from "react";
import CoolingType from "./CoolingType";
import FinishSetup from "./FinishSetup";
import HeatingType from "./HeatingType";
import HomeTypes from "./HomeTypes";
import Yards from "./Yards";
import ZipCode from "./ZipCode";
import WaitingForAPI from "./WaitingForAPI";

const HomeInfoQN = () => {
  const [page, setPage] = useState(0);
  const [homeType, setHomeType] = useState("");
  const [yardType, setYardType] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [coolingType, setCoolingType] = useState("");
  const [zipcode, setZipcode] = useState("");

  const componentList = [
    <FinishSetup page={page} setPage={setPage} key={0}/>,
    <HomeTypes
      page={page}
      setPage={setPage}
      homeType={homeType}
      setHomeType={setHomeType}
      key={1}
    />,
    <Yards
      page={page}
      setPage={setPage}
      yardType={yardType}
      setYardType={setYardType}
      key={2}
    />,
    <HeatingType
      page={page}
      setPage={setPage}
      heatingType={heatingType}
      setHeatingType={setHeatingType}
      key={3}
    />,
    <CoolingType
      page={page}
      setPage={setPage}
      coolingType={coolingType}
      setCoolingType={setCoolingType}
      key={4}
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
      key={5}
    />,
    <WaitingForAPI page={page} setPage={setPage}/>
  ];

  return <div>{componentList[page]}</div>;
};

export default HomeInfoQN;
