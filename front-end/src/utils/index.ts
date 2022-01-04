import { hexToU8a, isHex } from '@polkadot/util'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'

export const validNumber = (number: string): boolean => {
  if (!number) {
    return true
  }

  const numReg = /^[0-9]*(\.)?[0-9]*$/

  if (numReg.test(number)) {
    if (Number(number) > 0) {
      return true
    }
  }

  if (/-/.test(number)) {
    return false
  }

  return false
}

export const isValidAddressPolkadotAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))

    return true
  } catch (error) {
    return false
  }
}


export const formatLongString = (address: string, places = 12): string => {
  if (!address) return '';
  const len = address.length;
  const start = address.substring(0, places);
  const end = address.substring(len - places, len);

  return `${start}...${end}`;
};


export function openUrl(url:string) {
  const newTab: Window = window.open() as Window;
  newTab.opener = null;
  newTab.location = url;
}