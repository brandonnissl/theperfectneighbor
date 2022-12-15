import Head from "next/head";
import Nav from "./nav";

const Layout = ({ children, categories, userData, seo }) => {
  const nav_height = "height:83.2px";
  
  return (
    <>
      <header className="header rs-nav" >
        <Nav categories={categories} userData={userData} />
      </header>
      {children}
    </>
  );
};
export default Layout;
