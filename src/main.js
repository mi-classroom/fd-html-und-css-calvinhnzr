import { CardTemplate, FilterButtonTemplate } from "./scrips/templates.js"

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

async function renderData() {
  const data = await fetchData()

  if (!data) {
    return
  }
  renderCards(data)
  renderTags(data)
}

function renderCards(data) {
  const container = document.querySelector("#article-container")

  data.articles.map((item) => {
    !item.draft ? (container.innerHTML += CardTemplate(item)) : null
  })
}

function renderTags(data) {
  // render keywords
  const keywordsContainer = document.querySelector(
    "[data-js-category='keywords']"
  )

  const keywords = data.articles
    .map((item) => item.tags.keywords)
    .flat()
    .filter((item, index, self) => self.indexOf(item) === index) // remove duplicates

  keywords.map((item) => {
    keywordsContainer.innerHTML += FilterButtonTemplate(item)
  })
}

renderData()
