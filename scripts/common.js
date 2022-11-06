import { loadL10n } from "./i18n.js"

const currentPage = document.location.href.replace(/.*\/|(\.html|\?).*/g, '') || 'index'

const loadingEl = document.createElement('div')
loadingEl.id = 'loading'
document.body.appendChild(loadingEl)

loadL10n()
    .then(()=> Promise.all([
        import('./questions.js'), // Force parallel preload
        import(`./page-${currentPage}.js`).catch((err)=> {
            throw Error(`Fail to load ${currentPage} page script.\n\n${err.message}`)
        })
    ]))
    .catch((err)=> {
        console.error(err)
        alert(err.message)
    })
    .finally(()=> {
        loadingEl.className = 'hide'
        setTimeout(()=> loadingEl.remove(), 1000)
    })
