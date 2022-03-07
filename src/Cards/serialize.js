
// This code was taken from stack overflow. Its purpose is to serialize functions with
// named arguments
export function serialize(f, env) {
	return JSON.stringify({ src: f.toString(), env: env });
}

export function parse(serialized) {
	var parsed = JSON.parse(serialized);
	return createFunction(parsed.src, parsed.env);
}

function createFunction(src, env) {
	return (new Function(createFunctionBody (src, env))(env));
}

function createFunctionBody(src, env) {
	return '"use strict";\n' + Object.keys(env).reduceRight(addVar, 'return ' + src + ';');
}

function addVar(s, k) {
	return 'var ' + k + ' = arguments[0].' + k + ';\n' + s;
}


// It works! I'm so happy I could cry...