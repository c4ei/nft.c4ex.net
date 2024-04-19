import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-toastify/dist/ReactToastify.css'
import { initCometChat } from './services/chat'
import { BrowserRouter } from 'react-router-dom'

// import { ThirdwebProvider, ChainId, ConnectButton, } from "thirdweb/react";
// import { AllAboutHealthy } from "@thirdweb-dev/chains";
// const activeChain = AllAboutHealthy;
// const supportedChainIds = [21133];


initCometChat().then(() => {
  ReactDOM.render(
    <BrowserRouter>
      {/* <ThirdwebProvider clientId={process.env.REACT_APP_TEMPLATE_CLIENT_ID}
        activeChain={activeChain}
        supportedChainIds={supportedChainIds}
        > */}
        <App />
      {/* </ThirdwebProvider> */}
    </BrowserRouter>,
    document.getElementById('root'),
  )
})
