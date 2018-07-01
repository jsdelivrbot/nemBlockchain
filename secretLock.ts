import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subscriber } from 'rxjs/Subscriber';
import { Account, NetworkType, PublicAccount, ModifyMultisigAccountTransaction, Deadline, 
  MultisigCosignatoryModification, MultisigCosignatoryModificationType, TransactionHttp, 
  TransferTransaction, Address, XEM, PlainMessage, AccountHttp, TransactionType, Listener,
  MosaicHttp, NamespaceHttp, MosaicService, AggregateTransaction, SecretLockTransaction, UInt64,
  Mosaic, HashType, MosaicId, SecretProofTransaction
} from 'nem2-sdk';
import { accountOne, accountTwo, accountThree, multisigAccount, ticketDistributor } from './accounts';

const url = 'http://api.beta.catapult.mijin.io:3000';

// Alice is a PUBLIC net user
const alicePrivateKey = accountOne.privateKey
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, NetworkType.MAIN_NET);

// Alice picks a random number and hashes it.
const random = crypto.randomBytes(10);
const hash = sha3_512.create();
const secret = hash.update(random).hex().toUpperCase();
const proof = random.toString('hex');

// Alice creates creates TX1 SecretLockTransaction{ H(x), B, MosaicId, Amount, valid for 96h }
const tx1 = SecretLockTransaction.create(
    Deadline.create(),
    new Mosaic(new MosaicId('alice:token'), UInt64.fromUint(10)),
    UInt64.fromUint(96*60), //assume one block per minute
    HashType.SHA3_512,
    secret,
    Address.createFromRawAddress('SDG4WG-FS7EQJ-KFQKXM-4IUCQG-PXUW5H-DJVIJB-OXJG'),
    NetworkType.MAIN_NET
);

// Alice sends TX1 to network (PUBLIC)
const tx1Signed = aliceAccount.sign(tx1);
const transactionHttp = new TransactionHttp(url);
transactionHttp.announce(tx1Signed).subscribe(
    x => console.log(x),
    err => console.error(err)
);

// Bob is a PRIVATE network user
const bobPrivateKey = accountTwo.privateKey
const bobAccount = Account.createFromPrivateKey(bobPrivateKey, NetworkType.MIJIN);


// B creates TX2 SecretLockTransaction{ H(x), A, MosaicId, Amount, valid for 84h }
const tx2 = SecretLockTransaction.create(
    Deadline.create(),
    new Mosaic(new MosaicId('bob:token'), UInt64.fromUint(10)),
    UInt64.fromUint(84*60), //assume one block per minute
    HashType.SHA3_512,
    secret,
    Address.createFromRawAddress('SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54'),
    NetworkType.MIJIN
);

// Bob sends TX2 to network (PRIVATE)
const tx2Signed = bobAccount.sign(tx2);
transactionHttp.announce(tx2Signed).subscribe(
    x => console.log(x),
    err => console.error(err)
);

// Alice waits until Txs are confirmed
// Alice spends TX2 transaction by sending SecretProofTransaction (in PRIVATE network)
const tx3 = SecretProofTransaction.create(
    Deadline.create(),
    HashType.SHA3_512,
    secret,
    proof,
    NetworkType.MIJIN
);

const tx3Signed = aliceAccount.sign(tx3);
transactionHttp.announce(tx3Signed).subscribe(
    x => console.log(x),
    err => console.error(err)
);

// Bob spends TX1 transaction by sending SecretProofTransaction (in PUBLIC network)
const tx4 = SecretProofTransaction.create(
    Deadline.create(),
    HashType.SHA3_512,
    secret,
    proof,
    NetworkType.MAIN_NET
);
const tx4Signed = aliceAccount.sign(tx4);

transactionHttp.announce(tx4Signed).subscribe(
    x => console.log(x),
    err => console.error(err)
);
