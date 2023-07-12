import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Topbar() {
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('myapptoken')
        navigate('/')
        window.location.reload()
    }
    return (
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">

            <Link class='text-decoration-none' to={'/dashboard'}><a class="navbar-brand ps-3" href="index.html">Dashboard</a>
            </Link>
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>

            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
               
            </form>

            <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <Link to={'/profile/settings'}><li><a class="dropdown-item" href="#!">Settings</a></li></Link>
                        <li><hr class="dropdown-divider" /></li>
                        <li onClick={handleLogout}><a class="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Topbar
