var update = document.getElementById('update');

update.addEventListener('click', () => {
  fetch('books', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': 'Harry Potter'
    })
  })
})
