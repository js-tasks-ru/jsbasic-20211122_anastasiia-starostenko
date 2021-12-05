function highlight(table) {
  for (let row of table.rows) {
    
    if (row.cells[1].innerText < 18) row.setAttribute('style','text-decoration: line-through') 
    
    let classNames = [row.cells[2].innerText == 'm' ? 'male' : 'female']
  
    if (row.cells[3].hasAttribute('data-available')) {
      classNames.push( row.cells[3].getAttribute('data-available') == 'true' ? 'available' : 'unavailable');
    }
    else {
      row.setAttribute('hidden', true);
    }

    row.classList.add(...classNames)
  }
}
