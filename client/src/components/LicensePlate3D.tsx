import { cn } from "@/lib/utils";

interface LicensePlate3DProps {
  plateNumber: string;
  country?: "TR" | "DE" | "US";
  style?: "standard" | "carbon" | "chrome";
  className?: string;
}

export default function LicensePlate3D({ 
  plateNumber, 
  country = "TR", 
  style = "standard",
  className 
}: LicensePlate3DProps) {
  const countryStyles = {
    TR: "bg-gradient-to-br from-white to-gray-100",
    DE: "bg-gradient-to-br from-white to-gray-100",
    US: "bg-gradient-to-br from-blue-600 to-blue-700"
  };

  const plateStyles = {
    standard: countryStyles[country],
    carbon: "bg-gradient-to-br from-gray-800 to-gray-900",
    chrome: "bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400"
  };

  const textColor = style === "standard" && country === "US" ? "text-white" : "text-black";

  return (
    <div 
      className={cn(
        "relative rounded-lg p-3 shadow-xl transform",
        plateStyles[style],
        className
      )}
      style={{
        boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)"
      }}
      data-testid="plate-3d"
    >
      {/* Country badge for TR/DE */}
      {country !== "US" && (
        <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
          {country}
        </div>
      )}
      
      {/* Plate number */}
      <div className={cn(
        "text-center font-bold tracking-wider",
        textColor,
        "text-2xl md:text-3xl"
      )}
      style={{
        textShadow: style === "chrome" ? "0 2px 4px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.2)",
        fontFamily: "monospace"
      }}>
        {plateNumber}
      </div>

      {/* 3D effect highlight */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)"
        }}
      />
    </div>
  );
}
