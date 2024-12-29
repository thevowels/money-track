import {supabase} from "../utils/supabaseClient.js";
import {format} from "date-fns";
import { useState, useEffect } from "react";
import AddPay from "./Pay/AddPay.jsx";
export default function Pay({session}) {
    const [loading, setLoading] = useState(true);
    const [pays, setPays] = useState(null);
    const [error, setError] = useState(null);
    const [display, setDisplay] = useState("primary");
    function goBack() {
        setDisplay('primary');
    }
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


    if(display === 'primary') return(
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
                <tbody>

                {pays.length > 0 ? pays.map(p => <tr key={p.id}>
                    <td></td>
                    <td>{p.peoples.name}</td>
                    <td>{p.amount}</td>
                    <td>{p.currency}</td>
                    <td>{format(p.created_at, 'dd-MMMM-yyyy')}</td>
                    <td>{p.is_repaid ? 'YES':'NO'}</td>
                </tr>) :

                        <tr className="text-center h-25">
                            <td colSpan={6} style={{lineHeight: '100px'}}>
                                You have not add any Pay Record yet.
                                <br/>
                                <button className="btn btn-outline-primary" onClick={() => setDisplay("add")}>
                                    Insert Record
                                </button>
                            </td>
                        </tr>}
                </tbody>

            </table>
            {pays.length > 0 ? <div className={"text-end"}>
                <button className="btn btn-outline-primary" onClick={()=>setDisplay('add')}>Insert Record</button>
            </div>: null}

        </div>
    )

    if(display === "add"){
        return (
            <>
                <AddPay goBack={goBack}/>
            </>
        )
    }
}