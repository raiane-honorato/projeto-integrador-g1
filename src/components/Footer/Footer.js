import "./Footer.css";
import fullLogo from "../../img/logo-color.png";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column" id="footer-column-c1">
          <img
            className="footer-logo"
            src={fullLogo}
            alt="logo-corrente-do-bem"
          ></img>
          <p className="footer-description">
            Transforme o mundo por meio da solidariedade. Seja mais um elo dessa
            corrente.
          </p>
        </div>
        <div className="footer-column" id="footer-column-c2">
          <ul className="social-media-list">
            <li className="social-media-icon">
              <FontAwesomeIcon icon={faYoutube} size="2x" alt="YouTube" />
            </li>
            <li className="social-media-icon">
              <FontAwesomeIcon icon={faInstagram} size="2x" alt="Instagram" />
            </li>
            <li className="social-media-icon">
              <FontAwesomeIcon icon={faTwitter} size="2x" alt="Twitter" />
            </li>
            <li className="social-media-icon">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                size="2x"
                alt="Facebook"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
