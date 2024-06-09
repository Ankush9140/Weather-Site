export default function SEARCH({flag,setFlag,location,setLocation,color}) {
    return (
        <div className="text-center p-4 ml-5 md:ml-14">
            <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyDown={function (event) {
                    if (event.key == 'Enter') {
                        setFlag(!flag);
                    }
                }}
                placeholder='Find Weather'
                type='text'
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