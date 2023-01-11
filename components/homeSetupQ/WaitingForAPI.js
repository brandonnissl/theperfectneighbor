import React from "react";
import { useEffect } from "react";

const WaitingForAPI = ({ page, setPage }) => {
  return (
    <div className="container clearfix">
      <div class="row">
        <div class="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-12">
          <div class="widget-box" style={{ height: 400, margin: 'auto', textAlign:'center',  position: 'relative', paddingTop: 50 }}>
             <img src="/assets/images/logo.svg" style={{height:100}}></img>
             <hr style={{width:'50%'}}></hr>
              <h3>
                Just a few more seconds...
              </h3>
              <h4>
              We are current creating your custom checklists!
              </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForAPI;
