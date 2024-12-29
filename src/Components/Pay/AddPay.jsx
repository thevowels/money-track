import {useEffect, useState} from "react";
import {supabase} from "../../utils/supabaseClient.js";

export default function AddPay({session, goBack}) {

    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPersons();
    },[])

    async function fetchPersons(){
        const {data, error } = await supabase.from('peoples').select('id, name');
        if(error){
            setError(error);
        }else {
            setPersons(data);
            if(data.length === 0){
                setError(new Error('You need to add people first'));
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        // allow inserts only if the person_id is one of the created person.
        if( !persons.map(p => p.id).includes(e.target.person.value) ){
            alert('You need to choose a valid person')
            return;
        }else if(e.target.amount.value <=0 ){
            alert('You need to add a valid amount');
            return;
        }
        const record = {
            person_id: e.target.person.value,
            amount: e.target.amount.value,
            currency: e.target.currency.value,
            user_id: session.user.id
        }
        const { err } = await supabase.from('pay_records').insert(record);
        if(err){
            console.log(err);
        }else{
            goBack();
        }
        // console.log(record);

    }
    if(error) return <div>
        You've faced an error. Read the error message. If you can't solve, Please contact the developer
        <p className={"text-danger text-lg-center"}>{error.message}</p>
    </div>;

    return(
        <div>
            <form className={"col-10 col-md-8 col-lg-5 mx-auto"} onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Person</label>
                    </div>
                    <div className="col-9">
                        <select className="form-select" aria-label="Default select example" name={"person"} >
                            <option selected disabled>Choose the person</option>
                            {persons.map(person => (<option key={person.id} value={person.id}>{person.name}</option>))}

                        </select>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Amount</label>
                    </div>
                    <div className="col-9">
                        <input type="number" className="form-control" name={"amount"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Currency</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"currency"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                    </div>

                    <div className="col-9 text-center">
                        <button type="submit" className="btn btn-primary px-3 mx-2 mt-2">Add</button>
                        <button className={"btn btn-outline-dark px-3 mx-2 mt-2"} onClick={e => {
                            e.preventDefault();
                            goBack();
                        }}>Back
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}