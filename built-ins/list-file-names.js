for await (const dir of Deno.readDir(".")) {
	console.log(Object.keys(dir))
}
