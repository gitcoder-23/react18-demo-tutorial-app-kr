import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap'

const TaskTodoApp = () => {
  const [inputText, setInputText] = useState("")
  const [err, setErr] = useState(null)
  const [listData, setListData] = useState([])
  const [viewData, setViewData] = useState(null)
  const [editData, setEditData] = useState(null)

 
  const SubmitData = (e) => {
    e.preventDefault()

    if (inputText === "" || inputText === null) {
      setErr('Enter some text')
      setTimeout(() => {
        setErr(null)
      }, 2000);
    }else if(inputText && editData !== null){
      const updateData = listData.map((ele)=>{
        if(ele.id === editData){
          ele.title =  inputText
        }
        return ele;
      })
      setListData(updateData)
      CancelItem()
    }
    else {
      setErr(null)
      setListData([...listData, { id: Date.now(), title: inputText }])
      setInputText("")
    }
  }

  console.log('listdata-', listData)


  const DeleteItem = (ele) => {
    const newData = listData.filter((data) => {
      return data.id !== ele.id
    })
    setListData(newData)
  }

  const ViewItem = (ele) => {
    setViewData(ele)
    setTimeout(() => {
      setViewData(null)
    }, 2000);
  }

  const EditItem = (item) => {
    setInputText(item.title)
    setEditData(item.id)
  }
  const CancelItem = () => {
    setInputText("")
    setEditData(null)
    setErr(null)
  }
  // const EditSubmit = () => {
  //   if (inputText === "") {
  //     setErr('Please edit the text')
  //   } else {
  //     const updateData = listData.map((ele)=>{
  //       if(ele.id === editData){
  //         ele.title =  inputText
  //       }
  //       return ele;
  //     })
  //     setListData(updateData)
  //     CancelItem()
  //   }
  // }

  return (
    <>
      <Container className='my-4 text-center'>
        <h1>TodoTask</h1>
        <Form className="justify-content-center mt-4">
          <Row>
            <Col xs={{ span: 6, offset: 2 }} >
              <Form.Control size="md" type="text" value={inputText || ''} onChange={(e) => setInputText(e.target.value)} placeholder="Enter your text here" />
              <p className='text-danger mt-2'>{err}</p>
            </Col>
            <Col xs={2}>
              {
                editData !== null ?
                  <>
                    <Button type='button' className='mx-1' variant="primary" onClick={SubmitData}>Edit Submit</Button>
                    <Button type='button' className='mx-1' variant="danger" onClick={CancelItem}>Cancel</Button>
                  </>
                  :
                  <Button type='button' variant="primary" className="mx-2 w-100" onClick={SubmitData}>Submit</Button>
              }

            </Col>
          </Row>
        </Form>
        {
          viewData ?
            <Row className='my-4'>
              <Col md={{ span: 7, offset: 2 }} className=' p-4 bg-dark text-white'>
                <p>Id -{viewData.id}</p>
                <h4>Text -{viewData.title}</h4>
              </Col>
            </Row>
            : null
        }

        <Row className='mt-4'>
          <Col md={{ span: 10, offset: 1 }}>
            {
              listData.length > 0 ?
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      listData.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {item.title}
                            </td>
                            <td>
                              <Button className='mx-1' variant="success" onClick={() => ViewItem(item)}>View</Button>
                              <Button className='mx-1' variant="warning" onClick={() => EditItem(item)}>Edit</Button>
                              <Button className='mx-1' variant="danger" onClick={() => DeleteItem(item)}>Delete</Button>

                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
                :
                null
            }

          </Col>
        </Row>
      </Container>

    </>
  )
}

export default TaskTodoApp;


