import React from "react";

import { NegotiationCard } from "components/NegotiationCard";

import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { formatNumberToCurrencyString } from "utils/displayFunctions";
import { useTransactionContext } from "contexts/TransactionContext";

export function Home() {
  const { user } = useAuthenticationContext();
  const { bitcoinPrice, busdPrice } = useTransactionContext();

  return (
    <>
      <p className="text-2xl mb-2 text-gray-800 font-semibold">Sua Carteira</p>
      <div className="flex flex-row gap-y-2 gap-x-4 w-full mb-4 flex-wrap">
        {Object.values(user.wallet.currencies).map((currency) => {
          return (
            <div
              key={`home-currency-card-${currency.id}`}
              className="bg-slate-50 min-w-fit w-72 h-fit rounded-lg p-4 shadow "
            >
              <p
                className="text-l mb-2 w-24 text-green-500"
                key={`summary-currency-item-${currency.id}`}
              >
                {currency.id}
              </p>
              <p
                key={`summary-currency-item-${currency.id}-value`}
                className="text-3xl font-bold text-gray-800"
              >
                {formatNumberToCurrencyString(currency.credit)}
              </p>
            </div>
          );
        })}
      </div>
      <p className="text-2xl mb-2 text-gray-800 font-semibold pt-6">Últimas cotações</p>
      <div className="flex flex-row gap-y-2 gap-x-4 w-full mb-4 flex-wrap">
        <div className="bg-slate-50 min-w-fit w-72 h-fit rounded-lg p-4 shadow ">
          <p className="text-l mb-2 w-24 text-green-500">BTC</p>
          <p className="text-3xl font-bold text-gray-800">
            {formatNumberToCurrencyString(bitcoinPrice)}
          </p>
        </div>
        <div className="bg-slate-50 min-w-fit w-72 h-fit rounded-lg p-4 shadow ">
          <p className="text-l mb-2 w-24 text-green-500">BUSD</p>
          <p className="text-3xl font-bold text-gray-800">
            {formatNumberToCurrencyString(busdPrice)}
          </p>
        </div>
      </div>

      <p className="text-2xl mb-2 text-gray-800 font-semibold pt-6">Negociar</p>
      <div className="flex flex-row gap-y-4 w-full mb-4 flex-wrap">
        <div className="flex w-full flex-row justify-center items-start gap-x-2">
          <NegotiationCard transactionId="brlToBtc" transactionType="buying" />
          <NegotiationCard transactionId="btcToBrl" transactionType="selling" />
        </div>
        <div className="flex w-full flex-row justify-center items-start gap-x-2">
          <NegotiationCard transactionId="brlToBusd" transactionType="buying" />
          <NegotiationCard transactionId="busdToBrl" transactionType="selling" />
        </div>
        <div className="flex w-full flex-row justify-center items-start gap-x-2">
          <NegotiationCard transactionId="btcToBusd" transactionType="exchange" />
          <NegotiationCard transactionId="busdToBtc" transactionType="exchange" />
        </div>
      </div>
    </>
  );
}
