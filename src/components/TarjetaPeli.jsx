export default function TarjetaPeli({title, year, foto}) {
    return(
        <div className="h-full overflow-clip">
            <img className="w-64 h-96" src={foto == "N/A"? `https://pbs.twimg.com/media/GH0-jZrW0AAVg8y?format=jpg&name=360x360` : foto} alt={title} />
            <p className="text-xl text-white w-56 leading-7">{title} ({year})</p>
        </div>
    )
}