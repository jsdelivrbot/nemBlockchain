import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount, ModifyMultisigAccountTransaction, Deadline, 
  MultisigCosignatoryModification, MultisigCosignatoryModificationType, TransactionHttp, 
  TransferTransaction, Address, XEM, PlainMessage, AccountHttp, TransactionType, Listener,
  MosaicHttp, NamespaceHttp, MosaicService, AggregateTransaction
} from 'nem2-sdk';
import {accountOne, accountTwo, accountThree, multisigAccount} from './accounts'

const url = 'http://api.beta.catapult.mijin.io:3000';

const accountHttp = new AccountHttp(url);
const transactionHttp = new TransactionHttp(url);

//////////////////////// MULTISIG //////////////////////////

const convertIntoMultisigTransaction = ModifyMultisigAccountTransaction.create(
    Deadline.create(),
    1,
    1,
    [
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            accountOne.publicAccount,
        ),
        new MultisigCosignatoryModification(
            MultisigCosignatoryModificationType.Add,
            accountTwo.publicAccount,
        )],
    NetworkType.MIJIN_TEST
);

const signedTransaction = multisigAccount.sign(convertIntoMultisigTransaction);

transactionHttp.announce(signedTransaction).subscribe(
    x => console.log(x),
    err => console.error(err)
);

accountHttp.getMultisigAccountInfo(Address.createFromRawAddress(multisigAccount.address.pretty())).subscribe(
    accountInfo => console.log(accountInfo),
    err => console.error(err)
);
