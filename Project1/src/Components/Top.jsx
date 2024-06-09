export default function TOP({week, date, time,city,temp,weather}){
    const C = Math.floor((temp - 32) * (5 / 9));
    return(
        <div className="text-center pt-8 mt-8 mb-20 md:mt-5 md:pt-6">
        <div className='text-4xl  md:text-8xl'>{city}</div>
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 text-xl mt-1 md:text-2xl">
        <div >{week}</div>
        <div >{date}</div>
        <div >{time}</div>
        </div>
        <div className='text-7xl mt-6 pt-4 md:text-9xl'>{C}°c</div>
        <div className='text-4xl sm:text-5xl md:text-7xl mt-1'>{weather}</div>
        </div>
    )
}
