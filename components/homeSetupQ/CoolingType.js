import React from "react";

const CoolingType = ({ page, setPage, coolingType, setCoolingType }) => {
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
        <div style={{}}> <h3>What type of Cooling do you have?</h3></div>
        
        <div class="row" style={{margin:15}}>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}}  onClick={() => {setPage(page + 1); setCoolingType("Central Air")}}>
                <img src="/assets/images/centralair.png"/>
                <h4 style={{color:"white"}}>Central Air</h4>
            </div>
          </div>
          
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}}  onClick={() => {setPage(page + 1); setCoolingType("Swamp Cooler")}}>
                <img src="/assets/images/swampcooler.png"/>
                <h4 style={{color:"white"}}>Swamp Cooler</h4>
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}}  onClick={() => {setPage(page + 1); setCoolingType("No Cooling")}}>
                <img src="/assets/images/no.png"/>
                <h4 style={{color:"white"}}>No Cooling</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoolingType;
