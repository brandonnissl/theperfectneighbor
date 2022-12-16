import React from "react";
import Link from "next/link";

const Nav = ({ categories, loggedin, userData }) => {
  if (userData) {
    if (userData.id) {
      loggedin = true;
    }
  }
  var account_or_loggin = (
    <span>
      <li>
        <Link href={"/login"}>
          <a className="btn-link">Login | </a>
        </Link>
      </li>{" "}
      <li></li>
      <li>
        <Link href={"/register"}>
          <a className="btn-link">Register</a>
        </Link>
      </li>
    </span>
  );
  if (loggedin) {
    account_or_loggin = (
      <li>
        <Link href={"/user"}>
          <a className="btn-link">Account</a>
        </Link>
      </li>
    );
  }

  return (
    <div className="sticky-header navbar-expand-lg">
      <div className="menu-bar clearfix">
        <div className="container clearfix">
          <div className="menu-logo">
            <Link href={"/"}>
              <a>
                <img src="/assets/images/logo.svg" alt=""></img>
              </a>
            </Link>
          </div>

          <button
            className="navbar-toggler collapsed menuicon justify-content-end"
            type="button"
            data-toggle="collapse"
            data-target="#menuDropdown"
            aria-controls="menuDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="secondary-menu">
            <div className="secondary-inner">
              <ul>
                {account_or_loggin}
                <li className="search-btn">
                  <button
                    id="quik-search-btn"
                    type="button"
                    className="btn-link"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-search-bar">
            <form action="/search">
              <input
                name="search"
                defaultValue={""}
                type="text"
                className="form-control"
                placeholder="Type to search"
              />
              <span>
                <i className="ti-search"></i>
              </span>
            </form>
            <span id="search-remove">
              <i className="ti-close"></i>
            </span>
          </div>
          <div
            className="menu-links navbar-collapse collapse justify-content-start"
            id="menuDropdown"
          >
            <ul className="nav navbar-nav">
              <li className="active">
                <Link href={"javascript:;"}>
                  <a>
                    Home <i className="fa fa-chevron-down"></i>
                  </a>
                </Link>

                <ul className="sub-menu">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/categories/${category.attributes.slug}`}>
                        <a> {category.attributes.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
