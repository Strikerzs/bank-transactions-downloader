declare module "transactions-downloader-types" {
  export interface Question {
    value: string;
    disabled: boolean;
  }

  export interface Canada {
    value: "canada";
    display: "Canada";
  }

  export interface RoyalBankOfCanada {
    value: "royalBankOfCanada";
    display: "Royal Bank of Canada";
    abbreviation: "RBC";
    country: Canada;
    accountPageUrl: "https://www1.royalbank.com/sgw1/olb/index-en";
  }

  export type Countries = Canada[];
  export type Banks = RoyalBankOfCanada[];
}
