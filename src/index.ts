import * as dotenv from 'dotenv';
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

// 秘密鍵を環境変数からimportする
dotenv.config();

const {
  PRIVATE_KEY
} = process.env;

/**
 * create SignProtocol client instance
 */
const createSignProtocolClient = () => {
  return new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    account: privateKeyToAccount(PRIVATE_KEY as `0x${string}`), // Optional, depending on environment
  });
}

/**
 * メインスクリプト
 */
const main = async() => {
    console.log(" ########################################### [START] ###########################################")

    // create client
    const client = createSignProtocolClient();

    // create schema
    const res = await client.createSchema({
      name: "SDK Test",
      data: [
        { name: "contractDetails", type: "string" },
        { name: "signer", type: "address" },
      ],
    });

    console.log("creacte schema res:::", res);

    console.log(" ########################################### [END] ###########################################")
}

main()