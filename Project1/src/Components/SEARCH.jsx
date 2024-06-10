export default function SEARCH({ flag, setFlag, location, setLocation, color }) {
    return (
        // Container div
        <div className="text-center p-4 ml-5 md:ml-14">
            <input
                {/* Input value bound to the location state */}
                value={location}
                {/* Update location state on input change */}
                onChange={event => setLocation(event.target.value)}
                {/* Handle key down events */}
                onKeyDown={function (event) {
                    if (event.key === 'Enter') {
                        {/* Toggle the flag state on Enter key press to trigger data fetching */}
                        setFlag(!flag);
                    }
                }}
                {/* Placeholder text for the input field */}
                placeholder='Find Weather'
                {/* Set input type to text */}
                type='text'
                {/* Styling */}
                className={`p-2 md:p-4 lg:p-6
                        text-lg md:text-xl h-9
                        rounded-2xl
                        bg-black bg-opacity-15
                        text-${color} placeholder-${color}
                        placeholder-opacity-50
                        w-2/3 lg:w-1/3 md:h-14 md:mt-4 mt-2`}
            />
        </div>
    )
}
