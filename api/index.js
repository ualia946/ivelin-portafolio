// Bootstrap file to ensure Functions v4 loads our HTTP handlers in Flex Consumption
// Requiring each module registers the function via app.http(...)

const modules = [
	'./src/functions/actualizarVisitas',
	'./src/functions/obtenerInfraestructura',
	'./src/functions/obtenerRespuestaChatBot',
];

modules.forEach((m) => {
	try {
		require(m);
		// eslint-disable-next-line no-console
		console.log(`Loaded function module: ${m}`);
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(`Failed to load function module: ${m}`, err);
	}
});
