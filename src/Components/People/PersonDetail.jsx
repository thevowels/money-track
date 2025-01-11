import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { AiOutlinePhone, AiOutlinePicLeft } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {supabase} from "../../utils/supabaseClient.js";

import {Suspense, useState} from "react";
import Transactions from "./Transactions.jsx";
export default function PersonDetail({person,session}){

    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState("default");
    const [toggle, setToggle] = useState(false);

    const [transactionadd, setTransactionadd] = useState(false);
    const handleTAClose = () =>setTransactionadd(false);
    const handleTAShow = () => setTransactionadd(true);
    async function handleTASubmit(e){
        e.preventDefault();
        console.log('Handling the form submit');
        const data = {
            person_id :person.id,
            amount: e.target.amount.value,
            loan: e.target.type.value,
            user_id: session.user.id,
        }
        const {error} = await supabase.from('loan_return').insert(data);
        if(error){
            console.log(error);
            alert("Error occured while inserting records.")
        }else if(!error){
            handleTAClose();
            setToggle(!toggle);
        }
    }

    if(display === "default"){
        return(
            <div>

                <Modal show={transactionadd} onHide={handleTAClose} className={"p-5"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleTASubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Person</Form.Label>
                                <Form.Control type="email" disabled placeholder="Enter email" value={person.name} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" placeholder="" />
                                <Form.Text className="text-muted">
                                    Enter the Amount you give to/ receive from the person
                                </Form.Text>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="type">
                                <Form.Select defaultValue={true}>
                                    <option value={true} >Loan</option>
                                    <option value={false}>Return</option>
                                </Form.Select>
                            </Form.Group>
                            <div className={"text-end me-3"}>

                                <Button type="submit" className={"me-3 w-25"} variant={"primary"}>Submit</Button>
                                <Button variant="secondary" className={"w-25"} onClick={handleTAClose}>
                                    Close
                                </Button>
                            </div>
                        </Form>

                    </Modal.Body>
                </Modal>


                <div className={"person-top"}>
                </div>
                <div className={"container"}>
                    <Card  border={"info"} className=" container person-head p-3">
                        <Row xs={1} md={1} lg={2}>
                            <Col className={"text-center p-3"}>
                                <Image fluid rounded src="cat.jpg"/>
                            </Col>
                            <Col className={"p-3 text-center"}>
                                <Card.Body className="text-start">
                                    <p className={"person-detail-name"}>{person.name}</p>
                                    <Row className={"align-items-baseline"}>
                                        <Col xs={2}>
                                            <AiOutlinePhone className="person-detail-icons text-end" size={35} />
                                        </Col>
                                        <Col xs={10}>
                                            <p className={"person-details"} onClick={(e) => {
                                                navigator.clipboard.writeText(e.target.innerText)
                                            }
                                            }>{person.phone}</p>
                                        </Col>
                                    </Row>
                                    <Row className={"align-items-baseline"}>
                                        <Col xs={2}>
                                            <AiOutlinePicLeft className="person-detail-icons text-end" size={35} />
                                        </Col>
                                        <Col xs={10}>
                                            <p className={"person-details"} onClick={(e) => {
                                                navigator.clipboard.writeText(e.target.innerText)
                                            }
                                            }>{person.nrc}</p>
                                        </Col>
                                    </Row>
                                    <Row className={"align-items-baseline"}>
                                        <Col xs={2}>
                                            <BiMap className="person-detail-icons text-end" size={35} />
                                        </Col>
                                        <Col xs={10}>
                                            <p className={"person-details"} onClick={(e) => {
                                                navigator.clipboard.writeText(e.target.innerText)
                                            }
                                            }>{person.address}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                <button className={"person-edit-button btn btn-outline-primary"}>
                                    Edit Details
                                </button>
                            </Col>
                        </Row>
                        <Col className={"container pt-4 pb-4 mx-auto text-center"}>

                            <Suspense fallback={<div>Loading...</div>}>
                                    <Transactions person_id={person.id} toggle={toggle}/>
                            </Suspense>

                            <div>
                                <button className={"btn btn-primary"} onClick={handleTAShow}>Add Record</button>
                            </div>
                        </Col>
                    </Card>
                </div>


            </div>

        )

    }

}