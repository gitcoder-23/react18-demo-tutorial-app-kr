import React from 'react'
import { Button, Card, Col, Container, Form, Row, FloatingLabel } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import Select from 'react-select'
import makeAnimated, { Input } from 'react-select/animated';
import { useForm, Controller } from "react-hook-form";

const AddReactHookForm = () => {
    const animatedComponents = makeAnimated();
    const techSelectOptions = [
        { value: 'react', label: 'React' },
        { value: 'node', label: 'Node' },
        { value: 'anguler', label: 'Anguler' },
        { value: 'vue', label: 'Vue' }
    ]
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => console.log(data)
    console.log('errors',errors)
    return (
        <div className="my-4">
            <Container>
                <h1 className='text-center pb-4'> Add Employee-React Hook Form</h1>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card body style={{ boxShadow: "0px 1px 7px rgb(203 203 203)" }}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Employee Name</Form.Label>
                                            <Form.Control placeholder="Name" {...register("employname", { required: "Name is require", minLength:{value: 3, message: "Minimum 3 characters required"}} )}
                                             error={Boolean(errors.employname?.message)}   />
                                        </Form.Group>
                                        {errors.employname?.message && <span className='text-danger'>{errors.employname?.message}</span>}
                                    </Col>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Email ID</Form.Label>
                                            <Form.Control placeholder="Email" {...register("email",{required:"Email is require", pattern:{value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message:"Email ID is invaild"}})} error={Boolean(errors.email?.message)} />
                                        </Form.Group>
                                        {errors.email?.message && <span className='text-danger'>{errors.email?.message}</span>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control placeholder="Phone"  {...register("phone",{required:"Phone is require", pattern:{value: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, message:"Phone is invaild"}})} error={Boolean(errors.phone?.message)} />
                                        </Form.Group>
                                        {errors.phone?.message && <span className='text-danger'>{errors.phone?.message}</span>}
                                    </Col>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select aria-label="Default select example" {...register("gender",{required:"Select your gender"})} error={Boolean(errors.gender?.message)}>
                                                <option value="">--Select Gender--</option>
                                                <option value="male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                        {errors.gender?.message && <span className='text-danger'>{errors.gender?.message}</span>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label>Technology</Form.Label>
                                            <Select isMulti options={techSelectOptions} components={animatedComponents} />
                                        </Form.Group>
                                        {/* {errors.technology?.message && <span className='text-danger'>{errors.technology?.message}</span>} */}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className='my-2'>
                                            <Form.Label> Employee Status</Form.Label><br />
                                            <Form.Check
                                                inline
                                                label="as"
                                                name="group1"
                                                type="checkbox"
                                                id="inline-checkbox-1"
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
                                            />
                                            <Form.Check
                                                inline
                                                id="inline-check-2"
                                                label="Better"
                                                name="better"
                                                value="better"
                                                type="radio"
                                            />
                                            <Form.Check
                                                inline
                                                id="inline-check-3"
                                                label="Best"
                                                name="best"
                                                value="best"
                                                type="radio"
                                            />
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
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ReactQuill theme="snow" className='qEditorH' name="emFullDetails" value="" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center'>
                                        <Button type='submit' className='mt-4' variant="primary">Save</Button>
                                        <Button className='mt-4 mx-4' variant="secondary">Back</Button>
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

export default AddReactHookForm