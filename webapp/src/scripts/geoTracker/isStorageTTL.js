
const KEY = "lastRegisteredTraffic";
const TTL_MS = 24 * 60 * 60 * 1000;


export function shouldSendRegistrationTraffic(ttlMs = TTL_MS) {
    if (typeof window === "undefined") return false;

    const raw = localStorage.getItem(KEY);

    if (raw == null) return true;

    const lastSentMs = Number(raw);
    if (!Number.isFinite(lastSentMs)) return true;

    const nowMs = Date.now();
    const diffMs = nowMs - lastSentMs;
    return diffMs >= ttlMs;
}

export function markTrafficRegistration(nowMs = Date.now()) {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, String(nowMs));
}



