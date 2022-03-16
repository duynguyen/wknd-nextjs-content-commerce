export default function get(object, path) {
	let out = object

	for (const el of path) {
		if (out != null && el) {
			out = out[el]
		} else {
			return out
		}
	}

	return out
}
