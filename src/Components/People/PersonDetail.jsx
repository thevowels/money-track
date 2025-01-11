import Card from "react-bootstrap/Card";
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { AiOutlinePhone, AiOutlinePicLeft } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {Suspense, useState} from "react";
import Transactions from "./Transactions.jsx";
export default function PersonDetail({person}){


    const [loading, setLoading] = useState(false);
    const [display, setDisplay] = useState("default");

    const [transactionadd, setTransactionadd] = useState(false);
    const handleTAClose = () =>setTransactionadd(false);
    const handleTAShow = () => setTransactionadd(true);


    console.log(person);
    if(display === "default"){
        return(
            <div>

                <Modal show={transactionadd} onHide={handleTAClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleTAClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleTAShow}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
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
                                <Transactions person_id={person.id}/>
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