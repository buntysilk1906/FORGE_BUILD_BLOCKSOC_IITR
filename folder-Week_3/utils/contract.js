import { ethers } from "ethers";
import { AmmAddress, AmmAbi, TokenAAddress, TokenBAddress, TokenAbi } from "../connect/constant";

export default async function GetContracts(signer) {
    const Amm = new ethers.Contract(AmmAddress, AmmAbi, signer);
    const tokenA = new ethers.Contract(TokenAAddress, TokenAbi, signer);
    const tokenB = new ethers.Contract(TokenBAddress, TokenAbi, signer);
    return { Amm, tokenA, tokenB };
}
