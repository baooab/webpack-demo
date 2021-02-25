export default (text = 'Hello World!') => {
	const elem = document.createElement('div')
	elem.innerHTML = text
	return elem
}
