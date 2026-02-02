

export default function CharactersMenu({role, onRoleSelect}){

    const characters = [
        {role: 'generic', name: "General"},
        {role: 'devops', name: "DevOps"},
        {role: 'data', name: "Ingeniero de Datos"},
        {role: 'sysadmin', name: "Administrador de Sistemas"},
        {role: 'developer', name: "Desarrollador"}
    ]

    return(

        <div className="w-full flex flex-col items-center gap-2 md:gap-6">
            <h2 className="font-pixel text-xs md:text-xl text-center mb-6 drop-shadow-md">Selecciona tu personaje</h2>
            <section className="grid grid-cols-2 gap-4 md:gap-7 rounded-xl w-full">
                {characters.map(c => {
                    const isSelected = c.role == role
                    return(
                        <button
                            key={c.role}
                            onClick={() => {
                                console.log("👉 CLICK DETECTADO en botón:", c.role);
                                console.log("📨 Enviando señal a función:", onRoleSelect);
                                onRoleSelect(c.role)
                            }}
                            className={`
                                aspect-video rounded-xl border-2 transition-all duiration-300 ease-out
                                group
                                bg-gray-900
                                ${isSelected?
                                     'border-[#57fff9] shadow-[0_0_15px_rgba(87,255,249,0.5)] scale-105 opacity-100'
                                     : 'border-transparent hover:border-gray-600 hover:scale-105 opacity-60 hover:opacity-100'
                                }`
                            }
                        >
                            <div className=" uppercase font-pixel text-[10px] md:text-xs">{c.name}</div>
                        </button>)
                })}
            </section>
        </div>
        
    )
}