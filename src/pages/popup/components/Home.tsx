import { Link } from "react-router-dom";
import logo from "../../../assests/icons/logo.svg";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-row items-center gap-3">
        <img src={logo} width="48" />
        <h1 className="text-white font-semibold text-3xl">
          Bank Transactions Downloader
        </h1>
      </div>
      <Link className="btn-primary" to="/select-a-bank">
        Start
      </Link>
    </div>
  );
};

export default Home;
