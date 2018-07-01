import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount,  Deadline, TransactionHttp, 
  TransferTransaction, Address, XEM, PlainMessage, AggregateTransaction
} from 'nem2-sdk';
import { accountOne, accountTwo, accountThree, multisigAccount } from './accounts';

const url = 'http://api.beta.catapult.mijin.io:3000';

const amount = XEM.createRelative(10); // 10 xem represent 10 000 000 micro xem

const accountTwoTransferTransaction = TransferTransaction.create(Deadline.create(), accountTwo.address, [amount], PlainMessage.create('payout'), NetworkType.MIJIN_TEST);
const accountThreeTransferTransaction = TransferTransaction.create(Deadline.create(), accountThree.address, [amount], PlainMessage.create('payout'), NetworkType.MIJIN_TEST);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        accountTwoTransferTransaction.toAggregate(accountOne.publicAccount),
        accountThreeTransferTransaction.toAggregate(accountOne.publicAccount)],
    NetworkType.MIJIN_TEST,
    []
);

const transactionHttp = new TransactionHttp(url);

const signedTransaction = accountOne.sign(aggregateTransaction);

transactionHttp.announce(signedTransaction).subscribe(x => console.log(x),
        err => console.error(err));