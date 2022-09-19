import React from "react";

interface NegotiationConfirmationModalInterface {
    isOpen: boolean,
    closeModal: () => void,
    onConfirmation: () => void,
    payingValue: string,
    receivingValue: string
}

export function NegotiationConfirmationModal({
  isOpen = true,
  closeModal, 
  onConfirmation,
  payingValue, 
  receivingValue}: NegotiationConfirmationModalInterface) {

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  return (
    <>
      {isOpen && 
      <div className="fixed inset-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
        <div className="bg-slate-50 w-80 md:w-96 h-80 rounded-lg p-4">
          <p className="text-xl">Deseja confirmar a transação?</p>
          <div className="w-full mt-2 h-4/6 flex flex-col justify-center items-center">
            <div className="text-2xl font-bold">
              <span>{"Pagando: "}</span>
              <span>{payingValue}</span>
            </div>

            <div className="text-2xl font-bold">
              <span>{"Recebendo: "}</span>
              <span>{receivingValue}</span>
            </div>
          </div>
          <div className="w-full flex justify-center gap-x-24 items-center mt-2">
            <button 
              onClick={closeModal}
              className="my-4 text-red-500 hover:text-red-600 rounded-lg">Cancelar</button>
            <button 
              onClick={onConfirmation}
              className="my-4 text-white bg-green-500 rounded-lg p-2 hover:bg-green-600">Confirmar</button>
          </div>
        </div>
      </div>}
    </>
  );
}
