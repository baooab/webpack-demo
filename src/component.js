export default (text = 'Hello World123') => {
	const elem = document.createElement('div')
	elem.innerHTML = text
	return elem
}
