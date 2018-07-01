import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount,  Deadline, TransferTransaction, 
    Address, XEM, PlainMessage, MosaicService, AggregateTransaction, Mosaic, 
    MosaicId, UInt64, Listener, TransactionHttp, LockFundsTransaction
} from 'nem2-sdk';
import { accountOne, accountTwo, accountThree, multisigAccount, ticketDistributor } from './accounts';

const url = 'http://api.beta.catapult.mijin.io:3000';

const aliceToTicketDistributorTx = TransferTransaction.create(
    Deadline.create(),
    ticketDistributor.address,
    [XEM.createRelative(100)],
    PlainMessage.create('send 100 nem:xem to distributor'),
    NetworkType.MIJIN_TEST,
);

const ticketDistributorToAliceTx = TransferTransaction.create(
    Deadline.create(),
    accountOne.address,
    [new Mosaic( new MosaicId('museum:ticket'), UInt64.fromUint(1))],
    PlainMessage.create('send 1 museum:ticket to alice'),
    NetworkType.MIJIN_TEST,
);

const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [
        aliceToTicketDistributorTx.toAggregate(accountOne.publicAccount),
        ticketDistributorToAliceTx.toAggregate(ticketDistributor.publicAccount),
    ],
    NetworkType.MIJIN_TEST);


const signedTransaction = accountOne.sign(aggregateTransaction);

// Creating the lock funds transaction

const lockFundsTransaction = LockFundsTransaction.create(
    Deadline.create(),
    XEM.createRelative(10),
    UInt64.fromUint(480),
    signedTransaction,
    NetworkType.MIJIN_TEST);

const lockFundsTransactionSigned = accountOne.sign(lockFundsTransaction);

const transactionHttp = new TransactionHttp(url);

// announce signed transaction
const listener = new Listener(url);

listener.open().then(() => {

    transactionHttp.announce(lockFundsTransactionSigned).subscribe(x => console.log(x),
        err => console.error(err));

    listener.confirmed(accountOne.address)
        .filter((transaction) => transaction.transactionInfo !== undefined
            && transaction.transactionInfo.hash === lockFundsTransactionSigned.hash)
        .flatMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction))
        .subscribe(announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err));
});
