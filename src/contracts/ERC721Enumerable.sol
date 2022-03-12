// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';

contract ERC721Enumerable is ERC721 {
    // array for all tokens
    uint256[] private _allTokens;
    // inherit mint function to keep track of all tokens
    function totalSupply() external view returns (uint256) {
        return _allTokens.length;
    }

    function tokenByIndex(uint256 _index) external view returns (uint256) {

    }

    function tokenOfOwnerByIndex(address _owner, uint256 _index) external view {

    }

    function _mint(address to, uint256 tokenId) override(ERC721) {
        
    }

}