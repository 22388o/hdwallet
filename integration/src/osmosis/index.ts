import * as core from "@thorswap-lib/hdwallet-core";

import { osmosisTests as tests } from "./osmosis";

export function osmosisTests(get: () => { wallet: core.HDWallet; info: core.HDWalletInfo }): void {
  tests(get);
}
