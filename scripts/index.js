const HOST = 'http://localhost'
const PORT = '5173'

async function fetchData() {
  try {
    const response = await fetch(`${HOST}:${PORT}/db.json`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const template = (data) => `
  <li>
    <figure>
      <img src="${data.teaserImg}" alt="${data.title}" />
      <figcaption>
        <h3>${data.title}</h3>
        <address>${data.author}</address>
        <ul class="tag-list">
          ${data.tags.keywords.map((tag) => `<li>${tag}</li>`).join('')}
        </ul>
      </figcaption>
    </figure>
  </li>
`

async function renderData() {
  const container = document.querySelector('#article-container')
  const data = await fetchData()

  if (!data) {
    return
  }

  data.articles.forEach((item) => {
    !item.draft ? (container.innerHTML += template(item)) : null
  })
}

renderData()
