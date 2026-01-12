import React, { useEffect, useState, useRef} from 'react'
import Globe from 'react-globe.gl'
import {  BounceLoader } from 'react-spinners'

const AZURE_SERVER = { latitude: 52.3676, longitude: 4.9041 };


export default function Globe3D() {
    const globeEl = useRef()

    const [points, setPoints] = useState([])
    const [arcs, setArcs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentIp, setCurrentIp] = useState("")
    const [currentFlagCountry, setCurrentFlagCountry] = useState()
    const [countryName, setCountryName] = useState("")
    const [cityName, setCityName] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(import.meta.env.PUBLIC_API_GET_LOCATIONS_URL)
                const data = await response.json()
                const locations = data.locations

                setPoints(locations)
                const trafficArcs = locations.map(l => ({
                    startLat: l.latitude,
                    startLng: l.longitude,
                    endLat: AZURE_SERVER.latitude,
                    endLng: AZURE_SERVER.longitude,
                    color: ['#ff0000', '#ffffff']
                }))

                setArcs(trafficArcs)
            } catch (error) {
                console.error("Error al cargar el mapa: ", error)
            }

            try {
                const response = await fetch("https://ipwho.is/")
                const data = await response.json()
                setCurrentIp(data.ip)
                setCurrentFlagCountry(data.flag.emoji)
                setCountryName(data.country)
                setCityName(data.city)
            } catch (error) {
                console.error("Erro al obtener la ip: ", error)
            }

            setIsLoading(false)

        })()
    }, [])

    useEffect(() => {
        if(globeEl.current){
            globeEl.current.controls().autoRotate = true
            globeEl.current.controls().autoRotateSpeed = 0
        }
    }, [isLoading])


    return(
        <>
            <div className=' w-full h-[840px] lg:h-[890px] flex justify-center items-center p-20'>
                {isLoading ?
                    <BounceLoader 
                        color='#57fff9' 
                        size={200} 
                        speedMultiplier={2} 
                    /> 
                    : 
                    <Globe
                        ref={globeEl}
                
                        // --- APARIENCIA GLOBAL ---
                        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
                        backgroundColor="rgba(0,0,0,0)" // Transparente
                        atmosphereColor="#69c7c7" // Tu color corporativo (cian)
                        atmosphereAltitude={0.15}

                        // --- CAPA DE PUNTOS (Tus usuarios) ---
                        pointsData={points}
                        pointLat="latitude"   
                        pointLng="longitude"
                        pointColor={(p) => (currentIp === p.id ? "#7836cf" : "#69c7c7")} 
                        pointAltitude={0.02}
                        pointRadius={0.1}

                        // --- CAPA DE ARCOS (Las conexiones) ---
                        arcsData={arcs}
                        arcColor="color"
                        arcDashLength={0.4}        // Longitud del "rayo" láser
                        arcDashGap={2}            
                        arcDashAnimateTime={1500}  
                        // arcStroke={null}        // Descomenta esto si quieres que solo se vean los "rayos" y no la línea base

                        // --- TAMAÑO ---
                    
                    />
                }
            </div>

            {!isLoading && <div className=' 
                z-50
                fixed
                bottom-4 sm:bottom-6 md:bottom-10
                left-0 sm:left-6 md:left-10
                pointer-events-none
                bg-white/10
                border border-white/20
                backdrop-blur-sm
                shadow-lg
                rounded-md
                px-3
                py-1 
                sm: text-sm
                md: text-[1rem]
                ml-5
                transition-opacity
                animated-pulse '
            >
                {`${currentFlagCountry} ${countryName}, ${cityName}`}
            </div>}
        </>
    )
}