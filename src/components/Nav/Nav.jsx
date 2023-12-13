import { Link } from "react-router-dom";
import { mainNav, mainLink } from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={mainNav}>
      <Link className={mainLink} to="/articles">
        Articles
      </Link>
      <Link className={mainLink} to="/account">
        Account
      </Link>
    </nav>
  );
};

export default Nav;
