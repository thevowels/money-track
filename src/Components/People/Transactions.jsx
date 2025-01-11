import {Suspense, useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {supabase} from "../../utils/supabaseClient.js";

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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>

            }

        </>
    )
}