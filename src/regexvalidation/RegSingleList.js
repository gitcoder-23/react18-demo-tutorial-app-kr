import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SpinnerComponent from '../components/SpinnerComponent'

const RegSingleList = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { empID } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [singleEmployeeData, setSingleEmployeeData] = useState({})
    //console.log('empID-', empID)

    const getSingleEmployeeDetails = () => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_JSON_SERVER_BASE_URL}/user/${empID}`).then((res) => {
            setIsLoading(false)
            setSingleEmployeeData(res.data)
        }).catch((err) => {
            setIsLoading(false)
            setIsError(true)
        })
    }
    useEffect(() => {
        getSingleEmployeeDetails()
        return () => {
            getSingleEmployeeDetails()
        }
    }, [])
    //console.log('state-', state.singleEmployee.technology.length)
    return (
        <div className="my-4">
            <Container>
                <h1 className='text-center mb-4'>Single employee details</h1>
                {
                    isLoading ?
                        <SpinnerComponent /> :
                        isError ?
                            <h3>Json server problem</h3> :
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}>
                                    <Card body style={{ boxShadow: "0px 1px 7px rgb(203 203 203)" }}>
                                        {singleEmployeeData.employeename ? <h6>Name : {singleEmployeeData.employeename} </h6> : ""}
                                        {singleEmployeeData.email ? <h6>Email : {singleEmployeeData.email} </h6> : ""}
                                        {singleEmployeeData.phone ? <h6>Phone : {singleEmployeeData.phone} </h6> : ""}
                                        {singleEmployeeData.gender ? <h6>Gender : {singleEmployeeData.gender} </h6> : ""}
                                        <h6>Status : {singleEmployeeData.empStatus ? <span className='text-success'>Active </span> : <span className='text-danger'>Inactive</span>} </h6>
                                        {state.singleEmployee.technology.length === 0 ? null :
                                            <h6>Technology :
                                                {state.singleEmployee.technology.map((tech, id) => {
                                                    return (
                                                        <span key={id}> {tech.label}, </span>
                                                    )
                                                })}
                                            </h6>
                                        }

                                        {singleEmployeeData.emDetails ? <><h6>Details :</h6>{singleEmployeeData.emDetails} </> : ""}<br/><br/>

                                        {singleEmployeeData.employeeFullDetails ? <><h6>Full Details :</h6> <span dangerouslySetInnerHTML={{ __html: singleEmployeeData.employeeFullDetails }}></span></> : ""}

                                    </Card>
                                    <Button className='mt-4 mx-4' variant="secondary" onClick={() => navigate("/regexvalidation/viewlist")}>Back</Button>
                                </Col>
                            </Row>
                }

            </Container>
        </div>
    )
}

export default RegSingleList