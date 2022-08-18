import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { isCustomPageUri } from '../../../utils/slug';
import NavSearch from '../../search/nav-search';

const Nav = ({ header, headerMenus, slug }) => {

    if (isEmpty(headerMenus)) {
        return null;
    }

    return (

        <div className="container-fluid m-pad">
            <div className="menu-header">
                <div className="dsk-logo">
                    <Link href="/">
                    <a className="nav-brand">
                        <img src="/assets/img/logo-dark.svg" alt="Logo" className="mega-white-logo"></img>
                        <img src="/assets/img/logo.svg" alt="Logo" className="mega-darks-logo" />
                    </a>
                    </Link>
                    
                </div>
                <div className="custom-nav" role="navigation">
                    {headerMenus.length ? (
                        <ul className="nav-list">
                            {headerMenus?.map(menu => (
                                <li className="sbmenu rpdropdown" key={menu?.node?.label}>
                                    <a href="#" className="menu-links">{menu?.node?.label}</a>
                                    <div className="nx-dropdown menu-dorpdown">
                                        <div className="sub-menu-section">
                                            <div className="sub-menu-center-block">
                                                <div className="sub-menu-column smfull">
                                                    {menu?.node?.childItems?.edges.length ? (
                                                        <ul>
                                                            {menu?.node?.childItems?.edges?.map(submenu => (
                                                                <li key={submenu?.node?.id}>
                                                                    <Link key={submenu?.node?.id} href={submenu?.node?.path}>
                                                                        <a>{submenu?.node?.label}</a>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    <ul className="nav-list right-end-btn">
                        <li className="hidemobile"><a href="get-quote.html" className="btn-br bg-btn3 btshad-b2 lnk">Sign In / Sign Up<span className="circle"></span></a> </li>
                        <li className="hidedesktop"><a data-bs-toggle="offcanvas" href="#offcanvasExample" className="btn-round- btn-br bg-btn2"><i className="fas fa-sign-in-alt"></i></a></li>
                        <li className="navm- hidedesktop"> <a className="toggle" href="#"><span></span></a></li>
                    </ul>
                </div>
            </div>

            <nav id="main-nav">
                {headerMenus.length ? (
                    <ul className="first-nav">
                        {headerMenus?.map(menu => (
                            <li key={menu?.node?.label}>
                                <a href="#">{menu?.node?.label}</a>
                                {menu?.node?.childItems?.edges.length ? (
                                    <ul>
                                        {menu?.node?.childItems?.edges?.map(submenu => (
                                            <Link key={submenu?.node?.id} href={submenu?.node?.path}>
                                                <a>{submenu?.node?.label}</a>
                                            </Link>
                                        ))}
                                    </ul>
                                ) : null}
                            </li>
                        ))}

                    </ul>
                ) : null}


            </nav>
        </div>

    );
};

Nav.propTypes = {
    header: PropTypes.object,
    headerMenus: PropTypes.array,
    slug: PropTypes.string
};

Nav.defaultProps = {
    header: {},
    headerMenus: [],
    slug: ''
};


export default Nav;
