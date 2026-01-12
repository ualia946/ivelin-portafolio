
const KEY = "lastRegisteredTraffic";
const TTL_MS = 24 * 60 * 60 * 1000;


export function shouldSendRegistrationTraffic(ttlMs = TTL_MS) {
    if (typeof window === "undefined") return false;

    const raw = localStorage.getItem(KEY);

    if (raw == null){
        console.log("No existe un registro de este navegador del usuario, se procederá a registrar...")
        return true
    } ;

    const lastSentMs = Number(raw);
    if (!Number.isFinite(lastSentMs)){
        console.log("El formato numérico del último registro es incorrecto, volviendo a registrar...")
        return true
    }

    const nowMs = Date.now();
    const diffMs = nowMs - lastSentMs;
    if (diffMs => ttlMs){
        console.log("Han pasado 24 horas desde el último registro, volviendo a registrar...")
        return true
    }

    console.log("No se va a registrar la IP del usuario")
    return false
}

export function markTrafficRegistration(nowMs = Date.now()) {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, String(nowMs));
}



