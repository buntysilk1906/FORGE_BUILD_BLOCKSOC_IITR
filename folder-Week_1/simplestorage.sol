// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract simplestorage {
    uint256 public favoriten;

    //automatically setted by Internal and its not metioned but favourite number is by default storage
    mapping(string => uint256) public nameto;

    function store(uint256 _guess) public {
        favoriten = _guess;
    }

    struct people {
        uint256 favoritenumber;
        string name;
    }
    people[] public p1;

    //0xd9145CCE52D386f254917e481eB44e9943F39138
    //view , pure don't modify the state of the blockchain
    function retrieve() public view returns (uint256) {
        return favoriten;
    }

    //calldata(A read-only, non-modifiable, temporary area where function arguments of external calls are stored.)
    //,memory(temporary memory) , storage(The permanent, persistent storage of a smart contract. Data stored here is written to the blockchain.)
    function data(string memory _name, uint256 _favouritenumber) public {
        //uint will live on memory
        p1.push(people(_favouritenumber, _name));
        nameto[_name] = _favouritenumber;
    }

    function NameToNumber(string memory _name) public view returns (uint256) {
        uint256 corresponding_number = nameto[_name];
        return corresponding_number;
    }
}
