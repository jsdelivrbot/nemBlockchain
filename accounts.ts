import { Account, NetworkType } from 'nem2-sdk';

const accountOneAddress = 'SBU4IY-4VRGWH-QKX4RA-WZ2YLP-TPZPBZ-ISJGZZ-2MIW';
const accountOnePrivateKey = '8104FEDFE6E6325E69C5980EF597416EECE697E62D6CFEC56F67495BD80B1DBC';
const accountOnePublicKey = '100598FFC44C7FBAA33DED8576E68A29904C20DAF909D02ED98F02A72A097730';

export const accountOne = Account.createFromPrivateKey(accountOnePrivateKey, NetworkType.MIJIN_TEST);


const accountTwoAddress = 'SDX7ZU-TAY6YZ-DVGKUV-2OWK3V-U7ZBQ6-AU6MBD-YHOY';
const accountTwoPrivateKey = 'B9E2BB1A9B8272CC1324FE8EE5FD8460A9C25F07049C654B60CA462A969D8E0F';
const accountTwoPublicKey = '0EB6AA3E074F91A24D6A2B1E689BC88C883DF25C26AD98D193734A628D97338C';

export const accountTwo = Account.createFromPrivateKey(accountTwoPrivateKey, NetworkType.MIJIN_TEST);


const multisigAccountAddress = 'SC3G2E-T3ZSEC-6VR5PY-4EIAYI-7UZSEJ-UTGELQ-OI45';
const multisigAccountPrivateKey = '435FA6273307AD97128CD08507DB7458144478FB626472C2CAB9E9AE9ABA2CCF';
const multisigAccountPublicKey = 'CC5FB7C47447850E428EDDBA0105FBBF00DE932E8AD97B75BC5A53E68DC8B651';

export const multisigAccount = Account.createFromPrivateKey(multisigAccountPrivateKey, NetworkType.MIJIN_TEST);


const accountThreeAddress = 'SAHSFC-MP5IFR-IH3BYD-R3XPQ3-VZX6IV-SFFGYF-XBYL';
const accountThreePrivateKey = '477665C56AB71A0ACDA7B7563A6B5CE63EF21A14BCA7C96842E0FC35C94AA9A9';
const accountThreePublicKey = 'A08D0FE092A6F78711B72E63ECD1FF6FC5937C4DF77804A3ABBCCC651E72F840';

export const accountThree = Account.createFromPrivateKey(accountThreePrivateKey, NetworkType.MIJIN_TEST);

const ticketDistributorAddress = 'SDUW26-4AQO7Y-JBBJDZ-WGU2VX-6OEXL4-QEJLI6-HMTW';
const ticketDistributorPrivateKey = 'A5ABA02104D47B7E0A4D018E99B489D871B168638A2CD54CD0A68A27260152FC';
const ticketDistributorPublicKey = '05F3BA9D73F161519CFCB5BD3AD817284EBEADD716F174E934EEAE98E3FD0A31';

export const ticketDistributor = Account.createFromPrivateKey(ticketDistributorPrivateKey, NetworkType.MIJIN_TEST);

/*
console.log('account one address is:', accountOne.address.pretty(), 'and its public key', accountOne.publicKey);
console.log('account two address is:', accountTwo.address.pretty(), 'and its public key', accountTwo.publicKey);
console.log('account three address is:', accountThree.address.pretty(), 'and its public key', accountThree.publicKey);
console.log('multisig account address is:', multisigAccount.address.pretty(), 'and its public key', multisigAccount.publicKey);
*/
