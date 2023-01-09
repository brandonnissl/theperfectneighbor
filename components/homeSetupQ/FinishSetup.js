import React from "react";
import { useEffect } from "react";

const FinishSetup = ({ page, setPage }) => {
  return (
    <div className="container clearfix">
      <div class="row">
        <div class="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-12">
          <div class="widget-box" style={{ height: 400, margin: 'auto', textAlign:'center',  position: 'relative', paddingTop: 50 }}>
             <img src="/assets/images/logo.svg" style={{height:100}}></img>
             <hr style={{width:'50%'}}></hr>
              <h3>
                Thanks for creating an account!
              </h3>
              <h4>
                Let&apos;s grab a few basic items to create your custom checklist.
              </h4>
              <button class="btn "style={{width: 400}} onClick={() => setPage(page + 1)}><b>Ok! Lets Do It!</b></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishSetup;
