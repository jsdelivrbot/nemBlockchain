import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, Deadline, 
    TransactionHttp, AggregateTransaction, MosaicDefinitionTransaction,
    MosaicProperties, UInt64, MosaicSupplyChangeTransaction, MosaicSupplyType
} from 'nem2-sdk';
import { accountOne, accountTwo, accountThree, multisigAccount } from './accounts';

const url = 'http://api.beta.catapult.mijin.io:3000';

const namespace = 'foo';
const mosaic = 'token';

const mosaicDefinitionTransaction = MosaicDefinitionTransaction.create(
    Deadline.create(),
    mosaic,
    namespace,
    MosaicProperties.create({
        supplyMutable: true,
        transferable: true,
        levyMutable: false,
        divisibility: 0,
        duration: UInt64.fromUint(1000),
    }),
    NetworkType.MIJIN_TEST,
);

const mosaicSupplyChangeTransaction = MosaicSupplyChangeTransaction.create(
    Deadline.create(),
    mosaicDefinitionTransaction.mosaicId,
    MosaicSupplyType.Increase,
    UInt64.fromUint(1000000),
    NetworkType.MIJIN_TEST,
);

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        mosaicDefinitionTransaction.toAggregate(accountOne.publicAccount),
        mosaicSupplyChangeTransaction.toAggregate(accountOne.publicAccount),
    ],
    NetworkType.MIJIN_TEST,
    []
);

const signedTransaction = accountOne.sign(aggregateTransaction);

const transactionHttp = new TransactionHttp(url);

transactionHttp.announce(signedTransaction).subscribe(
    x=> console.log(x),
    err => console.error(err)
);