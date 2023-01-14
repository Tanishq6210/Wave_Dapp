//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract wave {
    uint totalWaves = 0;

    struct Wave {
        string msg;
        address add;
        uint time;
    }

    Wave[] waves;

    event newWave(address indexed from, uint timestamp, string message);
    
    function insertWave(string memory _msg) public {
        totalWaves++;
        Wave memory w = Wave(_msg, msg.sender, block.timestamp);
        waves.push(w);
        emit newWave(msg.sender, block.timestamp, _msg);
    }

    function getTotalWaves() public view returns(uint) {
        return totalWaves;
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }
}