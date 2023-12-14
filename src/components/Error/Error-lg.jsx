import { container, statusCode } from "./Error.module.css";

const Error = ({ err }) => {
  const bodyMessages = {
    404: "The page you're looking for doesn't seem to be here",
    400: "There was an issue with your request, please try again.",
    500: "There seems to be an issue with the server, please try again, later.",
  };
  return (
    <section className={container}>
      <h2>{err.msg}</h2>
      <p className={statusCode}>{err.status}</p>
      <p>{bodyMessages[err.status]}</p>
    </section>
  );
};

export default Error;
