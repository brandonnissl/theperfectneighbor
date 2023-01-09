import React from "react";

const HeatingType = ({ page, setPage, heatingType, setHeatingType }) => {
  return (
    <div className="container clearfix">
      <div
            class="widget-box"
            style={{
              height: 400,
              margin: "auto",
              textAlign: "center",
              position: "relative",
              paddingTop: 80,
            }}
          >
        <div style={{}}> <h3>What type of Heating do you have?</h3></div>
        
        <div class="row" style={{margin:15}}>
          <div class="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-3"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}} onClick={() => {setPage(page + 1); setHeatingType("Furnace")}}>
                <img src="/assets/images/furnace.png"/>
                <h4 style={{color:"white"}}>Furnace</h4>
            </div>
          </div>
          
          <div class="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-3"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}}  onClick={() => {setPage(page + 1); setHeatingType("Broiler")}}>
                <img src="/assets/images/broiler.png"/>
                <h4 style={{color:"white"}}>Broiler</h4>
            </div>
          </div>
          <div class="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-3"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}} onClick={() => {setPage(page + 1); setHeatingType("Wood/Pellet")}}>
                <img src="/assets/images/pellet.png"/>
                <h4 style={{color:"white"}}>Wood Burning / Pellet Stove</h4>
            </div>
          </div>
          <div class="col-md-3 col-lg-3 col-xl-3 col-sm-3 col-3"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}}  onClick={() => {setPage(page + 1); setHeatingType("No Heating")}}>
                <img src="/assets/images/no.png"/>
                <h4 style={{color:"white"}}>No Heating</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeatingType;
