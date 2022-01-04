import { ApiPromise, WsProvider } from '@polkadot/api';
import {u8aToHex} from '@polkadot/util';
import {encodeAddress, decodeAddress} from '@polkadot/util-crypto'
import { formatBalance } from "@polkadot/util";
import type { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import {blake2AsHex} from '@polkadot/util-crypto';
import yargs from 'yargs';
import loadJsonFile from 'load-json-file';
import { Keyring } from "@polkadot/api";
import type {VestingInfo} from '@polkadot/types/interfaces/vesting';
import type {Balance} from '@polkadot/types/interfaces';

const args = yargs.options({
    'ws-provider': {type: 'string', demandOption: true, alias: 'w'},
    'input-dir': {type: 'string', demandOption: true, alias: 'i'},
    'end-relay-block': {type: 'number', demandOption: true, alias: 'e'},
    'begin-relay-block': {type: 'number', demandOption: true, alias: 'g'},
    'sudo-priv-key': {type: 'string', demandOption: false, alias: 'a'},
    'batch-size': {type: 'number', demandOption: false, alias: 'b'},
    'kylin-foundation': {type: 'string', demandOption: true, alias: 'k'},
    'mnemonic-words': {type: 'string', demandOption: false, alias: 'm'},
  }).argv;
const wsProvider = new WsProvider(args['ws-provider']);




async function main() {
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log("success connect genesisHash is %s",api.genesisHash.toHex());

    const chunk = (args['batch-size']);
    console.log("chunk is %s", chunk);
    
    const keyring = new Keyring({ type: "sr25519" });
    let contributors = await loadJsonFile(args['input-dir']);
    let contributions = contributors["contributions"];
    let start_block = args["begin-relay-block"];
    let end_block = args["end-relay-block"];
    
    let length = end_block -start_block;
    console.log("vesting will last %s blcoks",length);
    const account =  await keyring.addFromUri(args['sudo-priv-key'], null, "sr25519");
    console.log(account.address);
    //const kfoundation = await keyring.addFromUri(args["kylin-foundation"],null,"sr25519");
    //const mnemonic = args.["mnemonic-words"];
    //const account = await keyring.createFromUri(mnemonic, { name: 'sr25519' });

    // In here we just batch the calls.
    let total_length = 0;
    let i,j, temporary;
    console.log("-------------------");
    const { nonce: rawNonce, data: balance } = await api.query.system.account(account.address);
    let nonce = BigInt(rawNonce.toString());
    console.log("nonce before distribute is %s",nonce)
    const no_memoaccount = [];
    for (i = 0, j = contributions.length; i < j; i += chunk) {
        temporary = contributions.slice(i, i + chunk);
        const batchTxs = [];
        for (var k = 0; k < temporary.length; k ++) {
            //console.log("account contribution is %s, reward is %s",temporary[k]["contribution"],temporary[k]["reward"]);
            let vested_part = BigInt(temporary[k]["reward"])*BigInt(7)/BigInt(10);
            let immediate_part = BigInt(temporary[k]["reward"]) - vested_part;
            if (temporary[k]["memo"].length == 0) {
                console.log("unassociated")
                no_memoaccount.push([temporary[k]["account"], null, temporary[k]["reward"]])
            }
            let per_block = vested_part / BigInt(length);
            let schedule= {locked:vested_part as unknown as Balance, perBlock: per_block as unknown as Balance, startingBlock: start_block}
            // console.log('every block release %s, vested part is %s, immediate part is %s',per_block,vested_part,immediate_part);
            // console.log("schedule is %s",schedule);
            batchTxs.push(
                api.tx.balances.forceTransfer(args["kylin-foundation"],temporary[k]["account"], immediate_part)
                //api.tx.balances.forceTransfer(args["kylin-foundation"],temporary[k]["memo"], immediate_part)
            );
            batchTxs.push(
                //api.tx.vesting.forceVestedTransfer(args["kylin-foundation"],temporary[k]["memo"],schedule )
                api.tx.vesting.forceVestedTransfer(args["kylin-foundation"],temporary[k]["account"],schedule )
            );
            console.log("chunk %s account %s ",(i+chunk)/chunk,k); 
        }
            //记得打开
        const unsub = await api.tx.sudo.sudo(
                api.tx.utility.batchAll(batchTxs)
            ).signAndSend(account,{ nonce: nonce++ });
        console.log("chunk %s nonce is %s",(i+chunk)/chunk,nonce)
        console.log("batchTxs total %s ",batchTxs.length);
        console.log("%s - %s send",i, (i+chunk<contributions.length? i+chunk:contributions.length))
        total_length += temporary.length;

        //ervey 5 chunks sleep 15s in case txpool full
        if (i !=0 && i % (chunk *5) == 0){
            console.log("i is %s, 5 chunks arrive, should sleep 15s",i)
            await new Promise(resolve => setTimeout(resolve,15000));
        }
        //break
    }
    console.log("%s has all distributed",total_length);


    

}

main().catch(console.error).finally(() => process.exit());