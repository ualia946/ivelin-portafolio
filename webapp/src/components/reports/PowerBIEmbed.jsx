import { useState, useEffect, useRef } from 'react';

export default function PowerBIEmbed({ 
  desktopReportUrl,
  mobileReportUrl,
  mobileBreakpoint = 768 
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkIsMobile();


    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [mobileBreakpoint]);

  const getEmbedUrl = () => {
    return isMobile? mobileReportUrl : desktopReportUrl;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="powerbi-container w-full relative">
      {/* Contenedor del iframe */}
      <div 
        className="relative w-full overflow-hidden rounded-lg shadow-xl"
        style={{
          // Altura adaptada según el dispositivo
          // Móvil: más alto para scroll vertical
          // Escritorio: ratio 16:9 típico
          paddingBottom: isMobile ? '150%' : '56.25%',
        }}
      >
        {/* Indicador de carga superpuesto */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#69c7c7]"></div>
              <span className="text-gray-400">Cargando informe...</span>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={getEmbedUrl()}
          onLoad={handleLoad}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
        />
      </div>

      {/* Indicador de modo actual (solo en desarrollo) */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isMobile ? 'bg-orange-500' : 'bg-green-500'}`}></span>
          Vista: {isMobile ? 'Móvil' : 'Escritorio'}
        </span>
      </div>
    </div>
  );
}
