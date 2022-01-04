import { HDWallet, HDWalletInfo } from "@thorswap-lib/hdwallet-core";

import { eosTests as tests } from "./eos";

export function eosTests(get: () => { wallet: HDWallet; info: HDWalletInfo }): void {
  tests(get);
}
