// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    // Address of person who created the contract
    address public manager; 
    // Addresses of players
    address[] public players;
    
    constructor() {
        manager = msg.sender; 
    }
    
    function enter() public payable {
        // Check that minimum amount is sent
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        // Hash three elements and parse to uint
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
    }   
    
    function pickWinner() public restricted payable {
        // Pseudorandom an index to pick a winner
        uint index = random() % players.length;
        // Check that the contract has a balance
        assert(address(this).balance > 0);
        // Send money to winner
        payable (players[index]).transfer(address(this).balance);
        // Reset the players array
        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[] memory) {
        return players; 
    }
}