
export function genConnectId () {
  return `@@${Math.random().toString(36).substr(2, 9)}@@`;
}

export function checkConnectId (str) {
  return /^@@[0-9,a-z,A_Z]{9}@@[0-9,a-z,A-Z]+/.test(str);
}

export function removeConnectId (str) {
  const matches = str.match(/^@@[0-9,a-z,A-Z]{9}@@([0-9,a-z,A-Z]+)/);
  return matches[1];
}
