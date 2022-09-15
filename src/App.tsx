import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { RoutesNavigator } from 'navigation/RoutesNavigator'

import { AuthenticationContextProvider } from 'contexts/AuthenticationContext'
import { TransactionContextProvider } from 'contexts/TransactionContext'

import { useInitialConfiguration } from 'hooks/useInitialConfiguration'

import 'react-toastify/dist/ReactToastify.css'

function App () {
  useInitialConfiguration()

  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthenticationContextProvider>
      <TransactionContextProvider>
        <RoutesNavigator />
      </TransactionContextProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  )
}

export default App
