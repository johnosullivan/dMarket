pragma solidity ^0.4.16;

contract dMUsers {

  struct UserStruct {
    bytes32 userEmail;
    bytes32 firstName;
    bytes32 lastName;
    uint index;
  }

  mapping(address => UserStruct) private userStructs;
  address[] private userIndex;

  function isUser(address userAddress)
    public
    constant
    returns(bool isIndeed)
  {
    if(userIndex.length == 0) return false;
    return (userIndex[userStructs[userAddress].index] == userAddress);
  }

  function insertUser(
    address userAddress,
    bytes32 userEmail,
    bytes32 firstName,
    bytes32 lastName)
    public
    returns(uint index)
  {
    require(!isUser(userAddress));
    userStructs[userAddress].userEmail = userEmail;
    userStructs[userAddress].firstName = firstName;
    userStructs[userAddress].lastName  = lastName;
    userStructs[userAddress].index     = userIndex.push(userAddress)-1;
    return userIndex.length-1;
  }

  function bytes32ToString(bytes32 s) internal pure returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = s[j];
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
}

  function getUser(address userAddress)
    public
    constant
    returns(string userEmail, string firstName, string lastName, uint index)
  {
    require(isUser(userAddress));
    return(
      bytes32ToString(userStructs[userAddress].userEmail),
      bytes32ToString(userStructs[userAddress].firstName),
      bytes32ToString(userStructs[userAddress].lastName),
      userStructs[userAddress].index);
  }

  function updateUser(address userAddress, bytes32 userEmail, bytes32 firstName, bytes32 lastName)
    public
    returns(bool success)
  {
    require(isUser(userAddress));
    userStructs[userAddress].userEmail = userEmail;
    userStructs[userAddress].firstName = firstName;
    userStructs[userAddress].lastName = lastName;
    return true;
  }

  function getUserCount()
    public
    constant
    returns(uint count)
  {
    return userIndex.length;
  }

  function getUserAtIndex(uint index)
    public
    constant
    returns(address userAddress)
  {
    return userIndex[index];
  }

}
