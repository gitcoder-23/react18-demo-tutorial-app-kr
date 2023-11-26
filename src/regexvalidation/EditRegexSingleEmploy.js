import React, { useState } from 'react'
import { Container, Form, Row, Col, Button, Card, FloatingLabel } from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { ValidationRgx } from './ValidationRgx'
import { baseUrl } from '../config';
import { toast } from 'react-toastify';

const EditRegexSingleEmploy = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { state } = useLocation()
    const animatedComponents = makeAnimated();
    const [empValue, setEmpValues] = useState({
        name: state.singleEmployee.employeename || "",
        email: state.singleEmployee.email || "",
        gender: state.singleEmployee.gender || "",
        phone: state.singleEmployee.phone || "",
        technology:state.singleEmployee.technology ||  [],
        empStatus:state.singleEmployee.empStatus || false,
        performance:state.singleEmployee.performance || "",
        emDetails: state.singleEmployee.emDetails || ""
    })
    const [errMsg, setErrMsg] = useState({})
    const techSelectOptions = [
        { value: 'react', label: 'React' },
        { value: 'node', label: 'Node' },
        { value: 'anguler', label: 'Anguler' },
        { value: 'vue', label: 'Vue' }
    ]
    const [emFullDetails, setEmFullDetails] = useState(state.singleEmployee.employeeFullDetails)
    //console.log('emFullDetails-', emFullDetails)

    const techSelectChange = (option) => {
        setEmpValues({ ...empValue, technology: option })
    }
    const onRadioChange = (checkedValue) => {
        setEmpValues({ ...empValue, performance: checkedValue.target.value })
    }

    const handelSubmit = (e) => {
        e.preventDefault()
        setErrMsg(ValidationRgx(empValue, emFullDetails))
        if (Object.keys(ValidationRgx(empValue, emFullDetails)).length === 0) {
            const newData = {
                id: Date.now(),
                employeename: empValue.name,
                email: empValue.email,
                phone: empValue.phone,
                gender: empValue.gender,
                technology: empValue.technology,
                empStatus: empValue.empStatus,
                performance: empValue.performance,
                emDetails: empValue.emDetails,
                employeeFullDetails: emFullDetails
            }
            axios.put(`${baseUrl}/user/${id}`, newData).then((res) => {
                if (res.status === 200) {
                  toast.success("User edit successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                    setTimeout(() => {
                        navigate('/regexvalidation/viewlist')
                    }, 1000);
                }
            }).catch((err) => console.log('err-', err))
        }
    }
    return (
        <div className="my-4">
            <Container>
                <h1 className='text-center pb-4'>Edit Single Employee</h1>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card body style={{ boxShadow: "0px 1px 7px rgb(203 203 203)" }}>
                            <Form onSubmit={handelSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Employee Name</Form.Label>
                                            <Form.Control name="employeename" value={empValue.name} placeholder="Name" onChange={(e) => setEmpValues({ ...empValue, name: e.target.value })} />
                                            {errMsg.name && <small className='text-danger'>{errMsg.name}</small>}
                                        </Form.Group>

                                    </Col>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Email ID</Form.Label>
                                            <Form.Control name="email" value={empValue.email} placeholder="Email" onChange={(e) => setEmpValues({ ...empValue, email: e.target.value })} />
                                            {errMsg.email && <small className='text-danger'>{errMsg.email}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control name="phone" value={empValue.phone} placeholder="Phone" onChange={(e) => setEmpValues({ ...empValue, phone: e.target.value })} />
                                            {errMsg.phone && <small className='text-danger'>{errMsg.phone}</small>}
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select aria-label="Default select example" value={empValue.gender} onChange={(e) => setEmpValues({ ...empValue, gender: e.target.value })}>
                                                <option value="">--Select Gender--</option>
                                                <option value="male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                            {errMsg.gender && <small className='text-danger'>{errMsg.gender}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Technology</Form.Label>
                                            <Select isMulti options={techSelectOptions} value={empValue.technology} components={animatedComponents} onChange={(opt) => techSelectChange(opt)} />
                                            {errMsg.technology && <small className='text-danger'>{errMsg.technology}</small>}
                                        </Form.Group>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label> Employee Status</Form.Label><br />
                                            <Form.Check
                                                inline
                                                label={empValue.empStatus ? "Active" : "Inactive"}
                                                name="group1"
                                                type="checkbox"
                                                id="inline-checkbox-1"
                                                checked={empValue.empStatus}
                                                onChange={(e) => setEmpValues({ ...empValue, empStatus: e.target.checked })}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Performance</Form.Label><br />
                                            <Form.Check
                                                inline
                                                id="inline-check-1"
                                                label="Good"
                                                name="good"
                                                value="good"
                                                type="radio"
                                                onChange={(e) => onRadioChange(e)}
                                                checked={empValue.performance === "good" ? true : false}
                                            />
                                            <Form.Check
                                                inline
                                                label="Better"
                                                id="inline-check-2"
                                                name="better"
                                                value="better"
                                                type="radio"
                                                onChange={(e) => onRadioChange(e)}
                                                checked={empValue.performance === "better" ? true : false}
                                            />
                                            <Form.Check
                                                inline
                                                id="inline-check-3"
                                                label="Best"
                                                name="best"
                                                value="best"
                                                type="radio"
                                                onChange={(e) => onRadioChange(e)}
                                                checked={empValue.performance === "best" ? true : false}
                                            />
                                            {errMsg.performance && <small className='text-danger'>{errMsg.performance}</small>}

                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <FloatingLabel controlId="floatingTextarea2" label="Employee Details">
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="Leave a comment here"
                                                    style={{ height: '70px' }}
                                                    value={empValue.emDetails}
                                                    onChange={(e) => setEmpValues({ ...empValue, emDetails: e.target.value })}
                                                />
                                            </FloatingLabel>
                                            {errMsg.emDetails && <small className='text-danger'>{errMsg.emDetails}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ReactQuill theme="snow" className='qEditorH' name="emFullDetails" value={emFullDetails} onChange={setEmFullDetails} />
                                        {errMsg.emFullDetails && <small className='text-danger'>{errMsg.emFullDetails}</small>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center'>
                                        <Button type='submit' className='mt-4' variant="primary">Save</Button>
                                        <Button className='mt-4 mx-4' variant="secondary" onClick={() => navigate("/regexvalidation/viewlist")}>Back</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditRegexSingleEmploy