"use client";
import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <div> {/* Use div instead of React.Fragment */}
                  <Disclosure.Button
                    aria-expanded={open}
                    className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={clsx("w-5 h-5 text-indigo-500", {
                        "transform rotate-180": open,
                      })}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

export const faqdata = [
  {
    question: "What is this application about?",
    answer:
      "This application connects school students preparing for NEET/JEE/CET with recent college graduates who can provide topic-specific training.",
  },
  {
    question: "How can I request help from a trainer?",
    answer:
      "Simply select a specific topic you need assistance with, and the app will connect you with an appropriate trainer.",
  },
  {
    question: "What features does this app offer?",
    answer:
      "The app offers one-on-one online meetings, audio recording for analysis, and a user-friendly interface to facilitate effective learning.",
  },
  {
    question: "Is the training session recorded?",
    answer:
      "Yes, all training sessions are recorded for analysis to ensure quality and maintain a respectful conversation.",
  },
  {
    question: "Are there any costs involved?",
    answer:
      "The first month of training is free, and subsequent pricing options will be transparent without any hidden fees.",
  },
];

export default Faq;
