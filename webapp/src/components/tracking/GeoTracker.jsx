import { useEffect } from 'react'
import { shouldSendRegistrationTraffic, markTrafficRegistration } from '../../scripts/geoTracker/isStorageTTL.js'

export default function GeoTracker() {
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      const shouldUpdateTraffic = shouldSendRegistrationTraffic()
      if (!shouldUpdateTraffic) return

      try {
        const res = await fetch(import.meta.env.PUBLIC_API_REGISTER_LOCATION_URL)
        console.log(await res.json())
        console.log("Se ha registrado la IP")
        if (!res.ok) {
          console.error('Fallo al registrar tráfico geo:', res.status)
          return
        }
        if (!cancelled) markTrafficRegistration()
      } catch (error) {
        console.error(error)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
