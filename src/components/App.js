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
        } else {
            // no ethereum provider
            console.log('no ethereum wallet detected.');
        }
    }

    async loadBlockChainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({account:accounts[0]});

        const networkId = await web3.eth.net.getId();
        const networkData = KryptoBird.networks[networkId];
        if(networkData) {
            const abi = KryptoBird.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            this.setState({contract});

            // call total supply of crypto birds
            const totalSupply = await contract.methods.totalSupply().call();
            this.setState({totalSupply});

            // keep track of tokens in an array
            for(let i = 1; i <= totalSupply; i++) {
                const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call();
                this.setState({
                    kryptoBirdz:[...this.state.kryptoBirdz, KryptoBird]
                })
                
            }
        } else {
            window.alert('Smart contract not deployed.');
        }
    }

    // minting, want to send information, we need to specify the account 
    mint = (kryptoBird) => {
        this.state.contract.methods.mint(kryptoBird).send({from:this.state.account})
        .once('receipt', (receipt)=> {
            this.setState({
                kryptoBirdz:[...this.state.kryptoBirdz, kryptoBird]
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null,
            totalSupply: 0,
            kryptoBirdz:[]
        };
    }

    render() {
        return (
            <div>
                {console.log(this.state.kryptoBirdz)}
                {console.log(this.state.totalSupply)}
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

                <div className='container-fluid mt-1'>
                    <div className='row'>
                        <main role='main' className='col-lg d-flex text-center'>
                            <div className="content mr-auto ml-auto" style={{opacity:'0.8'}}>
                                <h1 style={{color:'white'}}>KryptoBirdz NFT Marketplace</h1>

                                <form onSubmit={(event)=>{
                                    event.preventDefault();
                                    const kryptoBird = this.kryptoBird.value;
                                    this.mint(kryptoBird);
                                }}>
                                    <input type='text' placeholder="Add a file location" className='mb-1'
                                    ref={(input)=>this.kryptoBird = input}>

                                    </input>

                                    <input type='submit' className='btn btn-primary btn-black' value='MINT' sytle={{margin:'6px'}}>

                                    </input>

                                </form>
                            </div>
                        </main>

                    </div>
                </div>


            </div>
        )
    }
}


export default App;