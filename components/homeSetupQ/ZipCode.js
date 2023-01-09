import React from "react";
import Zip from 'react-zipcode'
import axios from "axios";
import { useEffect,useState } from "react";
const ZipCode = ({ page, setPage, zipcode, setZipcode, coolingType, heatingType, yardType,homeType }) => {
   useEffect(()=> {
    getUserData();
    
  }, [])

  const [userData, setUserData] = useState();

  const getUserData = () => {
    return axios
      .get('/api/auth/user', {
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.error(err))

  }

  async function callAPI (){
    setPage(page + 1);
    const createHouse = await axios.post('/api/auth/createHouse', {
      userid: userData.id,
      user: userData.user,
      zipcode: zipcode,
      homeType: homeType,
      yardType: yardType,
      heatingType: heatingType,
      coolingType: coolingType,
    })

    location.reload();


  }
  

  return (
    <div className="container clearfix">
      <div class="row">
        <div class="col-md-12 col-lg-12 col-xl-12 col-sm-12 col-12">
          <div
            class="widget-box"
            style={{
              height: 400,
              margin: "auto",
              textAlign: "center",
              position: "relative",
              paddingTop: 100,
            }}
          >
            <img src="/assets/images/zipcode.png" style={{width:100}}></img>
            <h3>We are almost there! What is your Zipcode?</h3>
            <div class="input-group" style={{width:300, margin:"auto", textAlign:"center"}}>
              <Zip class="form-control" placeholder="30329"  onValue={(value)=> {setZipcode(value)}} />

              <div class="input-group-append">
                <button class="btn" onClick={async () => { await callAPI(); }}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZipCode;
