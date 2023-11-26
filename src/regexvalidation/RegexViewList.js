import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import SpinnerComponent from '../components/SpinnerComponent'
import { baseUrl } from '../config'

const RegexViewList = () => {
    const navigate = useNavigate()
    const [regViewEmployList, setRegViewEmployList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [query, setQuery] = useState("")

    const getRegexEmployee = () => {
        setIsLoading(true)
        axios.get(`${baseUrl}/user`).then((res) => {
            setRegViewEmployList(res.data.reverse())
            setIsLoading(false)
        }).catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    }
    const searchQueryEmp = (data) => {
        return data.filter((ele) => {
            return (
                ele.employeename.toLowerCase().includes(query) ||
                ele.phone.toLowerCase().includes(query) ||
                ele.email.toLowerCase().includes(query) ||
                //ele.empStatus.includes(query) ||
                ele.gender.toLowerCase().includes(query)
            )
        })
    }
    const ViewRegexSingleEmp=(list)=>{
        navigate(`/regexvalidation/viewlist/${list.id}`,{
            state: {singleEmployee: list}
        })
    }
    const editRegexSingleEmploy=(employ)=>{
        navigate(`/regexvalidation/viewlist/edit/${employ.id}`,{
            state : {singleEmployee: employ}
        })
    }
    const deleteEmploye=(user)=>{
      
        if(window.confirm("Do you want to delete")){
            const delData =  regViewEmployList.filter((ele)=>{
            return ele.id !== user.id
        })
        setRegViewEmployList(delData)
        }
    }
    useEffect(() => {
        getRegexEmployee()
    }, [])

    return (
        <div className="my-4">
            <Container>
                <Row>
                    <Col className="text-center mb-4">
                        <h3>
                            Employee List{" "}
                            <Button variant="info" onClick={()=>navigate("/regexvalidation")}>
                                + Add Employee{" "}
                            </Button>
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 2 }}>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Search Employee"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Button variant="primary" onClick={()=>setQuery(" ")}>Reset</Button>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col>
                        <Button
                            variant="secondary"
                        >
                            Selected User <Badge bg="dark">{0}</Badge>
                        </Button>
                    </Col>
                </Row>
                {
                    isLoading ?
                        <SpinnerComponent/> :
                        isError ?
                            <h3>Json Server Problem</h3> :
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Employee Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Gender</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        regViewEmployList.length <= 0 ?
                                            <tr>
                                                <td colSpan={6}><h1>Employee list not found</h1></td>
                                            </tr> :
                                            searchQueryEmp(regViewEmployList).map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.employeename}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.empStatus ? <h6 className='text-success'>Active</h6> : <h6 className='text-danger'>Inactive</h6>}</td>
                                                        <td>{item.gender}</td>
                                                        <td>
                                                            <Button className='mx-1' variant="success" onClick={()=>ViewRegexSingleEmp(item)}>View</Button>
                                                            <Button className='mx-1' variant="warning" onClick={()=>editRegexSingleEmploy(item)}>Edit</Button>
                                                            <Button className='mx-1' variant="danger" onClick={()=>deleteEmploye(item)}>Delete</Button>
                                                            <Button className='mx-1' variant="secondary">Select Employee </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                    }
                                </tbody>
                            </Table>
                }

            </Container>
        </div>
    )
}

export default RegexViewList