import { Bank } from "./Bank";
import { ROYAL_BANK_OF_CANADA } from "../../../../constants";

export class RoyalBankOfCanada extends Bank {
  async downloadTransactions() {
    return chrome.tabs
      .query({
        active: true,
        lastFocusedWindow: true,
      })
      .then(async (tabs) => {
        const tabId = tabs[0].id;
        if (tabId) {
          return chrome.scripting
            .executeScript({
              files: ["papaparse.min.js", "src/pages/content/index.js"],
              target: {
                tabId: tabId,
              }
            }).catch((error) => {
              throw error
            })
        } else {
          throw new Error("Could not get tab");
        }
      }).catch((error) => {
        throw error
      });
  }

  isAccountPage(
    pageUrl: string
  ): boolean {
    const url = new URL(pageUrl);
    return url.hash.includes("selectedAccount") &&
    url.hash.includes("details") &&
    url.hash.includes("sort") &&
    url.href.includes("https://www1.royalbank.com/sgw1/olb/index-en")
  }

  constructor() {
    super(
      ROYAL_BANK_OF_CANADA.value,
      ROYAL_BANK_OF_CANADA.display,
      ROYAL_BANK_OF_CANADA.abbreviation,
      ROYAL_BANK_OF_CANADA.country,
      ROYAL_BANK_OF_CANADA.accountPageUrl
    );
  }
}
