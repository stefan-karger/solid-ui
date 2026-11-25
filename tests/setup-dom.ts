// DOM emulators do not implement the browser's top layer or layout visibility.
HTMLElement.prototype.showPopover = function () {}
HTMLElement.prototype.hidePopover = function () {}
Element.prototype.getAnimations = () => []
Element.prototype.scrollIntoView = function () {}
Element.prototype.checkVisibility = () => true
document.elementFromPoint = () => null
document.elementsFromPoint = () => []
