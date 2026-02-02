import {useState} from 'react'

export default function DownloadCharacter({role}) {

    if (role == null) return <></>

    const [isLoading, setIsLoading] = useState(false)

    async function getCV(){
        if(!role) return

        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.PUBLIC_API_PDF_GENERATOR_URL
            const url = `${baseUrl}target_role=${role}`

            const response = await fetch(url, {method: 'GET'})
            if(!response.ok) throw new Error("Error al generar el PDF")

            const blob = await response.blob()

            const urlBlob = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = urlBlob
            link.setAttribute('download', `CV_Ivelin_${role}.pdf`)

            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)

            window.URL.revokeObjectURL(urlBlob)

        } catch (error) {
            console.error("Fallo en la descarga del CV: ", error)
            alert("Fallo en la descarga del CV")
        }finally{
            setIsLoading(false)
        }

    }
    
    return(
        <button
            onClick={getCV}
            disabled={isLoading} // Evita doble clic
            className={`
                w-full 
                bg-primary hover:bg-secondary hover:cursor-pointer
                text-white 
                rounded-full p-3 
                font-pixel text-xs md:text-sm 
                border-b-4 border-l-2 border-[#4a188f]
                transition-all duration-100
                shadow-lg
                ${isLoading ? 'opacity-70 cursor-wait' : ''}
            `}
        >
            Descargar CV
        </button>
    )
}