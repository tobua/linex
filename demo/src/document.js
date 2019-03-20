// Prepare index.html contents, adding #root and exmpl stylesheet.
export default () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/exmpl@1.0.2/dist/styles.css'
  document.head.appendChild(link)

  const rootTag = document.querySelector('#root')

  if (rootTag) {
    return
  }

  const rootDiv = document.createElement('div')
  rootDiv.id = 'root'
  document.body.appendChild(rootDiv)
}
