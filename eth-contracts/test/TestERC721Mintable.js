var PatriciaERC721Token = artifacts.require('PatriciaERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await PatriciaERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1222);
            await this.contract.mint(account_two, 8911);
            await this.contract.mint(account_one, 1223);
            await this.contract.mint(account_two, 1278);
            await this.contract.mint(account_two, 1000);
            await this.contract.mint(account_one, 8992);
            await this.contract.mint(account_one, 9222);

        })

        it('should return total supply', async function () {
            let supply = await this.contract.totalSupply.call();
            assert.equal(supply, 7, "Incorrect number of tokens");

        })

        it('should get token balance', async function () {
           let balance = await this.contract.balanceOf.call(account_one);
           assert.equal(balance, 3, "Incorrect number of tokens");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
          let uri = await this.contract.tokenURI.call(1222);
          assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1222", "Wrong uri");
        })

        it('should transfer token from one owner to another', async function () {

          let originalOwner = await this.contract.ownerOf.call(1000);
          assert.equal(originalOwner, account_two, "Invalid original owner");
          await this.contract.transferFrom(account_two, account_one, 1000, {from: account_two});
          let newOwner = await this.contract.ownerOf.call(1000);

          assert.equal(newOwner, account_one, "Invalid new owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await PatriciaERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
          let exception = false;
            try{
              await this.contract.mint(account_two, 1992, {from: account_two});
            }
            catch(err){
                exception = true;
            }

            assert(exception, "Someone besides the owner was able to mint.")
        })

        it('should return contract owner', async function () {

          let owner = await this.contract.getOwner.call();
          assert.equal(owner, account_one, "Wrong contract owner");

        })

    });
})
