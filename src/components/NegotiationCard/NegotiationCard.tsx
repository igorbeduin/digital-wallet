import React, { useState } from "react";

import { formatNumberToCurrencyString } from "utils/displayFunctions";
import { useTransactionContext } from "contexts/TransactionContext";
import { useAuthenticationContext } from "contexts/AuthenticationContext";

// eslint-disable-next-line react/prop-types
export function NegotiationCard({ transactionId, transactionType }: { transactionId: string, transactionType: string }) {
  const [inputError, setInputError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const {
    maxBrlValueLength,
    maxBtcValueLength,
    maxBusdValueLength,
    bitcoinPrice,
    busdPrice,
    negotiate,
  } = useTransactionContext();
  const { user } = useAuthenticationContext();

  interface NegotiationInfoInterface {
    currencyId: string
    maxLengthInput: number
    currencyPrice: string
    inputPlaceholder: string
  }

  interface TransactionIdToNegotiationInfoInterface {
    [transactionId: string]: NegotiationInfoInterface
  }

  const transactionIdsMap: TransactionIdToNegotiationInfoInterface = {
    brlToBtc: {currencyId: "BRL", maxLengthInput: maxBrlValueLength, currencyPrice: bitcoinPrice, inputPlaceholder: "Comprar Bitcoins"},
    brlToBusd: {currencyId: "BRL", maxLengthInput: maxBrlValueLength, currencyPrice: busdPrice, inputPlaceholder: "Comprar BUSDs"},
    btcToBrl: {currencyId: "BTC", maxLengthInput: maxBtcValueLength, currencyPrice: String(1 / Number(bitcoinPrice)), inputPlaceholder: "Vender Bitcoins"},
    busdToBrl: {currencyId: "BUSD",maxLengthInput:  maxBusdValueLength, currencyPrice: String(1 / Number(busdPrice)), inputPlaceholder: "Vender BUSDs"},
    btcToBusd: {
      currencyId: "BTC",
      maxLengthInput: maxBtcValueLength,
      currencyPrice: String(Number(busdPrice) / Number(bitcoinPrice)),
      inputPlaceholder: "Trocar Bitcoins por BUSDs",
    },
    busdToBtc: {
      currencyId: "BUSD",
      maxLengthInput: maxBusdValueLength,
      currencyPrice: String(Number(bitcoinPrice) / Number(busdPrice)),
      inputPlaceholder: "Trocar BUSDs por Bitcoins",
    },
  };

  const transactionTypesMap: {[key: string]: string} = {
    buying: "Comprar",
    selling: "Vender",
    exchange: "Trocar",
  };

  const { currencyId, maxLengthInput, currencyPrice, inputPlaceholder} =
    transactionIdsMap[transactionId] || {};
  const buttonText = transactionTypesMap[transactionType] || "";

  function handleNumberInputValue(value: string) {
    if (!isNaN(Number(value))) {
      if (value.length > maxLengthInput) setInputError("Valor máximo atingido");
      else {
        setInputError("");
        setInputValue(value);
      }
    }
    if (Number(value) > user.wallet.currencies[currencyId].credit)
      setInputError("Saldo indisponível");
    else setInputError("");
  }

  return (
    <div className="flex flex-col w-64">
      <input
        className={
          inputError
            ? "rounded-t-lg p-2 border border-solid shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
            : "rounded-t-lg p-2 border border-solid shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
        }
        onChange={(event) => handleNumberInputValue(event.target.value)}
        placeholder={inputPlaceholder}
        value={inputValue}
      />
      <button
        className={
          inputError
            ? "bg-green-300 text-white rounded-b-lg mb-2 w-full h-8"
            : "bg-green-400 text-white rounded-b-lg mb-2 w-full h-8 hover:bg-green-500"
        }
        onClick={() => {
          try {
            negotiate({ transactionId, inputValue });
            setInputValue("");
          } catch (err) {
            console.log(err);
          }
        }}
        disabled={inputError ? true : false}
      >
        {buttonText}
      </button>

      <div className="p-1">
        <p className="text-sm text-red-500">{inputError || ""}</p>
      </div>
      <div className="p-1 max-w-full">
        <p className="text-sm max-w-full text-green-500">
          {inputValue
            ? `Valor a receber: ${formatNumberToCurrencyString(Number(inputValue) / Number(currencyPrice))}`
            : ""}
        </p>
      </div>
    </div>
  );
}
