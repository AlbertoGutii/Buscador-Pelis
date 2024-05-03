export default function TarjetaPeli({title, year, foto}) {
    return(
            <li>
                <img className="w-64 h-96" src={foto == "N/A"? `https://pbs.twimg.com/media/GH0-jZrW0AAVg8y?format=jpg&name=360x360` : foto} alt={title} />
                <p className="text-xl text-white">{title}</p>
                <p className="text-xl text-white">{year}</p>
            </li>
    )
}