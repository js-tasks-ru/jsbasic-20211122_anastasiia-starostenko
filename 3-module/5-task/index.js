function getMinMax(str) {
  arrWithNumbers = str.split(' ').filter(i => isFinite(i)).map(i => Number(i));

  return { min: Math.min(...arrWithNumbers),
           max: Math.max(...arrWithNumbers)
          }
}
