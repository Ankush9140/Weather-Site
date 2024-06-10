export default function BOTTOM({ feels, humidity, wind, color }) {
    // Convert Fahrenheit to Celsius and round down
    const C = Math.floor((feels - 32) * (5 / 9));
    
    // Determine background color class based on the color prop
    let bgColorClass;
    if (color === "black") {
        bgColorClass = "bg-black/15";
    } else if (color === "white") {
        bgColorClass = "bg-white/15";
    } else {
        bgColorClass = "bg-gray-300";
    }

    return (
        // Container div
        <div className={`flex justify-evenly text-center w-full lg:w-2/3 my-1 md:my-4 mx-auto p-3 md:p-4 rounded-3xl ${bgColorClass}`}>
            {/* Feels Like temperature */}
            <div>
                <div className="sm:text-3xl text-xl">{C}°C</div>
                <div className="sm:text-2xl text-sm">Feels Like</div>
            </div>
            {/* Humidity */}
            <div>
                <div className="sm:text-3xl text-xl">{humidity}</div>
                <div className="sm:text-2xl text-sm">Humidity</div>
            </div>
            {/* Wind Speed */}
            <div>
                <div className="sm:text-3xl text-xl">{wind} Mph</div>
                <div className="sm:text-2xl text-sm">Wind Speed</div>
            </div>
        </div>
    );
}
