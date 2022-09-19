/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { formatNumberToCurrencyString } from "utils/displayFunctions";

interface HistoryEntryInterface {
  date: string
  description: string
  value: string
  operation: string
}

export function TransactionsTable({ title, values }: { title: string, values: Array<HistoryEntryInterface> }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [operationFilter, setOperationFilter] = useState("");
  const rowsPerPage = 5;
  const maxPage = Math.ceil(values.length / rowsPerPage) - 1;

  const filteredList = values.filter((entry) => entry.operation.includes(operationFilter));

  const paginatedList = filteredList.slice(
    pageIndex * rowsPerPage,
    (pageIndex + 1) * rowsPerPage
  );

  function handleTurnPage(pagesToTurn: number) {
    const targetPage = pageIndex + pagesToTurn;
    console.log("handleTurnPage", targetPage, maxPage);
    if (targetPage >= 0 && targetPage <= maxPage) {
      setPageIndex(targetPage);
    }
  }

  

  return (
    <>
      <div className="bg-slate-50 rounded-lg flex flex-col justify-center items-center h-fit mb-6 p-4 w-full">
        <h1 className="text-2xl mb-2 text-green-500 font-semibold w-full">{title}</h1>
        {values.length ? (
          <>
            <div className="w-full h-full flex justify-center items-start">
              <table className="table-fixed w-full">
                <thead className="text-white rounded-lg">
                  <tr>
                    <th className="bg-green-500 rounded-tl-lg">Data</th>
                    <th className="bg-green-500 ">Descrição</th>
                    <th className="bg-green-500 rounded-tr-lg">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedList.map((entry, index) => (
                    <tr
                      className="text-center"
                      key={`history-${title}-item-${index}`}
                    >
                      <td className="border-b border-solid py-2">{new Date(entry.date).toLocaleString("pt-BR")}</td>
                      <td className="border-b border-solid py-2">{entry.description}</td>
                      <td className="border-b border-solid py-2">
                        {entry.operation === "addition" ? "+" : "-"}
                        {formatNumberToCurrencyString(entry.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex gap-x-10 md:gap-x-72 justify-center items-center">
              <div>
                <button
                  className={
                    pageIndex === 0 ? "m-4 text-gray-300" : "m-4 text-green-500"
                  }
                  onClick={() => handleTurnPage(-1)}
                  disabled={pageIndex === 0}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  className={
                    pageIndex === maxPage
                      ? "m-4 text-gray-300"
                      : "m-4 text-green-500"
                  }
                  disabled={pageIndex === maxPage}
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    onClick={() => handleTurnPage(1)}
                  />
                </button>
              </div>
              <select
                className="rounded-lg p-2 bg-white"
                onChange={(event) => setOperationFilter(event.target.value)}>
                <option value="">Todas</option>
                <option value="addition">Positivas</option>
                <option value="subtraction">Negativas</option>
              </select>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center pb-6">
            <p> Nenhuma transação disponível</p>
          </div>
        )}
      </div>
    </>
  );
}
