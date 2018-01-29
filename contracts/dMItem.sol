pragma solidity ^0.4.16;

contract dMItem {

    address private owner;
    string public itemName;
    string public itemDescription;
    uint256 public price;

    string[] images;

    function dMItem(
        string _itemName,
        string _itemDescription,
        uint256 _price
    ) public {
        owner = msg.sender;
        itemName = _itemName;
        itemDescription = _itemDescription;
        price = _price;
    }

    function getOwner() public constant returns (address) {
       return (owner);
    }

    function getDetails() public constant returns
       (address, string, string, uint256)
    {
       return (owner, itemName, itemDescription, price);
    }



}
