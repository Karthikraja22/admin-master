import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <>
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <Link class='text-decoration-none' to={'/dashboard'}> <div class="nav-link " href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </div></Link>
                            <Link class='text-decoration-none' to={'/product/list'}><div class="nav-link " href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Products
                            </div></Link>
                            <Link class='text-decoration-none' to={'/order/details'}><div class="nav-link " href="index.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Orders
                            </div></Link>
                            <div class="sb-sidenav-footer">
                                <div class="small">Logged in as:</div>
                                Owner
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Sidebar
