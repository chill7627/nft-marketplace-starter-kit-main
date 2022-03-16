// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
    building out a mint function
       a. nft to point to an address
       b. keep track of the token ids
       c. keep track of token owner addresses to token ids
       d. keep track of how many tokens an owner address has
       e. emit and keep track of logged info
        create an event that emits a transfer log -contract addres, 
        where it is being minted to, the id
*/

contract ERC721 {

    // events for logging purposes
    event Transfer(address indexed from,
                   address indexed to, 
                   uint256 indexed tokenId);

    // mapping from token id to owner
    mapping(uint256 => address) private _tokenOwner;
    // mapping from owner to number of owned tokens
    mapping(address => uint256) private _ownedTokens;
    // tokens sent over need to keep track of approval process, tokenId to address
    mapping(uint256 => address) private _tokenApprovals;

    // balance of function to get balance return number of tokens owned by an owner
    function balanceOf(address _owner) public view returns(uint256) {
        require(_owner != address(0), "Error, query on nonexistent address");
        return _ownedTokens[_owner];
    }

    // owner of function returns the owner of an NFT token id
    function ownerOf(uint256 _tokenId) external view returns (address) {
        require(_exists(_tokenId), "Error, owner query for nonexistent token");
        address owner = _tokenOwner[_tokenId];
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns(bool) {
        // try to access owner of token and if exists returns true, not false
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        // require the address is not blank
        require(to != address(0), "ERC721: minting to zero address");
        // require that token hasn't been minted already
        require(!_exists(tokenId), "ERC721: token already minted");
        // add address to owner of token id
        _tokenOwner[tokenId] = to;
        // add 1 to owned token counts for address
        _ownedTokens[to] += 1;

        // emit transfer event
        emit Transfer(address(0), to, tokenId);
    }

    // function to transefer a token from sender to receiver 
    function _transferFrom(address _from, address _to, uint256 _tokenId) internal {
        require(_to != address(0), "Error, ERC721 transfer to the zero address.");
        require(_from == _tokenOwner[_tokenId], "Error, sending address does not own token!");
        // change _tokenOwner fo _tokenId to the new _to address
        _tokenOwner[_tokenId] = _to;
        // remove one owned token from the from ownedtokens count
        _ownedTokens[_from]--;
        // add one owned token to the to ownedtokens count
        _ownedTokens[_to]++;

        // emit transfer emit
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        _transferFrom(_from, _to, _tokenId);
    }
    
}