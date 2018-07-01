import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount, ModifyMultisigAccountTransaction, Deadline, 
  MultisigCosignatoryModification, MultisigCosignatoryModificationType, TransactionHttp, 
  TransferTransaction, Address, XEM, PlainMessage, AccountHttp, TransactionType, Listener,
  MosaicHttp, NamespaceHttp, MosaicService, AggregateTransaction
} from 'nem2-sdk';
import { accountOne, accountTwo, accountThree, multisigAccount, ticketDistributor } from './accounts';

const url = 'http://api.beta.catapult.mijin.io:3000';

const accountHttp = new AccountHttp(url);
const transactionHttp = new TransactionHttp(url);

/////////////////////////// TOTAL XEM IN AN ACCOUNT ///////////////

const mosaicHttp = new MosaicHttp(url);
const namespaceHttp = new NamespaceHttp(url);

const mosaicService = new MosaicService(accountHttp, mosaicHttp, namespaceHttp);

mosaicService.mosaicsAmountViewFromAddress(accountOne.address)
    .flatMap((_) => _)
    .subscribe(
        mosaic => console.log('Account one has', mosaic.relativeAmount(), mosaic.fullName()),
        err => console.error(err)
    );

mosaicService.mosaicsAmountViewFromAddress(accountTwo.address)
    .flatMap((_) => _)
    .subscribe(
        mosaic => console.log('Account two has', mosaic.relativeAmount(), mosaic.fullName()),
        err => console.error(err)
    );

mosaicService.mosaicsAmountViewFromAddress(accountThree.address)
    .flatMap((_) => _)
    .subscribe(
        mosaic => console.log('Account three has', mosaic.relativeAmount(), mosaic.fullName()),
        err => console.error(err)
    );

mosaicService.mosaicsAmountViewFromAddress(multisigAccount.address)
    .flatMap((_) => _)
    .subscribe(
        mosaic => console.log('Multisig account has', mosaic.relativeAmount(), mosaic.fullName()),
        err => console.error(err)
    );

/////////////////////////////////////////////////////////////////////
/*
const listener = new Listener('http://api.beta.catapult.mijin.io:3000');

listener.open().then(() => {

    listener.newBlock().subscribe(
        block => console.log(block),
        err => console.error(err)
    );

});

const set = Observable.create (function (observer) {
    const accountHttp = new AccountHttp('http://api.beta.catapult.mijin.io:3000');
    const interval = setInterval (() => {
        observer.next(
            accountHttp
                .outgoingTransactions(accountOne)
                .flatMap((_) => _) // Transform transaction array to single transactions to process them
                .filter((_) => _.type === TransactionType.TRANSFER) // Filter transfer transactions
                .map((_) => _ as TransferTransaction) // Map transaction as transfer transaction
                .filter((_) => _.recipient.equals(accountTwo.address)) // Filter transactions from to account
                .filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(XEM.MOSAIC_ID)) // Filter xem transactions
                .map((_) => _.mosaics[0].amount.compact() / Math.pow(10, XEM.DIVISIBILITY)) // Map only amount in xem
                .toArray() // Add all mosaics amounts into one array
                .map((_) => _.reduce((a, b) => a + b, 0))
                .subscribe(
                    total => console.log('Total xem send to account', accountTwo.address.pretty(), 'is:', total),
                    err => console.error(err)
                );
            accountHttp
                .outgoingTransactions(accountTwo)
                .flatMap((_) => _) // Transform transaction array to single transactions to process them
                .filter((_) => _.type === TransactionType.TRANSFER) // Filter transfer transactions
                .map((_) => _ as TransferTransaction) // Map transaction as transfer transaction
                .filter((_) => _.recipient.equals(accountOne.address)) // Filter transactions from to account
                .filter((_) => _.mosaics.length === 1 && _.mosaics[0].id.equals(XEM.MOSAIC_ID)) // Filter xem transactions
                .map((_) => _.mosaics[0].amount.compact() / Math.pow(10, XEM.DIVISIBILITY)) // Map only amount in xem
                .toArray() // Add all mosaics amounts into one array
                .map((_) => _.reduce((a, b) => a + b, 0))
                .subscribe(
                    total => console.log('Total xem send to account', accountOne.address.pretty(), 'is:', total),
                    err => console.error(err)
                );
        );
    }, 1000);
    
    return () => clearInterval(interval);
});

let subscribe = set.subscribe (val => console.log(val));

setTimeout (() => {
    subscribe.complete();
  }, 20000);

const convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            publicAccountOne,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            publicAccountTwo,
        )],
    NetworkType.MIJIN_TEST
  );

const signedMultisigTransaction = multisigAccount.sign(convertIntoMultisigTransaction);
*/