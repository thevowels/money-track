import {supabase} from "../utils/supabaseClient.js";
import {useEffect, useState} from "react";
import AddPeople from "./People/AddPeople.jsx";
import EditPeople from "./People/EditPeople.jsx";

export default function People({session}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [people, setPeople] = useState(null);
    const [display, setDisplay] = useState("primary");
    const [toEdit, setToEdit] = useState(null);
    const goBack = () => setDisplay("primary");
    useEffect(() => {
        fetchPeople();
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
    function editPeople(p){
        setToEdit(p);
        setDisplay("edit");

    }

    if(error) return <div>
        You've faced an error. Please contact the developer
        <p>{error.message}</p>
    </div>;
    if(loading) return <div>Loading...</div>;
    if(people && display === "primary") {
        return(
            <div>
                <table className="table table-striped table-hover user-table table-bordered">
                    <caption>People list</caption>
                    <thead className="bg-info text-light text-center">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th className={"d-none d-sm-table-cell"}>NRC</th>
                        <th className={"d-none d-sm-table-cell"}>Address</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {people.length > 0 ? people.map(p => <tr key={p.id}>
                            <td><input type={"checkbox"} name={'check' + p.id}/></td>
                            <td>{p.name}</td>
                            <td>{p.phone}</td>
                            <td className={"d-none d-sm-table-cell"}>{p.nrc}</td>
                            <td className={"d-none d-sm-table-cell"}>{p.address || '-'}</td>
                            <td className={"text-center"}> <button className={"btn btn-outline-primary px-3"} onClick={()=>editPeople(p) }>Edit</button> </td>
                        </tr>) :
                        <tr className="text-center h-25" >
                            <td colSpan={5} style={{lineHeight:'100px'}}>
                                You have not add any people yet.
                                <br/>
                                <button className="btn btn-outline-primary" onClick={() => setDisplay('add')}>Add People</button>
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
    if(display == "edit") {
        return(
            <>
                <EditPeople toEdit={toEdit} goBack={goBack}/>
            </>
        )
    }
}