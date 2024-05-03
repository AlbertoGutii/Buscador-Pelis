export default function TarjetaPeli({title, year, foto}) {
    return(
        <>
            <ul>
                <img src={foto == "N/A"? `https://pbs.twimg.com/media/GH0-jZrW0AAVg8y?format=jpg&name=360x360` : foto} alt={title} />
                <p>{title}</p>
                <p>{year}</p>
            </ul>
        </>
    )
}