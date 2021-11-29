function showSalary(users, age) {
  strings = users.filter(user => user.age <= age).map(user => (user.name).concat(', ', user.balance))
  return strings.map( (str,index) => strings.length-1 == index ? str : str.concat('\n') ).join('')
}
