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

    function tokenByIndex(uint256 _index) public view returns (uint256) {
        // make sure index is less than length of total supply
        require(_index < totalSupply(), "Error, global index out of bounds.");
        return _allTokens[_index];
    }

    function tokenOfOwnerByIndex(address _owner, uint256 _index) public view returns(uint256) {
        require(balanceOf(_owner) > _index, "Error, owner index is out of bounds.");
        return _ownedTokens[_owner][_index];
    }

    // inherit mint fuction to add extra functionality
    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        // 1. need to add tokens to the owner
        // 2. add tokens to total supply, to all the tokens in the contract
        // contract can have multiple coins going to multiple owners
        _addTokensToAllTokenEnumeration(tokenId);
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    // add tokens to the _alltokens array and set the position of the token id in all tokens index array
    function _addTokensToAllTokenEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);    
    }

    // add address and tokenId to owner mapping of _ownedTokens
    // ownedTokensIndex tokenId set to the address of ownedTokens position
    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    // return the total supply of the all tokens array
    function totalSupply() public view returns(uint256) {
        return _allTokens.length;
    }

}