import * as keepkey from "@thorswap-lib/hdwallet-keepkey";

import { AdapterDelegateProxy } from "./proxies";

export const Adapter = keepkey.Adapter.fromDelegate(AdapterDelegateProxy);
