import React from "react";

const Yards = ({ page, setPage, yardType, setYardType }) => {
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
        <div style={{}}> <h3>Do you maintaine a Green Space?</h3></div>
        
        <div class="row" style={{margin:15}}>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}} onClick={() => {setPage(page + 1); setYardType("Yard w/ Sprinklers")}}>
                <img src="/assets/images/yardwsprinklers.png"/>
                <h4 style={{color:"white"}}>Yard with Sprinklers</h4>
            </div>
          </div>
          
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}} onClick={() => {setPage(page + 1); setYardType("Yard w/out Sprinklers")}}>
                <img src="/assets/images/yard.png"/>
                <h4 style={{color:"white"}}>Yard</h4>
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4"  >
            <div class="widget-card" style={{background:'#4c1864', padding:'15px 0px 0px 0px', height:170}} onClick={() => {setPage(page + 1); setYardType("No Yard")}}>
                <img src="/assets/images/no.png"/>
                <h4 style={{color:"white"}}>No Green Space</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Yards;
