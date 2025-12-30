// Bootstrap file for Azure Functions (Node.js v4 programming model)
// Explicitly load all function modules so they can register with the runtime via app.http(...)

const fs = require('fs');
const path = require('path');

// Diagnostics: list root and check src presence at runtime
try {
	console.log('[bootstrap] wwwroot files:', fs.readdirSync(__dirname));
	const srcPath = path.join(__dirname, 'src');
	const functionsPath = path.join(srcPath, 'functions');
	console.log('[bootstrap] src exists?', fs.existsSync(srcPath));
	console.log('[bootstrap] src/functions exists?', fs.existsSync(functionsPath));
} catch (e) {
	console.error('[bootstrap] Error reading directory:', e);
}

// Load function modules with explicit error reporting
for (const mod of [
	'./src/functions/actualizarVisitas',
	'./src/functions/obtenerInfraestructura',
	'./src/functions/obtenerRespuestaChatBot',
]) {
	try {
		console.log(`[bootstrap] requiring ${mod}`);
		require(mod);
		console.log(`[bootstrap] loaded ${mod}`);
	} catch (e) {
		console.error(`[bootstrap] failed to load ${mod}:`, e);
	}
}
