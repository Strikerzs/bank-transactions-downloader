import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Message from "../components/Message";
import { BANKS, HEADERS } from "../../../constants";
import { RoyalBankOfCanada } from "../utils/banks/RoyalBankOfCanada";
import Loading from "../components/Loading";
import { getBankPreferenceFromStorage } from "../utils/getBankPreferenceFromStorage";

const App = () => {
  const [searchParams] = useSearchParams();
  const [bank, setBank] = useState<RoyalBankOfCanada>();
  const [isCheckingAccountPage, setIsCheckingAccountPage] = useState(true);
  const [isAccountPage, setIsAccountPage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    try {
      const bank = BANKS.find(
        (bank) => bank.value === searchParams.get("bank")
      );
      if (bank) {
        chrome.storage.sync.set({ bankChoice: bank.value });
        if (bank.value === "royalBankOfCanada") {
          setBank(new RoyalBankOfCanada());
        } else {
          throw new Error('Could not set bank')
        }
      } else {
        getBankPreferenceFromStorage()
          .then((value) => {
            if (!value) {
              throw new Error(
                `No bank selection was found. Please choose a bank by selecting 'Change Bank >' or reload the extension and try again.`
              );
            } else {
              setBank(value);
            }
          })
          .catch((error) => {
            setError(error.toString());
          });
      }
    } catch (error) {
      setError((error as Error).toString());
    }
  }, []);

  useEffect(() => {
    try {
      if (bank) {
        chrome.tabs
          .query({
            active: true,
            lastFocusedWindow: true,
          })
          .then((tabs) => {
            const url = tabs[0].url;
            setIsCheckingAccountPage(true);
            if (url) {
              const _isAccountPage = bank.isAccountPage(url);
              setIsCheckingAccountPage(false);
              setIsAccountPage(_isAccountPage);
            } else {
              throw new Error("Could not get url");
            }
          }).catch((error) => {
            throw error
          });
      }
    } catch (error) {
      setError((error as Error).toString());
    }
  }, [bank]);

  return (
    <div className="mb-10">
      {bank ? (
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span>Selected bank:</span>
              <span className="px-5 py-2 border-opaqueWhite border-2 border-solid rounded-full flex-1">
                {`${bank.display} (${bank.abbreviation})`}
              </span>
            </div>
            <Link to="/select-a-bank" className="underline text-sm">
              Change Bank &gt;
            </Link>
          </div>
          {!isAccountPage || isSuccess || isDownloading || error ? (
            <div className="flex flex-col gap-2">
              {!isAccountPage ? (
                <Message
                  message={`The current page is not a ${bank.display} bank account page. Go to a ${bank.display} bank account page and click on the extension again.`}
                  type="info"
                />
              ) : null}
              {error ? (
                <Message message={error} type="error" />
              ) : isDownloading ? (
                <Message message={"Loading..."} type="loading" />
              ) : isSuccess ? (
                <Message message={"Success!"} type="success" />
              ) : null}
            </div>
          ) : null}
          {isCheckingAccountPage ? (
            <Loading />
          ) : isAccountPage && !error && !isSuccess && !isDownloading ? (
            <div className="flex flex-col gap-7">
              <Message message={"You may need to reload the page for each bank account."} type="info"/>
              <div className="flex flex-col gap-3">
                <details className="bg-opaqueWhite px-5 py-3 rounded">
                  <summary className="text-sm">Headers</summary>
                  <table className="text-sm border-spacing-x-3 border-separate border-spacing-y-3 mt-4 w-full table-fixed">
                    <tbody>
                      {HEADERS.map((header) => {
                        return (
                          <tr key={header.value}>
                            <td className="text-gray-400 w-1/2">
                              {header.display}
                            </td>
                            <td className="w-1/2">{header.description}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </details>

                <details className="bg-opaqueWhite px-5 py-3 rounded">
                  <summary className="text-sm">Download info</summary>
                  <table className="text-sm border-spacing-x-3 border-separate border-spacing-y-3 mt-4 w-full table-fixed">
                    <tbody>
                      <tr>
                        <td className="text-gray-400 w-1/2">File type</td>
                        <td className="w-1/2">{`CSV (.csv)`}</td>
                      </tr>
                    </tbody>
                  </table>
                </details>
              </div>
              <button
                className="btn-primary flex-1 py-5"
                onClick={() => {
                  setIsDownloading(true);
                  bank
                    .downloadTransactions()
                    .then(() => {
                      chrome.tabs
                        .query({
                          active: true,
                          lastFocusedWindow: true,
                        })
                        .then((tabs) => {
                          const tabId = tabs[0].id;
                          if (tabId) {
                            chrome.tabs
                              .sendMessage(tabId, { runScript: true })
                              // @ts-ignore
                              .then((response) => {
                                setIsDownloading(false)
                                if (!chrome.runtime.lastError) {
                                  if (response) {
                                    if (response.error) {
                                      throw new Error(response.error);
                                    } else if (response.success) {
                                      setIsSuccess(true)
                                    } else {
                                      throw new Error("Unknown error.");
                                    }
                                  } else {
                                    throw new Error("Did not receive response");
                                  }
                                } else {
                                  throw new Error(
                                    chrome.runtime.lastError.message
                                  );
                                }
                              })
                              .catch((error: any) => {
                                throw error
                              })
                          } else {
                            throw new Error("Could not get tab");
                          }
                        })
                        .catch((error) => {
                          throw error
                        })
                    }).catch((error) => {
                      setError(error.toString())
                    })
                }}
              >
                Download Transactions
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default App;
