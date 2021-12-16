function toggleText() {
  document.querySelector('.toggle-text-button').addEventListener('click', function() {
    let elem = document.querySelector('#text');

    elem.hidden = !elem.hidden;
  });
}
