import {supabase} from "../utils/supabaseClient.js";
import {useEffect, useState} from "react";
import AddPeople from "./People/AddPeople.jsx";

export default function People({session}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [people, setPeople] = useState(null);
    const [display, setDisplay] = useState("primary");
    const goBack = () => setDisplay("primary");
    useEffect(() => {
        const people = fetchPeople();
    }, [display]);
    async function fetchPeople() {
        setLoading(true);
        const {data, error} = await supabase.from('peoples').select('*');
        if(error) {
            setError(error);
        }else if(data) {
            console.log(data);
            setPeople(data);
        }
        setLoading(false);
    }

    if(error) return <div>
        You've faced an error. Please contact the developer
        <p>{error.message}</p>
    </div>;
    if(loading) return <div>Loading...</div>;
    if(people && display === "primary") {
        return(
            <div>
                <table className="table table-striped table-hover user-table">
                    <caption>People list</caption>
                    <thead className="bg-info text-light">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>NRC</th>
                        <th className={"d-none d-sm-table-cell"}>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {people.length > 0 ? people.map(p => <tr key={p.id}>
                            <td><input type={"checkbox"} name={'check' + p.id}/></td>
                            <td>{p.name}</td>
                            <td>{p.phone}</td>
                            <td>{p.nrc}</td>
                            <td className={"d-none d-sm-table-cell"}>{p.address || '-'}</td>
                        </tr>) :
                        <tr className="text-center h-25" >
                            <td colSpan={5} style={{lineHeight:'100px'}}>
                                You have not add any people yet.
                                <br/>
                                <button className="btn btn-outline-primary" onClick={setDisplay('add')}>Add People</button>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
                {people.length > 0 ? <div className={"text-end"}>
                    <button className="btn btn-outline-primary" onClick={()=>setDisplay('add')}>Add People</button>
                </div>: null}

            </div>
        )

    }
    if(display ==="add"){
        return(
            <>
                <AddPeople session={session} goBack={goBack}/>
            </>
        )
    }
}