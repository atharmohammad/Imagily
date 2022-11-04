const MerkleTree = require('../src/modules/merkleTree');
const { ConvertArrayToMerkelTreeFormat } = require('../src/modules/pixelsManipulation');


describe("Merkle Tree",()=>{
    it("Get's the Sha-256 merkel root hash for the leaves",async()=>{
        const leaves1 = await ConvertArrayToMerkelTreeFormat("car1.jpg");
        const tree1 = new MerkleTree(leaves1);
        const hash1 = MerkleTree.createRootHash(leaves1);
        console.log(hash1)
        const leaves2 = await ConvertArrayToMerkelTreeFormat("car11.jpg");
        const tree2 = new MerkleTree(leaves2);
        const hash2 = MerkleTree.createRootHash(leaves2);
        console.log(hash2)
    })
})