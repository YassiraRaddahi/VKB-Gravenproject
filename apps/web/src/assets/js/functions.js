function underlineLastLine(el) {
  const words = el.innerText.split(' ')
  el.innerHTML = ''

  const line = document.createElement('span')
  line.className = 'title__text'
  el.appendChild(line)

  for (let i = 0; i < words.length; i++) {
    const test = line.innerText + (i ? ' ' : '') + words[i]
    line.innerText = test

    if (line.scrollHeight > el.clientHeight) {
      line.innerText = line.innerText.slice(0, -words[i].length - 1)

      const last = document.createElement('span')
      last.className = 'title__text underlineOrange'
      last.innerText = words.slice(i).join(' ')
      el.appendChild(last)
      break
    }
  }
}