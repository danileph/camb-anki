export function setCaretPosition(elemId, nodeIndex, caretPos) {
  var el = document.getElementById(elemId)
  var range = document.createRange()
  var sel = window.getSelection()
  
  console.log(nodeIndex, caretPos)
  console.log(el.childNodes[nodeIndex]);
  if (el.childNodes[nodeIndex]) {
    if (el.childNodes[nodeIndex].firstChild.nodeName === 'IMG') {
      range.setStart(el.childNodes[nodeIndex], 1)
    } else {
      range.setStart(el.childNodes[nodeIndex].firstChild, caretPos)
    }
  }
  
  range.collapse(true)
  
  sel.removeAllRanges()
  sel.addRange(range)
}