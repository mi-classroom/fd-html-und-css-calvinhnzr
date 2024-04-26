let item = document.querySelectorAll('.grid-list-item')
  
item.forEach((item) => {
    item.innerHTML = `
    <h3>${item.dataset.title}</h3>
    <p>${item.dataset.author}</p>
`
})

