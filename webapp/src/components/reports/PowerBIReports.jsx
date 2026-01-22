import { FaChartPie } from 'react-icons/fa';

export default function PowerBIReports() {
  const REPORTS = [
    ["Coste Infraestructura", '/informe-costes'],
  ]

  return (
    <>
        {REPORTS.map( r => (
            <a 
                href={r[1]}
                className="flex items-center gap-2 hover:text-[#69c7c7] transition-colors cursor-pointer"
                >
                <FaChartPie size={20}  /> 
                <span className=' text-xl'>{r[0]}</span>
            </a>
        ))}
    </>
        
  );
}