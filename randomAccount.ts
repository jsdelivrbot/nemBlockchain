import { Account, NetworkType } from 'nem2-sdk';

const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
console.log('Your new account address is:', account.address.pretty());
console.log('and its private key', account.privateKey);
console.log('and its public key: ', account.publicKey);
