pragma solidity ^0.4.16;

contract Owned {
  address owner;
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  function Owned() public { owner = msg.sender; }
}

contract Listing is Owned {

    event AddedListing(address paddress, string ipfshash);
    event DeactiveListing(address paddress, string ipfshash);

    mapping(address => string[]) public hashes;

    function listItem(string hash) public {
        hashes[msg.sender].push(hash);
        AddedListing(msg.sender,hash);
    }

    function removeItem(string hash) public {
        DeactiveListing(msg.sender,hash);
    }

}
