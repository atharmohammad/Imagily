const MerkleTree = require('../src/modules/merkleTree')


describe("Merkle Tree",()=>{
    it("Get's the Sha-256 merkel root hash for the leaves",()=>{
        const leaves = ["1","2","3","4","5"];
        const tree = new MerkleTree(leaves);
        const hash = MerkleTree.createRootHash(leaves);
        console.log(hash)
    })
})