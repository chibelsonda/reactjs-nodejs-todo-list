import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const isAuthenticated = user && user.authenticated;

  const logout = () => {
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <div id="nav-section" className="px-0 px-lg-3 py-1">
      <div className="container d-flex flex-wrap justify-content-between">
        <div className="col-3 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
          <a href="/">
            <img src={logo} height="45" width="138" alt="logo" />
          </a>
        </div>

        <div className="col-4 d-none d-md-flex">
          <form className="form-search d-flex me-5">
            <input type="search" placeholder="Enter your zipcode" />
            <button className="btn pink-btn" type="submit" value="search">
              Search
            </button>
          </form>
        </div>

        <div className="col-1"></div>

        <ul className="menu">
          <li className="dropdown">
            <a href="#">
              Menu
              <svg
                className="icon"
                width="14"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z" />
              </svg>
            </a>

            <ul className="dropdown-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <a href="#" onClick={logout}>
                    Signout
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
