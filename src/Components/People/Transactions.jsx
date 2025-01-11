import {Suspense, useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {supabase} from "../../utils/supabaseClient.js";
import {format} from "date-fns";

export default function  Transactions({person_id}) {


    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState({});
    useEffect(() => {
        fetchTransactions();
    },[])

    async function fetchTransactions() {
        setLoading(true);

        const { data, error} = await supabase.from('loan_return').select('*').eq('person_id', person_id);
        if(error){
            console.log(error);
        }else if(data){
            setTransactions(data);
            console.log('transactions', data);
        }
        setLoading(false);
    }
    if(loading){
        return(
            <div>
                Fetching Data.
            </div>
        )
    }

    return(

        <>

            {transactions.length == 0 &&  <h3>This person doesn't have reocrds Yet</h3>}

            {transactions.length > 0 &&
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Loan/Return</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                            <td>{index}</td>
                            <td>{format(transaction.created_at, 'dd-MMM-yyyy')}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.loan ? "Loan": "Return"}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>

            }

        </>
    )
}