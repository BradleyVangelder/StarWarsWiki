import React, {useEffect, useRef, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import useForceUpdate from "use-force-update";
import { Container, Button, Row } from 'react-bootstrap'
import uuid from 'react-uuid'
import './StarWarsFetch.css'

function StarWarsFetch() {

    const fieldInput = useRef()
    const selection = useRef()
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [dataShow, setDataShow] = useState([])
    const [open, setOpen] = useState("")
    const [select, setSelect] = useState('people')

    useEffect(() => {
        async function fetchBeginData() {
            const res = await fetch('https://swapi.dev/api/' + select)
            const responseData = await res.json()
            setData(responseData.results)
        }

        console.log(data)
        fetchBeginData()
        searchFilter()
    }, [select]);

    // Filter on search and gets the input and updates the state
    function searchFilter(input = " ") {
        const dataArray = []
        data.map(item => {
            if(item.name.toLowerCase().includes(input.toLowerCase())){
                const prop = {
                    name: item.name,
                    height: item.height,
                    gender: item.gender,
                    hairColor: item.hair_color,
                    birthYear: item.birth_year,
                    id: uuid()
                }
                dataArray.push(prop)
            }
            else if(input === "") {
                const prop = {
                    name: item.name,
                    height: item.height,
                    gender: item.gender,
                    hairColor: item.hair_color,
                    birthYear: item.birth_year,
                    id: uuid()
                }
                dataArray.push(prop)
            }
        })

        setDataShow(dataArray)
        console.log(dataShow)
    }

    return(
        <Container>
            <h1 className="text-center font-weight-bold">Star Wars Wiki</h1>
            <Row>
                <input
                    className="w-100 mb-4 p-2 col-9"
                    type="text"
                    name="search"
                    value={search}
                    ref={fieldInput}
                    onChange={(e) => {
                            setSearch(e.target.value)
                            searchFilter(e.target.value)
                        }
                    }
                />
                <select
                    ref={selection}
                    value={select}
                    onChange={(e) => {
                            setSelect(e.target.value)
                            searchFilter(fieldInput.current.value)
                        }
                    }
                        className="col-3 mb-4 p-2">
                    <option value="people/">People</option>
                    <option value="starships/">Starships</option>
                </select>
            </Row>

            {dataShow.map(item => {
                return(
                    <div key={item.id} className="bg-gradient mb-3">
                        <Row className="container p-3">
                            <h1 className="text col-9">{item.name}</h1>
                            <Button
                                className="btn-gradient rounded-pill col-3"
                                value={item.id}
                                onClick={(e) => {
                                    if(open === e.target.value){
                                        setOpen("")
                                    }else{
                                        setOpen(e.target.value)
                                    }
                                }}
                            >
                                {item.id === open ? "show less" : "show more"}
                            </Button>
                        </Row>
                        <Container className="p-3" id={item.id} style={item.id === open ? {display: 'block'} : {display: 'none'}}>
                            <p><span className="font-weight-bold">height:</span> {item.height}</p>
                            <p><span className="font-weight-bold">Gender:</span> {item.gender}</p>
                            <p style={item.hairColor !== 'none' || item.hairColor !== 'n/a' ? {display: 'block'} : {display: 'none'}}><span className="font-weight-bold">Hair color:</span> {item.hairColor}</p>
                            <p><span className="font-weight-bold">Birth year:</span> {item.birthYear}</p>
                        </Container>
                    </div>
                )
            })}
        </Container>
    )
}

export default StarWarsFetch