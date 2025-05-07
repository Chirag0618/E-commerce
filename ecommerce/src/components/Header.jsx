import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, logOut } from '../api/userAPI'

const Header = () => {

  const location = useLocation()

  const { user } = isAuthenticated()

  const navigate = useNavigate()



  const handleLogout = () =>{
    logOut()
    .then(data=>{
      console.log(data)
      navigate('/login')
    })
  }

  return (
    <div>
      <header className="bg-warning">
        <nav className="navbar navbar-expand-lg p-0">
          <div className="container">
            <a className="navbar-brand fs-1 " href="#">Ecom<span className="text-danger">Nepal</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
              aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav m-auto  my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to={"/"}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`} aria-current="page" to={"/products"}>Product</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} aria-current="page" to={"/cart"}>Cart</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contactpage.html">Contact</a>
                </li>
              </ul>


              <div className="d-flex">
                {
                  user ?
                    <>
                      {user.role == 1 ?

                        <Link to="/admin/dashboard" className="btn btn-primary rounded-pill me-2">Dashboard</Link>
                        :
                        <Link to="/cart" className="btn btn-primary rounded-pill me-2">Cart</Link>
                      }
                      <span className="btn btn-outline-secondary rounded-pill" onClick={handleLogout}>Log Out</span>

                    </>
                    :
                    <>
                      <Link to="/signup" className="btn btn-outline-secondary rounded-pill me-3">Register</Link>
                      <Link to="/login" className="btn btn-outline-light rounded-pill">Log In</Link>

                    </>
                }
              </div>
            </div>



          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header
