function makeDiagonalRed(table) {
  for (let [i, row] of Object.entries(table.rows)) {
    row.cells[i].style.backgroundColor = 'red'
  }
}
