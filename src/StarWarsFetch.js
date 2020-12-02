import React, { useEffect, useState } from 'react'

function StarWarsFetch() {

    const [data, setData] = useState([])
    let [search, setSearch] = useState("")
    let [dataShow, setDataShow] = useState([])

    useEffect(() => {
        async function fetchPeople() {
            const res = await fetch('https://swapi.dev/api/people/')
            const apiData = await res.json()
            setData(apiData.results)
        }

        fetchPeople()
    }, [])

    function searchFilter() {
        const persons = []
        data.map(person => {
            if(person.name.includes(search)){
                const prop = {
                    name: person.name,
                    height: person.height,
                    hairColor: person.hair_color,
                    birthYear: person.birth_year
                }
                persons.push(prop)
            }
        })

        setDataShow(persons)
    }

    function changeHandler(event) {
        const {value} = event.target
        setSearch(value)
        searchFilter()
    }

    console.log(dataShow)

    return(
        <div>
            <h1>Star Wars Wiki</h1>
            <input type="text" name="search" value={search} onChange={changeHandler} />
            {dataShow.map(person => {
                return(
                    <div>
                        <h1>{person.name}</h1>
                        <p>height: {person.height}</p>
                        <p>haircolor: {person.hairColor}</p>
                        <p>Birthyear: {person.birthYear}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default StarWarsFetch