import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-third text-xs gap-1">
      <span>{`Note: We currently only support banks in Canada. And specifically only Royal Bank of Canada (RBC).`}</span>
      <ul className="flex gap-1.5 items-center whitespace-nowrap flex-wrap">
        <li>
          <Link to="/about" className="underline">
            About
          </Link>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <Link
            to="/how-its-done"
            className="underline"
          >{`How it's done`}</Link>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <Link to="/Contribute" className="underline">
            Contribute
          </Link>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <Link to="/report-a-bug" className="underline">
            Report a Bug
          </Link>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <Link to="/supported-banks" className="underline">
            Supported Banks
          </Link>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <a
            target="_blank"
            href="https://github.com/Strikerzs/bank-transactions-downloader"
            className="underline"
          >
            GitHub
          </a>
        </li>
        <div className="w-0.5 h-0.5 bg-third"></div>
        <li>
          <Link to="/contact" className="underline">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
