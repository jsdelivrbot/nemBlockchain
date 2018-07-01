import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount, Deadline,
    TransactionHttp, TransferTransaction, Address, XEM, PlainMessage
} from 'nem2-sdk';
import {accountOne, accountTwo, accountThree, multisigAccount} from './accounts'

const url = 'http://api.beta.catapult.mijin.io:3000';

const transactionHttp = new TransactionHttp(url);

//////////////////////// TRANSACTION ////////////////////////

const transferTransaction = TransferTransaction.create(
  Deadline.create(),
  Address.createFromRawAddress(accountOne.address.pretty()),
  [XEM.createRelative(10)],
  PlainMessage.create('Welcome To NEM'),
  NetworkType.MIJIN_TEST,
);

const signedTransaction = accountTwo.sign(transferTransaction);

transactionHttp.announce(signedTransaction).subscribe(x => console.log(x), err => console.error(err));

