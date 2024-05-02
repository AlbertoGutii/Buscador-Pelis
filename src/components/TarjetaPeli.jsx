export default function TarjetaPeli({title, year, foto}) {
    return(
        <>
            <div>
                <p>{title}</p>
                <p>{year}</p>
                <img src={foto} alt={title} />
            </div>
        </>
    )
}