Bitcoin is a decentralised monetary system that is running in a peer-to-peer system across the world. This is however achieved using two rules which are:  
i. The software that delivers (**Bitcoin Core**)   
ii. Network participants that help in running (**Nodes**).

Here, we’ll discuss how you can run a node in the Bitcoin network, but first, let’s see some more details about the Bitcoin Network. The nodes in the network help verify the transactions and blocks which has been received from peers and later relay them to further full nodes. After verifying the blocks, they are recorded in a publicly distributed ledger known as a **Blockchain**. The present state of the ledger (**Blockchain**) is achieved through a common agreement between nodes known as **Consensus.**

There are several consensus algorithms, in Bitcoin we use **Proof-of-Work(PoW)**. In short, the PoW algorithm works by solving complex mathematical problems and identifying a solution. In reality, solving the mathematical problem requires a lot of computational power and energy, the one who solves the problem first gets a reward(a.k.a **block reward**). You can learn more about it [**here**](https://www.geeksforgeeks.org/blockchain-proof-of-work-pow/).

### Questions to ponder

* Does the Block Reward change over time?
    
* After how much time/blocks does the block reward change?
    

Feel free to comment down your answers! 🙌

## What is Bitcoin-core?

So now you have a basic idea about Bitcoin, let's see how you can participate in the Bitcoin network.  
To participate in the Bitcoin network we will need some kind of software which here is [Bitcoin-core.](https://bitcoin.org/en/bitcoin-core/) There are some other alternatives as well such as:

* [btcd](https://github.com/btcsuite/btcd)
    
* [Bcoin](https://github.com/bcoin-org)
    
* Other SPV Wallets(We'll talk about this later)
    

Here we'll focus on Bitcoin-core, feel free to use any other client to participate in the Bitcoin network. So, let's begin...

## System Requirements

Make sure [GIT](https://www.git-scm.com/downloads) is installed on your system, if you reached here, you probably have already installed it :)

Let's see some system requirements for running a node:

* Desktop, laptop, or system running a recent version of MacOS or Linux (Windows too, anyways you won't be running a Windows OS 😅)
    
* 2-4 GB of memory would be enough.
    
* 1 TB of storage would be required as Bitcoin is rapidly growing (Here, 15-20 GB would be enough😃)
    
* A broadband Internet connection with upload speeds of at least 400 kilobits (50 kilobytes) per second
    
* After the initial synchronization(getting up-to-date with the current tip of Blockchain) you need at least keep 6 hours of node running.
    

## Installing Dependencies

Make sure your system is up-to-date

```bash
sudo apt-get update
```

Install the below libraries to get started with Bitcoin-Core

```bash
sudo apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libevent-dev
sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-test-dev libboost-thread-dev
sudo apt-get install libsqlite3-dev
sudo apt-get install libminiupnpc-dev
sudo apt-get install libzmq3-dev
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools
sudo apt-get install libqrencode-dev
```

***Note: You may need to enter Y in a few steps to install the libraries.***

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1716799583334/19b6f2f7-2c0e-4adc-aedd-7b778b051e0a.png align="center")

The output would look something like this ☝️

## Building Bitcoin-core

Let's start by cloning the [Bitcoin](https://github.com/bitcoin/bitcoin.git) Repo:

```bash
git clone https://github.com/bitcoin/bitcoin.git
```

After cloning we should see the `bitcoin` directory, let's get in and start compiling the bitcoin-core,

```bash
cd bitcoin
git checkout tags/v27.0
```

We will update the current repo of Bitcoin Core with the latest release version of Bitcoin Core, as there is a constant update going on in the Bitcoin Core repo. So, we checked out the latest release of Bitcoin-Core i.e. v27, you may choose any other release from the release [page](https://github.com/bitcoin/bitcoin/releases?page=1).

Let's compile the Bitcoin-Core:

```bash
./autogen.sh
```

`./autgen.sh` will simply, prepare the build files for installation. This is another script included in the Bitcoin Core repository.

```bash
./configure
```

`./configure` will basically configure your Bitcoin-Core binary according to your needs, for example, if we need tracing support then you can use the argument `--enable-usdt`.There are other configurations as well, we can find them [here](https://github.com/bitcoin/bitcoin/blob/master/configure.ac).

Be ready, now you'll need a lot of time(around 30-45 mins) for compiling:

```bash
sudo make install
make
```

Let's go for a coffee break and let the system run till it has finished compiling ☕️☕️

## Synchronising the full node

After you're done with coffee 😅, I mean compiling.  
Let's start Bitcoin Node 🥳

```bash
./src/bitcoind -daemon
```

*Note: make sure you're inside the Bitcoin-Core repo which you cloned previously*

Your node is started and now it will connect to peers for synchronising the blockchain tip, you can see the logs from `debug.log` file:

```bash
tail -n 100 -f ~/.bitcoin/debug.log
```

## Stop It!!

Stop your node right now!! 🤔  
Don't be scared, there is nothing wrong even if you keep your node running since running a full node requires more than 1 TB of storage 🫨

Don't worry we'll run a pruned node, which means we'll stay updated with the tip of the blockchain but it will also clear the old blocks' data. We are doing this because we don't want to run out of storage and memory.

```bash
//stopping the node
./src/bitcoin-cli stop
```

Now, update your `bitcoin.conf` file like this:

```bash
prune=550
```

We are using 550 means 550 MB of blockchain database will be stored in the node. 550 is the minimum number you can use here in Bitcoin Core. Save this file and start your Bitcoin Core again.

Thus, if the user specifies 550MB, once that level is reached the program will begin **deleting the oldest block and undo files while continuing to download the blockchain**.

### Putting Everything Together (Folks who need just commands)

```bash
sudo apt-get update
sudo apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libevent-dev
sudo apt-get install libboost-system-dev libboost-filesystem-dev libboost-test-dev libboost-thread-dev
sudo apt-get install libsqlite3-dev
sudo apt-get install libminiupnpc-dev
sudo apt-get install libzmq3-dev
sudo apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools
sudo apt-get install libqrencode-dev

//cloning bitcoin-core
git clone https://github.com/bitcoin/bitcoin.git

//using 27.0 bitcoin-core version
cd bitcoin
git checkout tags/v27.0

//compiling bitcoin core
./autogen.sh
./configure

//building bitcoin-core binary
sudo make install
make

//running bitcoin-core
./src/bitcoind -daemon

tail -n 100 -f ~/.bitcoin/debug.log
```

## Monitor Syncing Process

Additionally, we can monitor our syncing process using the command:

```bash
bitcoin-cli getblockchaininfo | grep verification
```

You will have something like this:

`"verificationprogress": 0.6253164306429338`

***Note***: ***verificationprogress***\*’ parameter does not require to reach 1.0000, as a value close to 0.9999 would indicate that the node is already synced.\*

Hurray!!! 🎉🎉

That's it! You should now have a fully functional Bitcoin node! ☕️