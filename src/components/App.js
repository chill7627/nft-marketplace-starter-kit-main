import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from '../abis/KryptoBird.json';


class App extends Component {

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockChainData();
    }

    // first detect ethereum provider
    async loadWeb3() {
        const provider = await detectEthereumProvider();

        // check for modern browsers
        // if there is a provider then let's log that it's working and access the window doc to set web3 provider
        if(provider) {
            console.log('ethereum wallet is connected');
            window.web3 = new Web3(provider);
            let web3 = window.web3;
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected.');
        }
    }

    async loadBlockChainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({account:accounts});
        console.log(this.state.account);
    }

    constructor(props) {
        super(props);
        this.state = {
            account: ''
        };
    }

    render() {
        return (
            <div>
                <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
                    <div className='navbar-brand col-sm-3 col-md-3 mr-0' style={{color:'white'}}>
                        Krypto Birdz NFTS (Non Fungible Tokens)
                    </div>
                    <ul className='navbar-nav px-3'>
                        <li className='nav-item text-nowwrap d-none d-sm-none d-sm-block'>
                            <small className="text-white">
                                {this.state.account}
                            </small>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}


export default App;