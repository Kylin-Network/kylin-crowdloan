# kylin-crowdloan

## contribution front end


## distribution script
- First you get crodlown from relaychain

`cd ~/kylin-crowdloan/contribution-getter`    

`yarn`    

`npm run contribution-getter -- --parachain-id 2102 --ws-provider "wss://kusama-rpc.polkadot.io" -o "./pichiu.json"`

tip:    
--parachain-id you can get this from the polkadotjs apps/polkadot/parathread    

--ws-provider  relaychain rpc endpoint. polkadot: wss://rpc.polkadot.io

-o the output file path    



- Obtain the order of participation in the crowd lending from subscan, and sort the data obtained in the first step to calculate the rewards that each person should obtain

`python3 subscan_order.py -cid 2102-58 -i "pichiu.json" -tc 225 -tg 140000000000000000 -tef 10000000000000000 -sapi "https://kusama.webapi.subscan.io/api/scan/parachain/contributes"`

tip:    
-cid  crodlown id, get from subscan

-i the data path from last step

-tc how many people had contributed

-tg normal crowdloan rewards

-tef eraly bird rewards

-sapi the subscan api polkadot: https://polkadot.webapi.subscan.io/api/scan/parachain/contributes    




- Finally, based on the output from the previous step, the rewards are distributed

`cd  ~/kylin-crowdloan/contribution-sender`    

`yarn`    

`npm run sender -- --ws-provider "ws://127.0.0.1:9942" --input-dir "../contribution_getter/data_with_rewards.json" --end-relay-block 10000 --begin-relay-block 9000 --batch-size 100 --sudo-priv-key "0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a" --kylin-foundation "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"`

tip:

--ws-provider  kylin node ws endport

--input-dir  last step file path

--end-relay-block   the end vesting block number

--begin-relay-block the start vesting block number

--batch-size how many people you want to dietribute rewards

--sudo-priv-key  the sudo key

--kylin-foundation the account who hold all rewards

