(() => {
  let endingString: null | string = null;

  const getTransactions = async () => {
    const cookies = new URLSearchParams(document.cookie.replaceAll("; ", "&"));
    const url = new URL(window.location.href);

    const xDtpc = cookies.get("dtPC");
    const xXsrfToken = cookies.get("XSRF-TOKEN");

    if (xDtpc && xXsrfToken) {
      return fetch(
        `https://www1.royalbank.com/sgw5/api/transaction-presentation-service-v3/v3/search/pda/account/${endingString}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-CA, en;q=0.8, fr-CA;q=0.7, fr;q=0.6",
            "content-type": "application/json",
            "x-dtpc": xDtpc,
            "x-xsrf-token": xXsrfToken,
          },
          referrer: url.origin + url.pathname,
          referrerPolicy: "strict-origin-when-cross-origin",
          body: JSON.stringify({}),
          method: "POST",
          mode: "cors",
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .catch((error) => {
          throw error;
        });
    } else {
      throw new Error(
        "Could not get x-dtpc or x-xsrf-token headers for fetch request."
      );
    }
  };

  const tryToSetEndingString = () => {
    const networkResource = getFirstNetworkResourceByName(
      "https://www1.royalbank.com/sgw5/api/transaction-presentation-service-v3/v3/transactions/pda/account/"
    );
    if (networkResource) {
      const url = networkResource.name;
      const paths = new URL(url).pathname.split("/");
      endingString = paths[paths.length - 1];
    }
  };

  const getFirstNetworkResourceByName = (name: string) => {
    const captureResources = performance.getEntriesByType("resource");
    for (let i = 0; i < captureResources.length; i++) {
      const captureResource = captureResources[i];
      if (captureResource.name.includes(name)) {
        return captureResource;
      }
    }
  };

  const downloadTransactions = (transactions: any) => {
    const papaData = Papa.unparse(
      transactions.transactionList.map((transaction: any) => {
        return {
          date: transaction.bookingDate,
          "description-1": transaction.description[0],
          "description-2": transaction.description[1],
          amount: transaction.amount,
          creditDebitIndicator: transaction.creditDebitIndicator,
          runningBalance: transaction.runningBalance,
        };
      })
    );
    const element = document.createElement("a");
    element.setAttribute("download", "transactions.csv");
    element.setAttribute(
      "href",
      URL.createObjectURL(new Blob([papaData], { type: "text/csv" }))
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const main = async () => {
    endingString = null;

    tryToSetEndingString();

    if (endingString) {
      try {
        const transactions = await getTransactions();
        downloadTransactions(transactions);
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error(
        "Could not find network request needed to get transactions. Please wait a few minutes and try again. If that does not work, please reload the page and try again."
      );
    }
  };

  const runScriptListener = (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.runScript) {
      main()
        .then(() => {
          sendResponse({
            success: true,
          });
        })
        .catch((error) => {
          sendResponse({
            error: error.toString(),
          });
        })
        .finally(() => {
          chrome.runtime.onMessage.removeListener(runScriptListener)
        });
    }
    return true;
  };

  chrome.runtime.onMessage.addListener(runScriptListener)
})();
