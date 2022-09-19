import React, { useState } from "react";

import { formatNumberToCurrencyString } from "utils/displayFunctions";
import { useTransactionsContext } from "contexts/TransactionsContext";
import { useAuthenticationContext } from "contexts/AuthenticationContext";
import { toast } from "react-toastify";
import { NegotiationConfirmationModal } from "components/NegotiationConfirmationModal";

// eslint-disable-next-line react/prop-types
export function NegotiationCard({ transactionId, transactionType }: { transactionId: string, transactionType: string }) {
  const [inputError, setInputError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const {
    maxBrlValueLength,
    maxBtcValueLength,
    maxBusdValueLength,
    bitcoinPrice,
    busdPrice,
    negotiate,
  } = useTransactionsContext();
  const { user } = useAuthenticationContext();

  interface NegotiationInfoInterface {
    currencyId: string
    maxLengthInput: number
    currencyPrice: string
    inputPlaceholder: string
    targetCurrency: string
  }

  interface TransactionIdToNegotiationInfoInterface {
    [transactionId: string]: NegotiationInfoInterface
  }

  const transactionIdToNegotiationInfo: TransactionIdToNegotiationInfoInterface = {
    brlToBtc: {currencyId: "BRL", maxLengthInput: maxBrlValueLength, currencyPrice: bitcoinPrice, inputPlaceholder: "Comprar Bitcoins", targetCurrency: "BTC"},
    brlToBusd: {currencyId: "BRL", maxLengthInput: maxBrlValueLength, currencyPrice: busdPrice, inputPlaceholder: "Comprar BUSDs", targetCurrency: "BUSD"},
    btcToBrl: {currencyId: "BTC", maxLengthInput: maxBtcValueLength, currencyPrice: String(1 / Number(bitcoinPrice)), inputPlaceholder: "Vender Bitcoins", targetCurrency: "BRL"},
    busdToBrl: {currencyId: "BUSD",maxLengthInput:  maxBusdValueLength, currencyPrice: String(1 / Number(busdPrice)), inputPlaceholder: "Vender BUSDs", targetCurrency: "BRL"},
    btcToBusd: {
      currencyId: "BTC",
      maxLengthInput: maxBtcValueLength,
      currencyPrice: String(Number(busdPrice) / Number(bitcoinPrice)),
      inputPlaceholder: "Converter Bitcoins por BUSDs",
      targetCurrency: "BUSD"
    },
    busdToBtc: {
      currencyId: "BUSD",
      maxLengthInput: maxBusdValueLength,
      currencyPrice: String(Number(bitcoinPrice) / Number(busdPrice)),
      inputPlaceholder: "Converter BUSDs por Bitcoins",
      targetCurrency: "BTC"
    },
  };

  const transactionTypesMap: {[key: string]: string} = {
    buying: "Comprar",
    selling: "Vender",
    exchange: "Converter",
  };

  const { currencyId, maxLengthInput, currencyPrice, inputPlaceholder, targetCurrency} =
    transactionIdToNegotiationInfo[transactionId] || {};
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

  function handleModalConfirmation() {
    try {
      if (Number(inputValue) === 0) {
        setInputError("Tente novamente");
        throw new Error("Não é possível realizar operações com valor 0");
      }
      negotiate({ transactionId, inputValue });
      setInputValue("");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setConfirmationModalIsOpen(false);
    }
  }

  return (
    <>
      <NegotiationConfirmationModal 
        payingValue={`${formatNumberToCurrencyString(inputValue)} (${currencyId})`}
        receivingValue={`${formatNumberToCurrencyString(Number(inputValue) / Number(currencyPrice))} (${targetCurrency})`}
        onConfirmation={handleModalConfirmation}
        isOpen={confirmationModalIsOpen} 
        closeModal={() => setConfirmationModalIsOpen(false)}/>
      <div className="flex bg-slate-50 flex-col w-5/6 shadow rounded-lg">
        <form 
          onSubmit={(event) => {
            event.preventDefault();
            setConfirmationModalIsOpen(true);
          }}>
          <div className="w-full h-full p-4">
            <p className="w-24 md:w-full text-green-500 text-l mb-2">{inputPlaceholder}</p>
            <p className="text-xs font-bold text-gray-800 mb-2">
              {`Saldo disponível:  ${formatNumberToCurrencyString(user.wallet.currencies[currencyId].credit)}`}
            </p>
            <input
              className={
                inputError
                  ? "w-full rounded-lg p-2 border border-solid border-white shadow-sm focus:border-red-400 focus:outline-none focus:shadow-sm focus:shadow-red-400"
                  : "w-full rounded-lg p-2 border border-solid border-white shadow-sm focus:border-green-400 focus:outline-none focus:shadow-sm focus:shadow-green-400"
              }
              onChange={(event) => handleNumberInputValue(event.target.value)}
              placeholder={`Valor em ${currencyId}`}
              value={inputValue}
            />

            <div className="p-1">
              <p className="text-sm text-red-500">{inputError || ""}</p>
            </div>
            <div className="p-1 max-w-full">
              <p className="text-sm max-w-full text-green-500">
                {inputValue
                  ? `Valor a receber: ${formatNumberToCurrencyString(Number(inputValue) / Number(currencyPrice))} (${targetCurrency})`
                  : ""}
              </p>
            </div>
          </div>

          <button
            disabled={inputError ? true : false}
            type="submit"
            className={
              inputError
                ? "bg-green-300 text-white rounded-b-lg w-full h-8"
                : "bg-green-500 text-white rounded-b-lg w-full h-8 hover:bg-green-600"
            }
          >
            {buttonText}
          </button>
        </form>
      </div>
    </>
  );
}
