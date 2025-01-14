import * as keepkey from "@thorswap-lib/hdwallet-keepkey";
import * as webusb from "webusb";

import { Device, TransportDelegate } from "./transport";
import { VENDOR_ID, WEBUSB_PRODUCT_ID, HID_PRODUCT_ID } from "./utils";

export const NodeWebUSBAdapterDelegate = {
  async getDevices(): Promise<Device[]> {
    const devices = (await webusb.usb.getDevices()).filter((d) => d.serialNumber !== undefined) as Device[];
    return devices.filter(
      (x) => x.vendorId === VENDOR_ID && [WEBUSB_PRODUCT_ID, HID_PRODUCT_ID].includes(x.productId)
    );
  },
  async getDevice(serialNumber?: string): Promise<Device> {
    const out = await webusb.usb.requestDevice({
      filters: [
        { vendorId: VENDOR_ID, productId: WEBUSB_PRODUCT_ID, serialNumber },
        { vendorId: VENDOR_ID, productId: HID_PRODUCT_ID, serialNumber },
      ],
    });
    if (out.serialNumber === undefined) throw new Error("expected serial number");
    return out as Device;
  },
  async getTransportDelegate(device: Device) {
    return new TransportDelegate(device);
  },
};

export const Adapter = keepkey.Adapter.fromDelegate(NodeWebUSBAdapterDelegate);
export const NodeWebUSBKeepKeyAdapter = Adapter;
