

export default function CharacterStats({role, charactersConfig}) {

    if (role == null) return(<div></div>)

    const characterStats = Object.entries(charactersConfig[role].stats) 


    return(
        <section className=" w-full flex flex-col gap-2 md:gap-3 font-pixel text-[8px] md:text-[10px]">
            {characterStats.map(stat => {
                const statName = stat[0]
                const statValue = stat[1]
                return(
                    <div className=" flex justify-between items-center">
                        <span className=" w-full max-w-52">{statName}</span>
                        <div className="w-2/3 h-3 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                style={{ width: `${statValue}%`, transition: 'width 1s ease-out' }}
                            ></div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}