const linearCompare = async(pixels1,pixels2) =>{
    const changedIndexes = [];
    for(let i = 0; i<pixels1.length; i++){
        if(pixels1[i] != pixels2[i]){
            changedIndexes.push(i);
        }
    }
    return changedIndexes;
}

module.exports = linearCompare;