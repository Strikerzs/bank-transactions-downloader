import { Countries } from "transactions-downloader-types";

export abstract class Bank {
  value: string;
  display: string;
  abbreviation: string;
  country: Countries[number];
  accountPageUrl: string;

  constructor(
    value: string,
    display: string,
    abbreviation: string,
    country: Countries[number],
    accountPageUrl: string
  ) {
    this.value = value;
    this.display = display;
    this.abbreviation = abbreviation;
    this.country = country;
    this.accountPageUrl = accountPageUrl;
  }

  abstract isAccountPage(url: string, callback: (value: boolean) => void): void;
  abstract downloadTransactions(): Promise<any>;
}
