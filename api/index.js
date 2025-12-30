// Bootstrap file for Azure Functions (Node.js v4 programming model)
// Explicitly load all function modules so they can register with the runtime via app.http(...)

require('./src/functions/actualizarVisitas');
require('./src/functions/obtenerInfraestructura');
require('./src/functions/obtenerRespuestaChatBot');
