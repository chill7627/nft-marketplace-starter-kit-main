import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/KryptoBird.json';


class App extends Component {

    async componentDidMount() {
        await this.loadWeb3();
    }

    // first detect ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        // check for modern browsers
        // if there is a provider then let's log that it's working and access the window doc to set web3 provider
        if(provider) {
            console.log('ethereum wallet is connected');
            window.web3 = new Web3(provider);
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected.')
        }
    }

    render() {
        return (
            <div>
                <h1>NFT Marketplace</h1>
            </div>
        )
    }
}


export default App;