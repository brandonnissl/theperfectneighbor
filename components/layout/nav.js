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
        <a href="/login" className="btn-link">
          Login |{" "}
        </a>
      </li>{" "}
      <li></li>
      <li>
        <a href="/register" className="btn-link">
          Register
        </a>
      </li>
    </span>
  );
  if (loggedin) {
    account_or_loggin = (
      <li>
        <a href="/user" className="btn-link">
          Account
        </a>
      </li>
    );
  }

  return (
    <div className="sticky-header navbar-expand-lg">
      <div className="menu-bar clearfix">
        <div className="container clearfix">
          <div className="menu-logo">
            <a href="/">
              <img src="/assets/images/logo.svg" alt=""></img>
            </a>
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
                <a href="javascript:;">
                  Home <i className="fa fa-chevron-down"></i>
                </a>

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
