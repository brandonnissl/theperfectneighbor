import React from "react";

const FacebookLogin = () => {
  return (
    <Link
      href="http://strapi.theperfectneighbor.com/api/connect/facebook"
      className="btn flex-fill m-l5 facebook"
    >
      <i className="fa fa-facebook"></i>Facebook
    </Link>
  );
};

export default FacebookLogin;
