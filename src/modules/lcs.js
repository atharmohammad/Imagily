function defaultMatrix(n, m, defaultValue = 0) { 
    return Array(n).fill(0).map(() => {return Array(m).fill(defaultValue)});
}

const solve = (pixels1,pixels2,dp,index1,index2) => {
    let n = pixels1.length , m = pixels2.length;
    if(index1 == n || index2 == m)return ;

    if(dp[index1][index2] != -1)return dp[index1][index2];

    if(pixels1[index1] == pixels2[index2]){
        return dp[index1][index2] = 1 + solve(pixels1,pixels2,dp,index1+1,index2+1);
    }else{
        let one = solve(pixels1,pixels2,dp,index1+1,index2);
        let sec = solve(pixels1,pixels2,dp,index1,index2+1);
        return dp[index1][index2] = max(one,sec);
    }
}

/* Size OverFlow */
const lcs = (pixels1, pixels2) => {
    let n = pixels1.length, m = pixels2.length;
    // console.log(n,m)
    let dp = defaultMatrix(n,m,-1); // n -> rows and m -> columns
    let len = solve(pixels1,pixels2,dp,0,0);
    let result = Array(len,fill(0));

    let i = n , j = m , index = len-1;
    while(i > 0 && j > 0){
        if(pixels1[i] == pixels2[j]){
            result.push(pixels1[i]);
            i--,j--,index--;
        }else if(dp[i-1][j] > dp[i][j-1]){
            i--;
        }else{
            j--;
        }
    }
    return result;
}

module.exports = lcs