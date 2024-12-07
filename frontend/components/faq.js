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
    question: "What is this platform about?",
    answer:
      "This platform enables a decentralized and transparent IPO allocation process, allowing companies to register and users to apply for IPOs using cryptocurrency.",
  },
  {
    question: "How do companies register for an IPO?",
    answer:
      "Companies can register by creating an account, verifying their identity, and submitting details about their IPO, such as the number of shares, price per share, and timeline.",
  },
  {
    question: "How can users participate in an IPO?",
    answer:
      "Users need to register on the platform, connect their cryptocurrency wallet, and apply for IPOs by committing a specified amount of cryptocurrency.",
  },
  {
    question: "How is the allocation process randomized?",
    answer:
      "We use Chainlink's Verifiable Random Function (VRF) to ensure a secure and fair randomization process for IPO allocation.",
  },
  {
    question: "What happens if I don’t get allocated shares?",
    answer:
      "If you’re not allocated shares, your committed funds will be automatically refunded to your connected cryptocurrency wallet.",
  },
  {
    question: "What cryptocurrencies are supported?",
    answer:
      "Currently, the platform supports popular cryptocurrencies like ETH and stablecoins such as USDC and USDT for transactions.",
  },
  {
    question: "Are there any fees involved?",
    answer:
      "There is a minimal transaction fee to cover network costs. Additionally, a platform fee may apply, which will be transparently displayed during the IPO application process.",
  }
];


export default Faq;
