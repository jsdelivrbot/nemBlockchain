import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount, TransferTransaction, Address, 
    XEM, AccountHttp, TransactionType, AggregateTransaction
} from 'nem2-sdk';
import {accountOne, accountTwo, accountThree, multisigAccount} from './accounts'

const url = 'http://api.beta.catapult.mijin.io:3000';

const accountHttp = new AccountHttp(url);

/////////////////////////// TOTAL XEM SENT TO AN ACCOUNT ///////////////

accountHttp
    .outgoingTransactions(accountOne.publicAccount)
    .flatMap((_) => _) // Transform transaction array to single transactions to process them
    .filter((_) => _.type === TransactionType.TRANSFER) // Filter transfer transactions
    .map((_) => _ as TransferTransaction) // Map transaction as transfer transaction
    .filter((_) => _.recipient.equals(accountTwo.address)) // Filter transactions from to account
    .filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(XEM.MOSAIC_ID)) // Filter xem transactions
    .map((_) => _.mosaics[0].amount.compact() / Math.pow(10, XEM.DIVISIBILITY)) // Map only amount in xem
    .toArray() // Add all mosaics amounts into one array
    .map((_) => _.reduce((a, b) => a + b, 0))
    .subscribe(
        total => console.log('Total xem send to account two', accountTwo.address.pretty(), 'is:', total),
        err => console.error(err)
    );


accountHttp
    .outgoingTransactions(accountTwo.publicAccount)
    .flatMap((_) => _) // Transform transaction array to single transactions to process them
    .filter((_) => _.type === TransactionType.TRANSFER) // Filter transfer transactions
    .map((_) => _ as TransferTransaction) // Map transaction as transfer transaction
    .filter((_) => _.recipient.equals(accountOne.address)) // Filter transactions from to account
    .filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(XEM.MOSAIC_ID)) // Filter xem transactions
    .map((_) => _.mosaics[0].amount.compact() / Math.pow(10, XEM.DIVISIBILITY)) // Map only amount in xem
    .toArray() // Add all mosaics amounts into one array
    .map((_) => _.reduce((a, b) => a + b, 0))
    .subscribe(
        total => console.log('Total xem send to account one', accountOne.address.pretty(), 'is:', total),
        err => console.error(err)
    );


accountHttp
    .outgoingTransactions(accountThree.publicAccount)
    .flatMap((_) => _) // Transform transaction array to single transactions to process them
    .filter((_) => _.type === TransactionType.TRANSFER) // Filter transfer transactions
    .map((_) => _ as TransferTransaction) // Map transaction as transfer transaction
    .filter((_) => _.recipient.equals(accountOne.address)) // Filter transactions from to account
    .filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(XEM.MOSAIC_ID)) // Filter xem transactions
    .map((_) => _.mosaics[0].amount.compact() / Math.pow(10, XEM.DIVISIBILITY)) // Map only amount in xem
    .toArray() // Add all mosaics amounts into one array
    .map((_) => _.reduce((a, b) => a + b, 0))
    .subscribe(
        total => console.log('Total xem send to account three', accountThree.address.pretty(), 'is:', total),
        err => console.error(err)
    );


accountHttp
    .outgoingTransactions(multisigAccount.publicAccount)
    .flatMap((_) => _) // Transform transaction array to single transactions to process them
    .filter((_) => _.type === TransactionType.TRANSFER) // Filter transfer transactions
    .map((_) => _ as TransferTransaction) // Map transaction as transfer transaction
    .filter((_) => _.recipient.equals(accountOne.address)) // Filter transactions from to account
    .filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(XEM.MOSAIC_ID)) // Filter xem transactions
    .map((_) => _.mosaics[0].amount.compact() / Math.pow(10, XEM.DIVISIBILITY)) // Map only amount in xem
    .toArray() // Add all mosaics amounts into one array
    .map((_) => _.reduce((a, b) => a + b, 0))
    .subscribe(
        total => console.log('Total xem send to multisig account', multisigAccount.address.pretty(), 'is:', total),
        err => console.error(err)
    );

