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

const cardTemplate = (data) => `
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

async function renderCards() {
  const container = document.querySelector("#article-container")
  const data = await fetchData()

  if (!data) {
    return
  }

  data.articles.map((item) => {
    !item.draft ? (container.innerHTML += cardTemplate(item)) : null
  })
}
renderCards()

const filterButtonTemplate = (data) => `
  <li>
    <button class="button button-primary" data-js-filter="">${data}</button>
  </li>
`

async function renderTags() {
  const keywordsContainer = document.querySelector(
    '[data-js-category="keywords"]'
  )

  const data = await fetchData()

  if (!data) {
    return
  }

  const keywords = data.articles
    .map((item) => item.tags.keywords)
    .flat()
    .filter((item, index, self) => self.indexOf(item) === index) // remove duplicates

  keywords.map((item) => {
    keywordsContainer.innerHTML += filterButtonTemplate(item)
  })
}
renderTags()
