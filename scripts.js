/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"HUW9CClUe6u9ETb1","label":"reddit","bookmarks":[{"id":"r2TLNNFiZ9DZMVth","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"MHBMiBLLAqesolm2","label":"r/rust","url":"https://www.reddit.com/r/rust/"},{"id":"xTptcsmwRwkYiCql","label":"r/tensorflow","url":"https://www.reddit.com/r/tensorflow/"},{"id":"aOiXhsc4qkNWN7rb","label":"r/pytorch","url":"https://www.reddit.com/r/pytorch/"}]},{"id":"FBlHfwNfjC83xPQY","label":"rust tools","bookmarks":[{"id":"AtNMD7KiPRSxSSOa","label":"rust docs","url":"https://docs.rs/"},{"id":"0c5t1Jht7QsrGn21","label":"yew","url":"https://yew.rs/"},{"id":"oMfYs6na2PoJU7Aq","label":"lets get rusty","url":"https://letsgetrusty.kartra.com/page/XDk8"},{"id":"MwKdg7bRmAReOAsF","label":"rust crates","url":"https://crates.io/"}]},{"id":"dvm2gIddSNqY8zSG","label":"pytorch_tools","bookmarks":[{"id":"EyCLF65JOVGQgVYg","label":"learn pytorch","url":"https://www.learnpytorch.io/"},{"id":"7UHefLYlSAgRIJXn","label":"pytorch docs","url":"https://pytorch.org/"},{"id":"rZPvsbVWKQv0Mv8j","label":"pytorch forums","url":"https://discuss.pytorch.org/"}]},{"id":"najYLRy8fpWilBVY","label":"githubs","bookmarks":[{"id":"2hA4hepyrnVasOLa","label":"rcortezk9","url":"https://github.com/rcortezk9"},{"id":"PuWAJNIFTzt1pTRU","label":"mrdbourke/pytorch","url":"https://github.com/mrdbourke/pytorch-deep-learning"},{"id":"arKGsGPFNSXusJUd","label":"ageron/tensorflow","url":"https://github.com/ageron/handson-ml2"},{"id":"i6IZcUCDKfvusLve","label":"firefox shortcuts","url":"https://github.com/andreasgrafen/cascade#keyboard-shortcuts"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
