// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SafeMath {
    // build functions to perform safe math operations that would otherwise replace
    // intuitive preventative measure

    // function add r = x + y
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 r = a + b;
        require(r >= a, 'SafeMath: addition overflow');
        return r;
    }

    // function subtract r = x - y
    function subtract(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 r = a - b;
        require(b <= a, 'SafeMath: subtraction overflow');
        return r;
    }

    // function multiply r = x * y
    function multiply(uint256 a, uint256 b) internal pure returns(uint256) {
        // gas optimization
        if(a == 0 || b == 0) {
            return 0;
        } 
        uint256 r = a * b;
        require(r / a == b, 'SafeMath: multiplication overflow');
        return r;
    }

    // function division r = x / y
    function divide(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b > 0, 'SafeMath: division overflow');
        uint256 r = a / b;
        return r;
    }

    // function modulo r = x % y
    function mod(uint256 a, uint256 b) internal pure returns(uint256) {
        require(b != 0, 'SafeMath: modulo overflow');
        return a % b;
    }
}