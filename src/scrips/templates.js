export const CardTemplate = (data) => `
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

export const FilterButtonTemplate = (data) => `
  <li>
    <button class="button button-primary" data-js-filter="">${data}</button>
  </li>
`
