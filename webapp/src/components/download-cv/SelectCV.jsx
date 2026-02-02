import { useState } from 'react'

import CharactersMenu from './CharactersMenu'
import CharacterDisplay from './CharacterDisplay'
import CharacterStats from './CharacterStats'
import DownloadCharacter from './DownloadCharacter'




export default function SelectCV(){
    const [selectedRole, setSelectedRole] = useState(null)

    const charactersConfig = {
        generic:{
            name: 'General',
            img: '/characters/generic.png',
            color: 'bg-blue-600',
            stats: {
                "Resolución Problemas": 95,
                "Adaptabilidad": 100,
                "Comunicación": 85,
                "Visión Global": 90
            }
        },
        devops: {
            name: 'DevOps',
            img: '/characters/devops.png',
            color: 'bg-white-600',
            stats: {
                "Azure / Cloud": 90,
                "Docker & K8s": 85,
                "CI/CD Pipelines": 88,
                "IaC (Terraform)": 80
            }
        },
        data: {
            name: 'Data Engineer',
            img: '/characters/data.png',
            color: 'bg-green-600',
            stats: {
                "Python": 60,
                "SQL / Bases Datos": 90,
                "ETL Processes": 85,
                "Visualización": 90
            }
        },
        sysadmin: {
            name: 'SysAdmin',
            img: '/characters/sysadmin.png',
            color: 'bg-red-600',
            stats: {
                "Linux / Bash": 90,
                "Networking": 85,
                "Seguridad": 80,
                "Scripting": 60
            }

        },
        developer: {
            name: 'Developer',
            img: '/characters/developer.png',
            color: 'bg-yellow-600',
            stats: {
                "Backend (JS, Python)": 92,
                "React": 75,
                "API Design": 88,
                "Clean Code": 80
            }
        }
    }

    return(
        <div className=' 
            mt-20
            flex items-center justify-center
            min-h-screen
            p-6
            '
        >
            <div className='
                flex flex-col md:flex-row items-center justify-center gap-12
                w-full max-w-6x
            '>
                {/* === IZQUIERDA: MENÚ DE SELECCIÓN === */}
                <section className=' w-full md:w-1/3 flex justify-center order-2 md:order-1'>
                    <CharactersMenu
                        role={selectedRole}
                        onRoleSelect={setSelectedRole}
                    />
                </section>
                    

                {/* === DERECHA: PERSONAJE + STATS + BOTÓN === 
                    Agrupamos todo esto junto para que en PC esté a la derecha
                */}
                <section className=' w-full md:w-1/2 flex flex-col items-center gap-6 order-1 md:order-2'>
                    {/* Contenedor del Personaje y Stats (Para el efecto Overlay) */}
                    <div className=' relative w-full max-w-md aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex items-center justify-center'>
                        <CharacterDisplay
                            role={selectedRole}
                            charactersConfig={charactersConfig}
                        />

                        <div className='absolute bottom-0 w-full backdrop-blur-sm p-4'>
                            <CharacterStats
                                role={selectedRole}
                                charactersConfig={charactersConfig}
                            />
                        </div>
                        
                    </div>

                    {/* 3. BOTÓN DE DESCARGA 
                        Lo ponemos aquí dentro para que esté debajo de la imagen
                    */}
                    <div className='w-full max-w-md flex justify-center'> 
                        <DownloadCharacter
                            role={selectedRole}
                        />
                    </div>
                </section>
            </div>             
        </div>
    )
}