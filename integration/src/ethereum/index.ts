import * as core from "@thorswap-lib/hdwallet-core";

import { ethereumTests } from "./ethereum";

export function ethTests(get: () => { wallet: core.HDWallet; info: core.HDWalletInfo }): void {
  ethereumTests(get);
}
