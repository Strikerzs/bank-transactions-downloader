import { BANKS } from "../../../constants";
import { RoyalBankOfCanada } from "./banks/RoyalBankOfCanada";

const BANK_CHOICE_KEY = "bankChoice";

export const getBankPreferenceFromStorage = async () => {
  return chrome.storage.sync.get([BANK_CHOICE_KEY]).then((value) => {
    if (value && value.bankChoice) {
      const bank = BANKS.find((bank) => bank.value === value.bankChoice);
      if (bank) {
        return new RoyalBankOfCanada();
      } else {
        throw new Error(
          `Bank '${value.bankChoice}' was not found in list of supported banks.`
        );
      }
    }
  }).catch((error) => {
    throw error
  });
};
