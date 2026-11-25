// Sky Browser UI - prototype logic: tabs, address bar, webviews.
'use strict'

const tabsEl = document.getElementById('tabs')
const viewsEl = document.getElementById('views')
const urlEl = document.getElementById('url')
// Local "new tab" page, next to this UI page (preload has no __dirname).
const START = new URL('start.html', window.location.href).href

const tabs = new Map() // id -> { button, view }
let activeId = null
let seq = 0

// Address bar input -> URL: keep schemes, add https:// to domains, else search.
function resolve (input) {
  input = input.trim()
  if (!input) return null
  if (/^(https?|file|about):/i.test(input)) return input
  if (!input.includes(' ') && input.includes('.')) return 'https://' + input
  return 'https://duckduckgo.com/?q=' + encodeURIComponent(input)
}

function syncUrl (url) {
  urlEl.value = url.startsWith('file:') ? '' : url
}

function newTab (url) {
  const id = ++seq

  const button = document.createElement('button')
  button.className = 'tab'
  button.title = ''
  const label = document.createElement('span')
  label.className = 'label'
  label.textContent = 'Nouvel onglet'
  const close = document.createElement('span')
  close.className = 'close'
  close.textContent = '×'
  close.title = 'Fermer (Ctrl+W)'
  close.addEventListener('click', (e) => { e.stopPropagation(); closeTab(id) })
  button.appendChild(label)
  button.appendChild(close)
  button.addEventListener('click', () => selectTab(id))
  tabsEl.appendChild(button)

  const view = document.createElement('webview')
  view.src = url || START
  view.addEventListener('page-title-updated', (e) => {
    label.textContent = e.title || 'Sans titre'
    button.title = e.title || ''
  })
  view.addEventListener('did-navigate', (e) => { if (id === activeId) syncUrl(e.url) })
  view.addEventListener('did-navigate-in-page', (e) => { if (id === activeId) syncUrl(e.url) })
  viewsEl.appendChild(view)

  tabs.set(id, { button, view })
  selectTab(id)
}

function selectTab (id) {
  activeId = id
  for (const [tid, t] of tabs) {
    t.button.classList.toggle('active', tid === id)
    t.view.classList.toggle('hidden', tid !== id)
  }
  // Show the current URL (empty on the local start page).
  try { syncUrl(tabs.get(id).view.getURL() || '') } catch { urlEl.value = '' }
}

function closeTab (id) {
  const t = tabs.get(id)
  if (!t) return
  t.button.remove()
  t.view.remove()
  tabs.delete(id)
  if (activeId === id) {
    const last = [...tabs.keys()].pop()
    if (last) selectTab(last)
    else newTab()
  }
}

function activeView () {
  return activeId !== null ? (tabs.get(activeId) || {}).view : null
}

document.getElementById('newtab').addEventListener('click', () => newTab())
document.getElementById('back').addEventListener('click', () => activeView() && activeView().goBack())
document.getElementById('fwd').addEventListener('click', () => activeView() && activeView().goForward())
document.getElementById('reload').addEventListener('click', () => activeView() && activeView().reload())
document.getElementById('home').addEventListener('click', () => activeView() && activeView().loadURL(START))

urlEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const url = resolve(urlEl.value)
    if (url) {
      activeView() && activeView().loadURL(url)
      urlEl.blur()
    }
  }
})

window.addEventListener('keydown', (e) => {
  if (!(e.ctrlKey || e.metaKey)) return
  const k = e.key.toLowerCase()
  if (k === 't') { e.preventDefault(); newTab() }
  else if (k === 'w') { e.preventDefault(); if (activeId !== null) closeTab(activeId) }
  else if (k === 'l') { e.preventDefault(); urlEl.focus(); urlEl.select() }
})

window.sky.onOpenTab((url) => newTab(url))

newTab()
