import logo from "../assets/images/footer_logo.png";
import fbIcon from "../assets/images/facebook.png";
import twitterIcon from "../assets/images/twitter.png";
import instagramIcon from "../assets/images/instagram.png";

const Footer = () => {
  return (
    <div className="footer mt-5 mt-auto">
      <div className="container">
        <div className="row py-4 px-3">
          <div className="col-sm-12 col-md-3 my-3  text-center">
            <a href="/">
              <img
                className="logo"
                src={logo}
                alt="logo"
                height="131"
                width="153"
              />
            </a>
          </div>
          <div className="col-sm-12 col-md-2 my-3 d-none d-md-inline">
            <h4>FOR PARENTS</h4>
            <ul>
              <li>
                <a href="#">Parent Resources </a>
              </li>
              <li>
                <a href="#">How It Works </a>
              </li>
              <li>
                <a href="#">Testimonials </a>
              </li>
              <li>
                <a href="#">Terms of Use </a>
              </li>
              <li>
                <a href="#">Privacy Policy </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-2 my-3 d-none d-md-inline">
            <h4>FOR PROVIDERS</h4>
            <ul>
              <li>
                <a href="#">Provider Resources</a>
              </li>
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">List Your Program</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-2 my-3 d-none d-md-inline">
            <h4>MORE</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Contact US</a>
              </li>
            </ul>
          </div>

          <div className="col-sm-12 col-md-2 d-inline d-md-none text-center">
            <ul>
              <li>
                <a href="#">About Us</a>
                <a href="#">How It Works</a>
                <a href="#">Contact US</a>
              </li>
              <li>
                <a href="#">Parent Resources</a>
                <a href="#">Provider Resources</a>
              </li>
              <li>
                <a href="#">Parent Testimonials</a>
                <a href="#">Provider Testimonials</a>
              </li>
            </ul>
          </div>

          <div className="footer-icons col-sm-12 col-md-3 my-3 text-center text-lg-start">
            <a href="#">
              <img alt="facebook icon" src={fbIcon} height="53" width="53" />
            </a>
            <a href="#">
              <img
                alt="twitter icon"
                src={twitterIcon}
                height="53"
                width="53"
              />
            </a>
            <a href="#">
              <img
                alt="instagram icon"
                src={instagramIcon}
                height="49"
                width="49"
              />
            </a>{" "}
            <br />
            <a href="#" className="btn white-btn ms-3 mt-3 me-3">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
