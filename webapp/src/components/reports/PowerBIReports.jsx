import { FaChartPie } from 'react-icons/fa';

export default function PowerBIReports() {
  const REPORTS = [
    ["Coste Infraestructura", 'https://app.powerbi.com/view?r=eyJrIjoiZDY2ZjYzMTUtOTg2MS00NWMwLTk3NjYtYzU2MmJhNGYzZjFkIiwidCI6IjY2MDBhZTk3LWEwZTktNDdhMC05MTRkLWQ1NWY2ZDFhOGY1YSIsImMiOjh9'],
  ]

  return (
    <>
        {REPORTS.map( r => (
            <a 
                href={r[1]}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#69c7c7] transition-colors cursor-pointer"
                >
                <FaChartPie size={20}  /> 
                <span className=' text-xl'>{r[0]}</span>
            </a>
        ))}
    </>
        
  );
}