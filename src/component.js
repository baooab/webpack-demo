export default (text = 'Hello World') => {
	const elem = document.createElement('div')
	elem.className = "rounded bg-red-100 border max-w-md m-4 p-4";
	elem.innerHTML = text
	return elem
}
