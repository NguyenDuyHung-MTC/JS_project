const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document) 

const tabs = $$('.tab-item')
const panes = $$('.tab-pane')
const line = $('.line')

tabs.forEach((tab, index) => {
    const pane = panes[index]
    tab.onclick = function(){
        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active')
        line.style.left = tab.offsetLeft + 'px'
        line.style.width = tab.offsetWidth + 'px'

        tab.classList.add('active')
        pane.classList.add('active')
    }
})