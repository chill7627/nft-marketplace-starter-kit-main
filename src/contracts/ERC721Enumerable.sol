// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';

contract ERC721Enumerable is ERC721 {
    // array for all tokens
    uint256[] private _allTokens;
    // mapping from tokenId to position in allTokens (index)
    mapping(uint256 => uint256 ) private _allTokensIndex;
    //mapping of owner to list of all owner token ids
    mapping(address => uint256[]) private _ownedTokens;
    //mapping from token ID index to index of the owner tokens list
    mapping(uint256 => uint256 ) private _ownedTokensIndex;

    //function tokenByIndex(uint256 _index) external view returns (uint256) {

    //}

    //function tokenOfOwnerByIndex(address _owner, uint256 _index) external view {

    //}
    // inherit mint fuction to add extra functionality
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        // 1. need to add tokens to the owner
        // 2. add tokens to total supply, to all the tokens in the contract
        // contract can have multiple coins going to multiple owners
        _addTokensToTotalSupply(tokenId);
    }

    function _addTokensToTotalSupply(uint256 tokenId) private {
        _allTokens.push(tokenId);
    }

    function totalSupply() public view returns(uint256) {
        return _allTokens.length;
    }

}