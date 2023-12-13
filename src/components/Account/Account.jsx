import { account, avatar, logOut, terms } from "./Account.module.css";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";

const Account = () => {
  const { user, setUser } = useContext(UserContext);

  if (user) {
    const { username, name, avatar_url } = user;
    return (
      <section className={account}>
        <h2>Welcome back</h2>

        <img className={avatar} src={avatar_url} />

        <h3>{user.username}</h3>
        <h4>{user.name}</h4>

        <button className={logOut} disabled>
          Log out
        </button>

        <p className={terms}>
          Terms and conditions apply. Please see our <a href="#">Terms of Service</a>
        </p>

        <p className={terms}>
          This page doesn't currently serve any purpose, but I plan to make it do something... soon.
        </p>
      </section>
    );
  }
};

export default Account;
