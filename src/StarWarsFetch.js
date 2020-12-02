import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Button, Row } from 'react-bootstrap'
import uuid from 'react-uuid'
import './StarWarsFetch.css'

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
                    id: uuid()
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
                    id: uuid()
                }
                persons.push(prop)
            }
            else if(input === "") {
                const prop = {
                    name: person.name,
                    height: person.height,
                    hairColor: person.hair_color,
                    birthYear: person.birth_year,
                    id: uuid()
                }
                persons.push(prop)
            }
        })

        setDataShow(persons)
    }

    return(
        <Container>
            <h1 className="text-center font-weight-bold">Star Wars Wiki</h1>
            <input
                className="w-100 mb-4 p-2"
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
                    <div key={person.id} className="bg-gradient mb-3">
                        <Row className="container p-3">
                            <h1 className="text col-9">{person.name}</h1>
                            <Button
                                className="btn-gradient rounded-pill col-3"
                                value={person.id}
                                onClick={(e) => {
                                    if(open === e.target.value){
                                        setOpen("")
                                    }else{
                                        setOpen(e.target.value)
                                    }
                                }}
                            >
                                {person.id === open ? "show less" : "show more"}
                            </Button>
                        </Row>
                        <Container className="p-3" id={person.id} style={person.id === open ? {display: 'block'} : {display: 'none'}}>
                            <p><span className="font-weight-bold">height:</span> {person.height}</p>
                            <p style={person.hairColor !== 'none' && person.hairColor !== 'n/a' ? {display: 'block'} : {display: 'none'}}><span className="font-weight-bold">Hair color:</span> {person.hairColor}</p>
                            <p><span className="font-weight-bold">Birth year:</span> {person.birthYear}</p>
                        </Container>
                    </div>
                )
            })}
        </Container>
    )
}

export default StarWarsFetch