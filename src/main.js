const HOST = "http://localhost"
const PORT = "4173"
const localUrl = `${HOST}:${PORT}/db.json`

const url =
  "https://gist.githubusercontent.com/vschaefer/8d26be957bbc8607f60da5dd1b251a78/raw/38c62965139a156d4a605be1e046ad8278235fff/articles.json"

async function fetchData() {
  try {
    const response = await fetch(`${url}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

const template = (data) => `
  <li>
    <figure>
      <img src="./assets/images/${data.teaserImg}" alt="${data.title}" />
      <figcaption>
        <h3>${data.title}</h3>
        <address>${data.author}</address>
        <ul class="tag-list">
          ${data.tags.keywords.map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
      </figcaption>
    </figure>
  </li>
`

async function renderData() {
  const container = document.querySelector("#article-container")
  const data = await fetchData()

  if (!data) {
    return
  }

  data.articles.map((item) => {
    !item.draft ? (container.innerHTML += template(item)) : null
  })
}

renderData()
