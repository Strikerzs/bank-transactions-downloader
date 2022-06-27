import {
  Canada,
  RoyalBankOfCanada,
  Question,
} from "transactions-downloader-types";

export const COUNTRIES: Canada[] = [
  { value: "canada", display: "Canada" },
];

export const ROYAL_BANK_OF_CANADA: RoyalBankOfCanada = {
  value: "royalBankOfCanada",
  abbreviation: "RBC",
  display: "Royal Bank of Canada",
  accountPageUrl: "https://www1.royalbank.com/sgw1/olb/index-en",
  country: {
    value: "canada",
    display: "Canada",
  },
};

export const BANKS: RoyalBankOfCanada[] = [ROYAL_BANK_OF_CANADA];

export const QUESTIONS: Question[] = [
  {
    value: "Select the country in which your bank resides:",
    disabled: true,
  },
  {
    value: "Select a bank:",
    disabled: true,
  },
];

export const HEADERS = [
  { value: "date", description: "date", display: "date" },
  {
    value: "descriptionOne",
    description: "first description",
    display: "description-1",
  },
  {
    value: "descriptionTwo",
    description: "second description",
    display: "description-2",
  },
  { value: "amount", description: "amount (in $)", display: "amount" },
  {
    value: "creditDebitIndicator",
    description: "a credit or debit transaction",
    display: "creditDebitIndicator",
  },
  {
    value: "runningBalance",
    description: "the current bank balance",
    display: "runningBalance",
  },
];
