import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount, Deadline, TransactionHttp, 
    NamespaceHttp, NamespaceId, RegisterNamespaceTransaction, UInt64
} from 'nem2-sdk';
import {accountOne, accountTwo, accountThree, multisigAccount} from './accounts'

const url = 'http://api.beta.catapult.mijin.io:3000';

const namespaceHttp = new NamespaceHttp(url);
/*
const nameSpace = new NamespaceId('9azrvslr');

namespaceHttp.getNamespace(nameSpace).subscribe(
    namespace => console.log(namespace),
    err => console.error(err)
);
*/
const namespace = "9azrvslr";

const registerNamespaceTransaction = RegisterNamespaceTransaction.createRootNamespace(
    Deadline.create(),
    namespace, // use your own namespace name
    UInt64.fromUint(1000),
    NetworkType.MIJIN_TEST,
);

const signedTransaction = accountOne.sign(registerNamespaceTransaction);

const transactionHttp = new TransactionHttp(url);

transactionHttp.announce(signedTransaction).subscribe(
    x => console.log(x),
    err => console.error(err)
);
