import {useState, useEffect} from 'react'

export default function CharacterDisplay({role, charactersConfig}){

    console.log("El rol que llega a Dispaly es: ", role)

    
    
    if(role == null){
        return(
            <div className=" w-full h-full flex items-center justify-center text-9xl animate-pulse">
                ?
            </div>
        )
    }

    const currentCharacter = charactersConfig[role]
    const FRAME_WIDTH = 128
    const [totalFrames, setTotalFrames] = useState(1)

    useEffect(() => {
        const img = new Image() 
        
        img.onload = () => { 
            const naturalWidth = img.naturalWidth
            const frames = Math.floor(naturalWidth / FRAME_WIDTH)
            setTotalFrames(frames)
        }

        img.src = currentCharacter.img
    }, [currentCharacter.img])

    const endPositiion = `-${FRAME_WIDTH * totalFrames}px`

    return(
        <div className={`w-full h-full flex items-center justify-center`}>
            <div
                // Usamos estilos en línea para la imagen de fondo porque es dinámica
                style={{
                    backgroundImage: `url(${currentCharacter.img})`,
                    width: `${FRAME_WIDTH}px`,
                    height: `${FRAME_WIDTH}px`,
                    "--scroll-end": endPositiion,
                    animationTimingFunction:`steps(${totalFrames})`,
                    animationDuration: '0.8s' 
                }}
                // CLASES EXPLICADAS:
                // 1. w-[64px] h-[64px]: El tamaño EXACTO de un solo fotograma. ¡AJÚSTALO!
                // 2. bg-no-repeat: Para que la imagen no se repita.
                // 3. animate-sprite: Nuestra nueva clase de animación.
                // 4. [image-rendering:pixelated]: Para que los píxeles se vean nítidos.
                className="bg-no-repeat animate-sprite [image-rendering:pixelated] scale-150 lg:scale-200 origin-bottom"
            >
                {/* Este div está vacío, solo sirve para mostrar la imagen de fondo animada */}
            </div>
        </div>
    )
}