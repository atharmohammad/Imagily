const linearCompare = async (pixels1, pixels2) => {
  const changedIndexes = []
  for (let i = 0; i < pixels1.length; i++) {
    if (Math.abs(pixels1[i] - pixels2[i]) > 5) {
      changedIndexes.push(i)
    }
  }
  return changedIndexes
}

module.exports = linearCompare
