var update = document.getElementById('update');

update.addEventListener('click', () => {
  fetch('books', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': 'Harry Potter'
    })
  }).then(res => {
    if (res.ok) return res.json();
  }).then(data => {
    console.log(data);
    window.location.reload(true);
  })
})
