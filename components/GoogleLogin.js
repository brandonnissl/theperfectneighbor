import React from 'react';
import Link from 'next/link';

const GoogleLogin = () => {
  return (
    <Link href="http://www.theperfectneighbor.com/api/connect/google" className="btn flex-fill m-l5 google-plus">
                      
                        <i className="fa fa-google-plus"></i>Google Plus
                      
                      </Link>
  )
  };
  export default GoogleLogin;