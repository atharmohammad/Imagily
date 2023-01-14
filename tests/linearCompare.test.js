const linearCompare = require('../src/modules/linearCompare');
const MerkleTree = require('../src/modules/merkleTree');
const { ConvertArrayToMerkelTreeFormat } = require('../src/modules/pixelsManipulation');


describe("Merkle Tree",()=>{
    it("Get's the Sha-256 merkel root hash for the leaves",async()=>{
        const leaves1 = await ConvertArrayToMerkelTreeFormat("car1.png");
        const tree1 = new MerkleTree(leaves1);
        const hash1 = MerkleTree.createRootHash(leaves1);
        console.log(hash1)
        const leaves2 = await ConvertArrayToMerkelTreeFormat("car3.png");
        const tree2 = new MerkleTree(leaves2);
        const hash2 = MerkleTree.createRootHash(leaves2);
        console.log(hash2)
        const diff = await linearCompare(leaves1,leaves2);
        console.log(diff)
    })
})