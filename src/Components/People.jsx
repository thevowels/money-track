import {supabase} from "../utils/supabaseClient.js";
import {useEffect, useState} from "react";
import AddPeople from "./People/AddPeople.jsx";
import EditPeople from "./People/EditPeople.jsx";
import * as bootstrap from "bootstrap";
export default function People({session}) {
    const [pinCode, setPinCode] = useState("1234");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [people, setPeople] = useState(null);
    const [display, setDisplay] = useState("primary");
    const [toEdit, setToEdit] = useState(null);
    const [toRemove, setToRemove] = useState(null);



    const goBack = () => setDisplay("primary");
    useEffect(() => {

        fetchPeople();
        // console.log(myModal);
    }, [display]);
    async function fetchPeople() {
        setLoading(true);
        const {data, error} = await supabase.from('peoples').select('*');
        if(error) {
            setError(error);
        }else if(data) {
            setPeople(data);
        }
        setLoading(false);
    }
    function editPeople(p){
        setToEdit(p);
        setDisplay("edit");

    }
    async function removePeople(){
        console.log(toRemove);
        var myModalEl = document.querySelector('#exampleModal');
        var inputPin = document.getElementById("confirmPin").value;

        console.log(inputPin);
        if(inputPin == pinCode ){
            myModalEl.display="none"
            myModalEl.classList.remove('show');
            document.getElementsByClassName("modal-backdrop")[0].remove();
            const response = await supabase
                .from('peoples')
                .delete()
                .eq('id', toRemove.id);
            if(response.status === 204){
                alert("You've successfully removed " + toRemove.name);
                fetchPeople();
            }else{
                console.log('something went wrong & ' , response);
            }

        }else {
            alert("Incorrect Pin");
        }


    }

    if(error) return <div>
        You've faced an error. Please contact the developer
        <p>{error.message}</p>
    </div>;
    if(loading) return <div>Loading...</div>;
    if(people && display === "primary") {
        return(
            <div>

                {/*Modal*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to remove {toRemove ? toRemove.name:''}
                                <br/>
                                Type In 1234 to confirm
                                <input type={"password"} name={"confirmPin"} className={"form-control"} id={"confirmPin"}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={removePeople}>I'm Sure</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*Modal*/}

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
                            <td className={"text-center"}>
                                <button className={"btn btn-outline-primary px-3 me-1 btn-sm"}
                                        onClick={() => editPeople(p)}>Edit
                                </button>
                                <button className={"btn btn-outline-danger px-3 btn-sm m"} data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => setToRemove(p)}>Remove
                                </button>
                            </td>
                        </tr>) :
                        <tr className="text-center h-25">
                            <td colSpan={5} style={{lineHeight: '100px'}}>
                                You have not add any people yet.
                                <br/>
                                <button className="btn btn-outline-primary" onClick={() => setDisplay('add')}>Add
                                    People
                                </button>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
                {people.length > 0 ? <div className={"text-end"}>
                    <button className="btn btn-outline-primary" onClick={() => setDisplay('add')}>Add People</button>
                </div> : null}
            </div>
        )

    }
    if (display === "add") {
        return (
            <>
                <AddPeople session={session} goBack={goBack}/>
            </>
        )
    }
    if (display == "edit") {
        return (
            <>
                <EditPeople toEdit={toEdit} goBack={goBack}/>
            </>
        )
    }
}