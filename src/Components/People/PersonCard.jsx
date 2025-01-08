import Card from 'react-bootstrap/Card';
import { AiFillUpCircle, AiFillDownCircle } from "react-icons/ai";

import Image from 'react-bootstrap/Image';
import currency from "currency.js";

export default function PersonCard({person}){
    console.log(person);
    return (
        <Card style={{ width: '18rem' }} className="mx-auto">
            <Card.Body>
                <div className="text-center">
                    <Image src={"/cat.jpg"} width={"150px"} height={"150px"} roundedCircle/>

                </div>
                <div className="person-name">
                    {person && person.name}
                </div>
                <div className={"row person-money"}>
                    <div className="col-3 p-0 text-end text-muted">
                        Loan
                    </div>
                    <div className={"col-3 text-end text-muted"}>
                        {currency(3000, {separator: ',', symbol: "", precision: 0}).format()}
                    </div>
                    <div className={"col-3 text-muted"}>
                        MMK
                    </div>
                </div>
                <div className={"row person-money"}>
                    <div className="col-3 p-0 text-end text-muted">
                        Repaid
                    </div>
                    <div className={"col-3 text-end text-muted"}>
                        {currency(3000, {separator: ',', symbol: "", precision: 0}).format()}
                    </div>
                    <div className={"col-3 text-muted"}>
                        MMK
                    </div>
                </div>
                <div className={"row person-money"}>
                    <div className="col-3 p-0 text-end">
                        Total
                    </div>
                    <div className={"col-3 text-end"}>
                        {currency(3000, {separator: ',', symbol: "", precision: 0}).format()}
                    </div>
                    <div className={"col-3 "}>
                        MMK
                    </div>
                    <div className={"col-3"}>
                        <AiFillDownCircle color={"red"}/>
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}