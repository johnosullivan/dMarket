pragma solidity ^0.4.16;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

// "40 E Oak Street Chicago IL 60611",2,[100,200],[1,2],["0x821aEa9a577a9b44299B9c15c88cf3087F3b5544","0x0d1d4e623D10F9FBA5Db95830F7d3839406C6AF2"],"BUBDJKDNKNDKSMJWKENK987-ZSXKMJDDKNKXSJNKXJNSNKSX-"

contract OrderManager {

    function OrderManager() public { }

    address[] orders;

    event CreateOrder(address order, address buyer, address[] sellers);

    function createOrder(
        string _shippingaddress, uint _ordersize,
        uint[] _cost, uint[] _quantity, address[] _addresses,
        string _productIDs
    ) public {
        address order = new Order(_shippingaddress, _ordersize, _cost, _quantity, _addresses, _productIDs);
        orders.push(order);
        CreateOrder(order,msg.sender,_addresses);
    }

}

contract OwnerShip {
    // The customer who is creating the order
    address public buyer = msg.sender;
    // The mapping of the sellers who are allowed to access this order
    mapping (address => bool) public sellers;
    // Modifier for the onlybuyer functions
    modifier onlyBuyer { require(msg.sender == buyer); _; }
    // Modifier for the onlyseller functions
    modifier onlySeller { require(sellers[msg.sender]); _; }
    // A conditional modifier for the methods
    modifier condition(bool _condition) { require(_condition); _; }
    // To transfer ordership of order to different address
    function transferOrderOwnership(address newBuyer) onlyBuyer public { buyer = newBuyer; }
}

contract Order is OwnerShip {
    // Using the import string library for spliting product ids
    using strings for *;
    // Status codes for the ownership contract
    enum StatusCodes { NULL, SUCCESS, ERROR, NOT_FOUND, PENDING, PROCESSING, PROCESSED, SHIPPED, DELIVERED, INSUFFICIENT_BALANCE }
    // OrderItem struct
    struct OrderItem {
        string productID;
        uint costs;
        uint quantity;
        address seller;
        StatusCodes status;
    }
    // All the orders items
    OrderItem[] public items;
    uint public ordersize;
    // Where the items should be sent
    string public shippingaddress;
    // Public constructor
    function Order (
        string _shippingaddress, uint _ordersize,
        uint[] _cost, uint[] _quantity, address[] _addresses,
        string _productIDs
    ) public {
        // Sets the order details
        shippingaddress = _shippingaddress;
        ordersize = _ordersize;
        // Split the array for products
        var s = _productIDs.toSlice();
        var osize = "-".toSlice();
        var products = new string[](s.count(osize));
        // Adds orderitems to struct array
        for(uint x = 0; x < products.length; x++) {
            address the_seller = _addresses[x];
            items.push(OrderItem({
                productID:s.split(osize).toString(), costs:_cost[x],
                quantity:_quantity[x], seller:the_seller,
                status: StatusCodes.PROCESSED
            }));
            sellers[the_seller] = true;
        }
    }

    function setSeller(address _seller, bool _bool) onlyBuyer public {
        sellers[_seller] = _bool;
    }

    function isMyOrder() onlyBuyer public constant returns (bool res) {
        return true;
    }

    function hasProduct() onlySeller public constant returns (bool status) {
        return sellers[msg.sender];
    }
}
