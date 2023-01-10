import React from "react";

const HomeTypes = ({ page, setPage, homeType, setHomeType }) => {
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
        <div style={{}}>
          {" "}
          <h3>What type of Home do you have?</h3>
        </div>

        <div class="row" style={{ margin: 15 }}>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4">
            <div
              class="widget-card"
              style={{
                background: "#4c1864",
                padding: "15px 0px 0px 0px",
                height: 170,
              }}
              onClick={() => {setPage(page + 1); setHomeType("Single-Family")}}
            >
              <img src="/assets/images/house.png" />
              <h4 style={{ color: "white" }}>Single-Family Home</h4>
            </div>
          </div>

          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4">
            <div
              class="widget-card"
              style={{
                background: "#4c1864",
                padding: "15px 0px 0px 0px",
                height: 170,
              }}
              onClick={() => {setPage(page + 1); setHomeType("Townhome")}}
            >
              <img src="/assets/images/townhouse.png" />
              <h4 style={{ color: "white" }}>Townhome</h4>
            </div>
          </div>
          <div class="col-md-4 col-lg-4 col-xl-4 col-sm-4 col-4">
            <div
              class="widget-card"
              style={{
                background: "#4c1864",
                padding: "15px 0px 0px 0px",
                height: 170,
              }}
              onClick={() => {setPage(page + 1); setHomeType("Condo")}}
            >
              <img src="/assets/images/condo.png" />
              <h4 style={{ color: "white" }}>Condo</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeTypes;
