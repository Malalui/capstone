var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

contract('TestERC721Mintable', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('test verifier', function () {
      before(async function () {
          this.contract = await SolnSquareVerifier.new({from: account_one});
      })

      // Test if a new solution can be added for contract - SolnSquareVerifier
      it('add solution', async function () {
          let key = await this.contract.addSolution(account_two, 15185,
          ["0x07f66cf24ae85b8952cb41493a393cef0e70655661be2760632d05aacd37c0b9", "0x10dea75ba641278eeee01fc04a284b131852be12656fee2fe7bf4ad9e0267e5f"],
		      ["0x2b03dd69102c584e78e222b9624afa378425efa06b9f55cad439a5d9542a42fb", "0x23c44005d145666f8ea8ca63b65879619140bf130deacc84d5e280890ac55f33"],
  		    [
            ["0x18b42f530f32191f717fd16e9424ef80b04f25c209079afff4728eb72fe1d5ed", "0x0996be3cd591343ebf02a2d2f418898a13793637f961371384f6a5e2c63a988a"],
            ["0x29bea99926b35ebd8e3e527bb2d6b7c41a1bf19b4ae39c9cb65895f80e812a1b", "0x0e4c6ff92ca069f81ec721c0466b582340ffe58ecaa73b267c4b97e00fffdc94"]
          ],
		      ["0x22900f8ad3fd108f4802c8db69ed6944d58bfe0f1cca2d7ddec112183c7f47e5", "0x261c49a46b43f6663d76b89e1c3342a64729b7514de865575750d4d7191c7081"],
		      ["0x25da057e8656c50596127f42f572d36c60fbab8ceb2e4b7cb7e6a1d7fcdf55dc", "0x00e2a01e56e5d6a47789456d8e76c5299dd0d93904ab5683aa5fb7bd3509b165"],
		      ["0x1f94faa3e953f582b7ef6a9e55a9d86e64fd7e838bdace9e06b704dfb5bcc23a", "0x07c42c984d88c6fcfd8e32fef6384f51d456259dfd0dbff4e4297d7337a77dd3"],
	        ["0x214fdc3be63a181514e713e533cfb5b75457caef5f2a59d9fdf87f89560fb1ef", "0x0dbb92e2c8a23dcec587684bed1864635e62cabbe73ec86607e15c1aba324525"],
		      ["0x0603c11fdfb3e83291aa148ac743254ed053f0f144c4e2397f9b7ca08a558cec", "0x0d63af3c6b9fc52b0bf4cd31ffbe82b5f3e79298c32dca502ad468ba427c6e45"],
	        ["0x0000000000000000000000000000000000000000000000000000000000000064", "0x0000000000000000000000000000000000000000000000000000000000000001"]

          );

          assert.isNotEmpty(key, "Key was not generated");


      })

      // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
      it('mint token', async function () {

          await this.contract.mintToken("0xe51d7142cea68188df084a4fb889e88393b249f2990d6b13be1dc63b905bb9cb");

      })

      // Test that you can't reuse the same solution
      it('try to reuse a solution already used', async function () {
        let exception = false;
        try{
          await this.contract.mintToken("0xe51d7142cea68188df084a4fb889e88393b249f2990d6b13be1dc63b905bb9cb");
        }catch(err){
              exception = true;
        }

        assert(exception, "Token was minted twice");

      })



  });

})
