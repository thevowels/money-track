import {supabase} from "../utils/supabaseClient.js";
import {format} from "date-fns";
import { useState, useEffect } from "react";
export default function Pay({session}) {
    const [loading, setLoading] = useState(true);
    const [pays, setPays] = useState(null);
    const [error, setError] = useState(null);
    useEffect(()=> {
        fetchPays();
    },[])
    async function fetchPays() {
        console.log('fetching');
        setLoading(true);
        const { data, error } = await supabase
            .from('pay_records')
            .select(`
                *,
                peoples(
                    *
                )
                    `);
        if(error){
            setError(error);
        }else{
            setPays(data);
            console.log('data', data);
            setLoading(false);
        }
    }
    if(error) return <div>
        You've faced an error. Please contact the developer
        <p>{error.message}</p>
    </div>;
    if(loading) return <div>Loading...</div>;


    return(
        <div>
            <table className="table table-striped table-hover pay-table">
            <caption>Pay Records</caption>
                <thead className={'bg-info text-light'}>
                <tr>
                    <th></th>
                    <th>Person</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Pay Date</th>
                    <th>Is Repaid</th>
                </tr>
                </thead>
                {pays.length > 0 ? pays.map(p => <tr key={p.id}>
                    <td></td>
                    <td>{p.peoples.name}</td>
                    <td>{p.amount}</td>
                    <td>{p.currency}</td>
                    <td>{format(p.created_at, 'dd-MMMM-yyyy')}</td>
                    <td>{p.is_repaid ? 'YES':'NO'}</td>
                </tr>) :
                    <tr>
                        <tr className="text-center h-25">
                            <td colSpan={5} style={{lineHeight: '100px'}}>
                                You have not add any Pay Record yet.
                                <br/>
                                <button className="btn btn-outline-primary">
                                    Insert Record
                                </button>
                            </td>
                        </tr>

                    </tr>}
            </table>
        </div>
    )
}