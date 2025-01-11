import {useEffect, useState} from "react";
import {supabase} from "../utils/supabaseClient.js";
import Card from 'react-bootstrap/Card';
import { AiFillUpCircle, AiFillDownCircle } from "react-icons/ai";
import currency from "currency.js";
import InfoCard from "./People/InfoCard.jsx";
import PersonCard from "./People/PersonCard.jsx";
import {format} from "date-fns";

export default function Home({session}) {
    const [overall, setOverall] = useState({loan:0,return:0});
    const [transactions, setTransactions] = useState([]);
    useEffect(()=>{
        let loan_return= {loan:0,return:0}
        supabase.from("loan_return")
            .select(`
                *,
                peoples(
                    *
                )
            `)
            .order('created_at',{ascending: false})
            .limit(15)
            .then(({data, error})=>{
                if(error){
                    console.log(error)
                }else if(data){
                    setTransactions(data);
                    data.forEach((record)=>{
                        if(record.loan){
                            loan_return['loan']+=record.amount;
                        }else{
                            loan_return['return']+=record.amount;
                        }
                    })
                    setOverall(loan_return);
                }
            })

    },[])

    return(
        <div className="Home">
            <div className="HomeTop">
                <div className={"container"}>
                    <p className={"welcome"}> Welcome, {session && session.user.user_metadata.display_name || "John Doe"} </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"row info-gap justify-content-center"}>
                    <div className={"homeInfo col"}>
                        <Card style={{width: '18rem'}} id={"outgoing"}>
                            <Card.Body>
                                <Card.Title className={"currency"}>Total Loan</Card.Title>
                                <div className="row currency out-mmk ">
                                    <div className="col-6 text-end p-0">
                                        {currency(overall.loan, {separator: ',', symbol: "", precision: 0}).format()}
                                    </div>
                                    <div className="col-3 text-start ps-2">
                                        MMK
                                    </div>
                                    {/*<div className="offset-1 col-2 text-center p-0">*/}
                                    {/*    <AiFillUpCircle color={"green"}/>*/}
                                    {/*    <AiFillDownCircle color={"red"}/>*/}
                                    {/*</div>*/}
                                </div>
                                {/*<Card.Subtitle className="mb-2 text-blue">Card Subtitle</Card.Subtitle>*/}
                            </Card.Body>
                        </Card>

                    </div>
                    <div className={"homeInfo col"}>
                        <Card style={{width: '18rem'}} id={"incoming"}>
                            <Card.Body>
                                <Card.Title className={"currency"}>Total Return</Card.Title>
                                <div className="row currency in-mmk ">
                                    <div className="col-6 text-end p-0">
                                        {currency(overall.return, {separator: ',', symbol: "", precision: 0}).format()}
                                    </div>
                                    <div className="col-3 text-start ps-2">
                                        MMK
                                    </div>
                                    {/*<div className="offset-1 col-2 text-center p-0">*/}
                                    {/*    <AiFillUpCircle color={"green"}/>*/}
                                    {/*    <AiFillDownCircle color={"red"}/>*/}
                                    {/*</div>*/}
                                </div>
                                {/*<Card.Subtitle className="mb-2 text-blue">Card Subtitle</Card.Subtitle>*/}
                            </Card.Body>
                        </Card>
                    </div>

                </div>
                    <div className={"col-sm-auto col-md-9 offset-md-1 pt-5 text-center primary-font"}>
                        <h3 className={"pb-2"} >Recent Transaction Records </h3>
                        {transactions.length == 0 && <div className={"container"}> You don't have transactions yet</div>}
                        {transactions && transactions.map(transaction => <div key={transaction.id} className={"row transactions"}>
                            <div className={"col-3 offset-1 text-start"}>{transaction.peoples.name}</div>
                            <div className={"col-3 text-end"} style={{'color': transaction.loan ? 'red':'green'}}>{currency(transaction.amount, {separator: ',', symbol: "", precision: 0}).format()}</div>
                            <div className={"col-5"}>
                                <div className={"row"}>
                                    <div className={"col-5 p-0 text-end"}> {format(transaction.created_at, 'dd MMM yyyy')}
                                    </div>
                                    <div className={"col-3 p-0 text-center align-items-center"}> {format(transaction.created_at, 'h:mm')}
                                    </div>
                                    <div className={"col-2  p-0 text-start"}> {format(transaction.created_at, 'a')}
                                    </div>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}