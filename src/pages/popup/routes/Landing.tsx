import Footer from "../components/Footer";
import { createSearchParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { BANKS } from "../../../constants";
import Message from "../components/Message";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    chrome.storage.sync.get(["bankChoice"]).then((value) => {
      setIsLoading(false);
      if (value && value.bankChoice) {
        const bank = BANKS.find((bank) => bank.value === value.bankChoice);
        if (bank) {
          navigate({
            pathname: "/app",
            search: createSearchParams({
              bank: bank.value,
            }).toString(),
          });
        }
      }
    }).catch((error) => {
      setError(error)
    });
  }, []);

  return (
    <div className="flex flex-col max-w-max bg-primary relative overflow-hidden w-[600px] h-[300px]">
      <div className="w-72 h-72 blur-3xl bg-secondary opacity-10 absolute -bottom-1/4 rounded-full z-0"></div>
      <div className="w-72 h-72 blur-3xl bg-secondary opacity-10 absolute -right-1/4 -top-1/4 rounded-full z-0"></div>
      <div
        className="z-10 px-6 py-8 overflow-auto flex-1 flex flex-col justify-between"
        style={{
          scrollbarGutter: "stable both-edges",
          overscrollBehavior: "contain"
        }}
      >
        {error ? <Message type="error" message={error}/> : !isLoading ? <Outlet /> : <Loading />}
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
