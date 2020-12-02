import React, { useEffect, useState } from 'react'

function StarWarsFetch() {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [dataShow, setDataShow] = useState([])

    useEffect(() => {
        async function fetchPeople() {
            const res = await fetch('https://swapi.dev/api/people/')
            const apiData = await res.json()
            setData(apiData.results)
            const persons = []
            data.map(person => {
                const prop = {
                    name: person.name,
                    height: person.height,
                    hairColor: person.hair_color,
                    birthYear: person.birth_year
                }
                persons.push(prop)
            })

            setDataShow(persons)
        }

        fetchPeople()
    }, [])


    function searchFilter(input = " ") {
        const persons = []
        data.map(person => {
            if(person.name.toLowerCase().includes(input.toLowerCase())){
                const prop = {
                    name: person.name,
                    height: person.height,
                    hairColor: person.hair_color,
                    birthYear: person.birth_year
                }
                persons.push(prop)
            }
            else if(input === "") {
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

    return(
        <div>
            <h1>Star Wars Wiki</h1>
            <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    searchFilter(e.target.value)
                }
            }
            />
            {dataShow.map(person => {
                return(
                    <div key={person.name}>
                        <h1>{person.name}</h1>
                        <p>height: {person.height}</p>
                        <p style={person.hairColor !== 'none' && person.hairColor !== 'n/a' ? {display: 'block'} : {display: 'none'}}>haircolor: {person.hairColor}</p>
                        <p>Birthyear: {person.birthYear}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default StarWarsFetch