/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function TransactionsTable({ title, values }) {
  const [pageIndex, setPageIndex] = useState(0);
  const rowsPerPage = 4;
  const maxPage = Math.ceil(values.length / rowsPerPage) - 1;
  const showingList = values.slice(
    pageIndex * rowsPerPage,
    (pageIndex + 1) * rowsPerPage
  );

  function handleTurnPage(pagesToTurn) {
    const targetPage = pageIndex + pagesToTurn;
    console.log("handleTurnPage", targetPage, maxPage);
    if (targetPage >= 0 && targetPage <= maxPage) {
      setPageIndex(targetPage);
    }
  }

  console.log("pageIndex", pageIndex);
  console.log("showingList", showingList);
  console.log("maxPage", maxPage);

  return (
    <>
      <h1 className="text-2xl">{title}</h1>
      <div className="relative bg-slate-50 rounded-lg flex flex-col justify-center items-center h-44">
        {values.length ? (
          <>
            <div className="w-full h-full flex justify-center items-start">
              <table className="table-auto w-full">
                <thead className="bg-green-500 text-white rounded-lg">
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {showingList.map((entry, index) => (
                    <tr
                      className="text-center"
                      key={`history-${title}-item-${index}`}
                    >
                      <td>{new Date(entry.date).toLocaleString("pt-BR")}</td>
                      <td>{entry.description}</td>
                      <td>
                        {entry.operation === "addition" ? "+" : "-"}
                        {entry.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-center items-end">
              <button
                className={
                  pageIndex === 0 ? `m-4 text-gray-300` : `m-4 text-green-500`
                }
                onClick={() => handleTurnPage(-1)}
                disabled={pageIndex === 0}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                className={
                  pageIndex === maxPage
                    ? `m-4 text-gray-300`
                    : `m-4 text-green-500`
                }
                disabled={pageIndex === maxPage}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  onClick={() => handleTurnPage(1)}
                />
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <p> Nenhuma transação disponível</p>
          </div>
        )}
      </div>
    </>
  );
}
