import Card from 'react-bootstrap/Card';
import { AiFillUpCircle, AiFillDownCircle } from "react-icons/ai";

import Image from 'react-bootstrap/Image';
import currency from "currency.js";

export default function PersonCard({person}){
        return (
        <Card style={{ width: '14rem' }} className="mx-auto">
            <Card.Body>
                <div className="text-center">
                    <Image src={"/cat.jpg"} width={"150px"} height={"150px"} roundedCircle/>

                </div>
                <div className="person-name">
                    {person && person.name}
                </div>
                {/*<div className={"row person-money"}>*/}
                {/*    <div className="col-3 p-0 text-end text-muted">*/}
                {/*        Loan*/}
                {/*    </div>*/}
                {/*    <div className={"col-5 text-end text-muted"}>*/}
                {/*        {currency(3000, {separator: ',', symbol: "", precision: 0}).format()}*/}
                {/*    </div>*/}
                {/*    <div className={"col-2 p-0 text-muted"}>*/}
                {/*        MMK*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className={"row person-money"}>*/}
                {/*    <div className="col-3 p-0 text-end text-muted">*/}
                {/*        Repaid*/}
                {/*    </div>*/}
                {/*    <div className={"col-5 text-end text-muted"}>*/}
                {/*        {currency(3000, {separator: ',', symbol: "", precision: 0}).format()}*/}
                {/*    </div>*/}
                {/*    <div className={"col-2 p-0 text-muted"}>*/}
                {/*        MMK*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"row person-money"}>
                    <div className="col-1 p-0 text-end">

                    </div>
                    <div className={"col-6 text-end"}>
                        {currency(person.outstanding_amount, {separator: ',', symbol: "", precision: 0}).format()}
                    </div>
                    <div className={"col-3 p-0 "}>
                        MMK
                    </div>
                    <div className={"col-2 p-0 text-center"}>
                        {person.outstanding_amount <= 300000 && <AiFillDownCircle color={"green"}/>}
                        {person.outstanding_amount > 300000 && <AiFillDownCircle color={"orange"}/>}
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}