// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserToken is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(bytes32 => bool) public mintedHashes;

    constructor() ERC721("UserToken", "USRT") {}

    function mint(address to, bytes32 userHash) external onlyOwner {
        require(!mintedHashes[userHash], "Token already minted for this user");
        mintedHashes[userHash] = true;
        _safeMint(to, nextTokenId);
        nextTokenId++;
    }
}
