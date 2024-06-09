export default function BOTTOM({ feels, humidity, wind, color }) {
    const C = Math.floor((feels - 32) * (5 / 9));
    let bgColorClass;
    if (color === "black") {
        bgColorClass = "bg-black/15";
    } else if (color === "white") {
        bgColorClass = "bg-white/15";
    } else {
        bgColorClass = "bg-gray-300";
    }
    return (
        <div className={`flex justify-evenly text-center w-full lg:w-2/3 my-1 md:my-4 mx-auto p-3 md:p-4 rounded-3xl ${bgColorClass}`}>
            <div>
                <div className="sm:text-3xl text-xl">{C}°C</div>
                <div className="sm:text-2xl text-sm">Feels Like</div>
            </div>
            <div>
                <div className="sm:text-3xl text-xl">{humidity}</div>
                <div className="sm:text-2xl text-sm">Humidity</div>
            </div>
            <div>
                <div className="sm:text-3xl text-xl">{wind} Mph</div>
                <div className="sm:text-2xl text-sm">Wind Speed</div>
            </div>
        </div>
    );
}