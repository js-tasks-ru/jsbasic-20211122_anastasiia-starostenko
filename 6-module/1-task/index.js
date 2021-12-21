/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }
  
  render() {
    this.elem = document.createElement('TABLE');
    this.elem.innerHTML = `<thead>
                            <tr>
                              <th>Имя</th>
                              <th>Возраст</th>
                              <th>Зарплата</th>
                              <th>Город</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>`;

    this.elem.innerHTML += this.rows.map(item =>
    `<tr><td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.salary}</td>
        <td>${item.city}</td>
        <td><button class = 'remove'>X</button></td>
      </tr>`
      ).join('');

      this.elem.innerHTML += '</tbody>';
      this.elem.addEventListener('click', this.onClick);
  
      return this.elem;
  }

  onClick = (ev) => {
    if (ev.target.tagName != 'BUTTON') return;
    ev.target.parentElement.parentElement.remove();
  }
}
