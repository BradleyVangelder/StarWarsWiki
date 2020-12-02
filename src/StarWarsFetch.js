import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Row } from 'react-bootstrap'
import uuid from 'uuid'

function StarWarsFetch() {

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [dataShow, setDataShow] = useState([])
    const [open, setOpen] = useState("")

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
                    birthYear: person.birth_year,
                    id: uuid.v4()
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
                    birthYear: person.birth_year,
                    id: uuid.v4()
                }
                persons.push(prop)
            }
            else if(input === "") {
                const prop = {
                    name: person.name,
                    height: person.height,
                    hairColor: person.hair_color,
                    birthYear: person.birth_year,
                    id: uuid.v4()
                }
                persons.push(prop)
            }
        })

        setDataShow(persons)
    }

    return(
        <Container>
            <h1 className="text-center">Star Wars Wiki</h1>
            <input
                className="w-100 mb-4"
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
                    <div key={person.id}>
                        <Row>
                            <h1>{person.name}</h1>
                            <Button
                                value={person.id}
                                onClick={(e) => {
                                    setOpen(e.target.value)
                                }}
                            >
                                show more
                            </Button>
                        </Row>
                        <div id={person.id} style={person.id === open ? {display: 'block'} : {display: 'none'}}>
                            <p>height: {person.height}</p>
                            <p style={person.hairColor !== 'none' && person.hairColor !== 'n/a' ? {display: 'block'} : {display: 'none'}}>haircolor: {person.hairColor}</p>
                            <p>Birthyear: {person.birthYear}</p>
                        </div>
                    </div>
                )
            })}
        </Container>
    )
}

export default StarWarsFetch