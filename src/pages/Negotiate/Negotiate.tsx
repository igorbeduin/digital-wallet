import React from "react";

import { NegotiationCard } from "components/NegotiationCard";

export function Negotiate() {
  return (
    <>
      <p className="text-2xl mb-4">Negociar Bitcoin</p>
      <div className="flex flex-row justify-center items-start gap-x-4">
        <NegotiationCard transactionId="brlToBtc" transactionType="buying" />
        <NegotiationCard transactionId="btcToBrl" transactionType="selling" />
      </div>
      <p className="text-2xl mb-4">Negociar BUSD</p>
      <div className="flex flex-row justify-center items-start gap-x-4">
        <NegotiationCard transactionId="brlToBusd" transactionType="buying" />
        <NegotiationCard transactionId="busdToBrl" transactionType="selling" />
      </div>
      <p className="text-2xl mb-4">Câmbio de Criptomoedas</p>
      <div className="flex flex-row justify-center items-start gap-x-4">
        <NegotiationCard transactionId="btcToBusd" transactionType="exchange" />
        <NegotiationCard transactionId="busdToBtc" transactionType="exchange" />
      </div>
    </>
  );
}
