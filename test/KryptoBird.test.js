const {assert} = require('chai');

const KryptoBird = artifacts.require('./KryptoBird');

// check for chai
require('chai')
.use(require('chai-as-promised'))
.should()

contract('KryptoBird', (accounts) => {
    // async () => {} defines an asynchronous javascript function which means they can all run whenever not in a particular order.
    // describe() are the tests groupings like deployment, minting, transfering, etc.
    // it() are the individual tests within the groups
    // all have async funcs within them, so remember to use await on anything which it's output is used later
    let contract //makes it global to all of contract becasue declared outside all functions
    // before tells our tests to run this first before anything else
    before( async () => {
    contract = await KryptoBird.deployed();
    })

    // testing container - describe
    describe('deployment', async() => {
        // test samples with writing it
        it('deploys successfully', async() =>{
            const address = await contract.address;
            // test that address is not empty
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, 0x0);
        })

        it('has a name', async() => {
            // check to see that name match required
            const name = await contract.name();
            assert.equal(name, 'KryptoBird');
        })

        it('has a symbol', async() => {
            // check to see that symbol match required
            const symbol = await contract.symbol();
            assert.equal(symbol, 'KBIRDZ');
        })
    })

    describe('minting', async() => {
        it('creates a new token', async() => {
            const result = await contract.mint('https...1');
            const totalSupply = await contract.totalSupply();
            
            // Success tests
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event._from, '0x0000000000000000000000000000000000000000', 'from is the contract');
            // we brought in ganache accounts in big contract declaration
            assert.equal(event._to, accounts[0], 'to is msg.sender');

            // Failure
            await contract.mint('https...1').should.be.rejected
        })
    })

    describe('indexing', async() => {
        it('lists KryptoBirdz', async() => {
            //mint 3 more tokens
            await contract.mint('https...2');
            await contract.mint('https...3');
            await contract.mint('https...4');
            const totalSupply = await contract.totalSupply()

            // loop through and list grab KBirdz form list
            let result = [];
            let KryptoBird;
            for(i=1;i<=totalSupply;i++) {
                KryptoBird = await contract.kryptoBirdz(i-1);
                result.push(KryptoBird);
            }
            // test that minted tokens are actually showing up in minted array
            // assert that new array results will equal expected results
            let expected = ['https...1', 'https...2', 'https...3', 'https...4'];
            result = result.join(',');
            expected = expected.join(',');
            assert.equal(result, expected);
        })
    })
})