// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract kryptoBird is ERC721Connector {
    // create array to keep track of kbirdz nfts in contract
    string[] public kryptoBirdz;

    // keep track of minted birds
    mapping(string => bool) _kryptoBirdzExists;

    function mint(string memory _kryptoBird) public {
        require(!_kryptoBirdzExists[_kryptoBird],
        "Error kryptoBird already exists");
        // this deprecated uint256 _id = KrypotBirdz.push(_krypotBird);
        // add minted bird to string array and use its position in the array as the tokenId
        kryptoBirdz.push(_kryptoBird);
        uint _id = kryptoBirdz.length - 1;
        _mint(msg.sender, _id);

        // mark bird as exists
        _kryptoBirdzExists[_kryptoBird] = true;
    }

    constructor() ERC721Connector('KryptoBird','KBIRDZ') {

    }

}