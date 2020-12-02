import React, { useEffect, useState } from 'react'

function StarWarsFetch() {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const

    useEffect(() => {
        async function fetchPeople() {
            const res = await fetch('https://swapi.dev/api/people/')
            const apiData = await res.json()
            setData(apiData.results)
        }

        fetchPeople()
    }, [])

    function changeHandler(event) {
        const {value} = event.target

        setSearch(value)
    }

    function searchHandler() {
        data.map(person => {
            if(person.name.includes(search)){

            }
        })
    }

    return(
        <div>
            <h1>Star Wars Wiki</h1>
            <input type="text" name="search" value={search} onChange={changeHandler} />
            <button
            onClick={searchHandler}>
                Search
            </button>
        </div>
    )
}

export default StarWarsFetch