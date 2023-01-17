import escapeHtml from 'escape-html'
import { RichText } from '../types'

const serialize = (node: RichText) => {
  console.log('node', node)
  if (node.text) {
    let string = escapeHtml(node.text)

    if (node.bold) {
      string = `<strong>${string}</strong>`
    }

    if (node.italic) {
      string = `<em>${string}</em>`
    }
    return string
  } else if (node.children) {
    const children: string = node.children
      .map((n: RichText) => serialize(n))
      .join('')

    switch (node.type) {
      case 'p':
        return `<p>${children}</p>`
      case 'a':
        return `<a href="${escapeHtml(node.url)}" target="${
          node.target
        }" class="tw-text-zeiss-azure-90 tw-font-medium">${children} →</a>`
      default:
        return children
    }
  } else return ''
}

export { serialize }
