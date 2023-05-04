import {expect} from "chai";
import {ethers} from "hardhat";

describe("TinyVillage Test", function() {

    let owner, tinyVillage;

    beforeEach(async function() {
        [owner] = await ethers.getSigners();
//        console.log("Signers Address: ", owner);

        const TinyVillage = await ethers.getContractFactory("TinyVillage");
        tinyVillage = await TinyVillage.deploy();

    });

    it("verify mint village when user has no village", async function() {
        
        await tinyVillage.mintVillage();
        const balance = await tinyVillage.balanceOf(owner.address,0)
        expect(1).to.equal(Number(balance.toString()));   
        
    });

    it("verify error on minting village when user has a village", async function() {
        
            await tinyVillage.mintVillage();
            await tinyVillage.mintVillage().catch(ex => {
                console.log(ex.message);
                expect("VM Exception while processing transaction: reverted with reason string 'you already have a village'")
                .to.equal(ex.message);
                });
    });

    it("verify castle minting",async function () {
        
        await tinyVillage.mintVillage();
        await tinyVillage.mintMine();
        await tinyVillage.mintFarm();
        await tinyVillage.mintMill();
        await tinyVillage.mintCastle();
        const balance = await tinyVillage.balanceOf(owner.address, 4)
        expect(1).to.equal(Number(balance.toString()));
    });

});