const sha256 = require('js-sha256')

class MerkleTree {
    leaves = []
    
    // constructor to fill up the leaves with hash of the pixel buffers
    constructor(leaves){
        leaves.map((val,_)=>{
            this.leaves.push(sha256(val));
        })
    }

    // provides the merkle root hash for a leaves buffer
    static createRootHash(leavesBuffer) {
        return MerkleTree.createMerkleTree(leavesBuffer);
    }

    // recursively creates the merkle tree and returns the merkle root hash
    static createMerkleTree(leavesBuffer) {
        let size = leavesBuffer.length;
        if(size == 1){
            return leavesBuffer[0];
        }
        let newLeavesBuffer = [] , start = 0;
        // if the size of the leaves buffer is odd we would take the first hash the starting two leaves and make a new leaf array
        // to get a even size
        if(size&1){
            let oddLeavesBuffer = []
            let pairhash = sha256(leavesBuffer[0]+leavesBuffer[1]);
            // let pairhash = leavesBuffer[0] + leavesBuffer[1];
            oddLeavesBuffer.push(pairhash);
            leavesBuffer = oddLeavesBuffer.concat(leavesBuffer.slice(2));
            // console.log(leavesBuffer)
        }
        let newSize = leavesBuffer.length;
        for(let i = 0; i<newSize; i+=2){
            let pairhash = sha256(leavesBuffer[i] + leavesBuffer[i+1]);
            // let pairhash = leavesBuffer[i] + leavesBuffer[i+1];
            newLeavesBuffer.push(pairhash);
        }
        return this.createMerkleTree(newLeavesBuffer);
    }

    diffTree(leaves1,leaves2){
           
    }
}
module.exports = MerkleTree; 