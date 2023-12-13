import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav>
      <Link to="/articles">Articles</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
};

export default Nav;
