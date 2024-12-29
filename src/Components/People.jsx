import {supabase} from "../utils/supabaseClient.js";
import {useEffect, useState} from "react";

export default function People(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [people, setPeople] = useState(null);
    useEffect(() => {
        const people = fetchPeople();
    }, []);
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
    if(people){
        return(
            <div>
                {people.map(p => <div key={p.id}>{p.name}</div>)}
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
                                <button className="btn btn-primary">Add People</button>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>

            </div>
        )

    }
}