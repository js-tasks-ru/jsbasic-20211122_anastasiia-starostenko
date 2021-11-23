function factorial(n) {
  let i = 0;
  let result = 1;
  
  while (i != n) {
    result *= n-i;
    i++;
  }
  
  return result;
}
