import * as keepkey from "@thorswap-lib/hdwallet-keepkey";

import { TransportDelegate } from "./transport";
import { VENDOR_ID, WEBUSB_PRODUCT_ID, HID_PRODUCT_ID, assertChromeUSB, chromeUSB, makePromise } from "./utils";

type Device = USBDevice & {serialNumber: string};

export const ChromeUSBAdapterDelegate = {
  async getTransportDelegate(device: Device) {
    return await TransportDelegate.create(device);
  },
  async getDevices(): Promise<Device[]> {
    assertChromeUSB(chromeUSB);
    const devices = (await makePromise(chromeUSB.getDevices, {
      filters: [
        {
          vendorId: VENDOR_ID,
          productId: WEBUSB_PRODUCT_ID,
        },
        {
          vendorId: VENDOR_ID,
          productId: HID_PRODUCT_ID,
        },
      ],
    })) as USBDevice[];
    return devices.filter((d) => d.serialNumber !== undefined) as Device[];
  },
  registerCallbacks(
    handleConnect: (device: Device) => void,
    handleDisconnect: (device: Device) => void
  ) {
    assertChromeUSB(chromeUSB);
    chromeUSB.onDeviceAdded.addListener(handleConnect);
    chromeUSB.onDeviceRemoved.addListener(handleDisconnect);
  }
};

export const Adapter = keepkey.Adapter.fromDelegate(ChromeUSBAdapterDelegate);
export const ChromeUSBAdapter = Adapter;
