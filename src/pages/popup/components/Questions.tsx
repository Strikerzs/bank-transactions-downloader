import { PropsWithChildren, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Banks, Question as IQuestion } from "transactions-downloader-types";
import { COUNTRIES, BANKS, QUESTIONS } from "../../../constants";
import chevronIcon from '../../../assests/icons/chevron.svg'
import { Fragment } from 'react'

const Question = ({
  question,
  children,
  show,
}: PropsWithChildren<{
  question: IQuestion;
  show: boolean;
}>) => {
  return (
    <div className={`flex-col gap-5 ${show ? "flex" : "hidden"}`}>
      <span>{question.value}</span>
      {children}
    </div>
  );
};

const Questions = () => {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(QUESTIONS);
  const [bank, setBank] = useState<undefined | Banks[number]>();
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (bank) {
            navigate({
              pathname: "/app",
              search: createSearchParams({
                bank: bank.value,
              }).toString(),
            });
          }
        }}
      >
        <section className="flex flex-col gap-5 font-semibold bg-opaqueBlack shadow-sm">
          <Question question={questions[0]} show={index === 0}>
            <select
              className="bg-opaqueWhite text-white px-5 py-3 rounded relative"
              onChange={(event) => {
                const elm = event.target as HTMLSelectElement;
                if (elm.selectedIndex !== 0) {
                  setQuestions((prev) => [
                    ...prev.slice(0, index),
                    {
                      value: prev[index].value,
                      disabled: false,
                    },
                    ...prev.slice(index + 1, prev.length),
                  ]);
                } else {
                  setQuestions((prev) => [
                    ...prev.slice(0, index),
                    {
                      value: prev[index].value,
                      disabled: true,
                    },
                    ...prev.slice(index + 1, prev.length),
                  ]);
                }
              }}
            >
              <option selected className="w-10 flex items-center">
                <span className="pl-2 justify-between">Select a country</span>
                <img src="/icons/chevron.svg" />
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option
                    key={country.value}
                    className="bg-opaqueWhite"
                    value={country.value}
                  >
                    {country.display}
                  </option>
                );
              })}
            </select>
          </Question>
          <Question question={questions[1]} show={index === 1}>
            <div className="flex gap-3">
              {BANKS.map((bankLoop) => {
                return (
                  <Fragment key={bankLoop.value}>
                    <label
                      data-bank={bankLoop.value}
                      className={`bg-opaqueWhite px-5 py-3 flex items-center gap-3 rounded hover:outline outline-offset-4 outline-2 hover:outline-secondary ${
                        bank ? "outline outline-secondary" : null
                      } cursor-pointer`}
                      htmlFor={`${bankLoop.value}-bank-choice`}
                      onClick={(event) => {
                        const elm = event.currentTarget as HTMLLabelElement;
                        const selectedBank = BANKS.find(
                          (bank) => bank.value === elm.dataset.bank
                        );
                        if (selectedBank) {
                          setQuestions((prev) => [
                            ...prev.slice(0, index),
                            {
                              value: prev[index].value,
                              disabled: false,
                            },
                            ...prev.slice(index + 1, prev.length),
                          ]);
                          setBank(selectedBank);
                        } else {
                          setQuestions((prev) => [
                            ...prev.slice(0, index),
                            {
                              value: prev[index].value,
                              disabled: true,
                            },
                            ...prev.slice(index + 1, prev.length),
                          ]);
                        }
                      }}
                    >
                      <input
                        type="radio"
                        value={bankLoop.value}
                        id={`${bankLoop.value}-bank-choice`}
                        name="country"
                      />
                      {bankLoop.display} {`(${bankLoop.abbreviation})`}
                    </label>
                  </Fragment>
                );
              })}
            </div>
          </Question>
          <div className="flex gap-3">
            <button
              className={`btn-primary disabled:opacity-20 disabled:hover:outline-none disabled:cursor-not-allowed ${
                index === 0 || index === questions.length - 1
                  ? "hidden"
                  : "flex"
              }`}
              disabled={questions[index].disabled}
              onClick={() => {
                setIndex((prev) => prev + 1);
              }}
              type="button"
            >
              Back
            </button>
            <button
              className={`btn-primary disabled:opacity-20 disabled:hover:outline-none disabled:cursor-not-allowed ${
                index !== questions.length - 1 ? "flex" : "hidden"
              }`}
              disabled={questions[index].disabled}
              onClick={() => {
                setIndex((prev) => prev + 1);
              }}
              type="button"
            >
              Next
            </button>
            <button
              className={`btn-primary disabled:opacity-20 disabled:hover:outline-none disabled:cursor-not-allowed ${
                index === questions.length - 1 ? "flex" : "hidden"
              }`}
              disabled={questions[index].disabled}
              type="submit"
            >
              Submit
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Questions;
