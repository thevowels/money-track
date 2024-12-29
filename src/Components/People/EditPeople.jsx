import {useReducer, useState} from "react";
import {supabase} from "../../utils/supabaseClient.js";

export default function EditPeople({toEdit, goBack}) {
    const [ name, setName ] = useState(toEdit.name);
    const [ phone, setPhone ] = useState(toEdit.phone);
    const [ nrc, setNrc ] = useState(toEdit.nrc);
    const [ address, setAddress ] = useState(toEdit.address);
    async function  handleSubmit(e) {
        e.preventDefault();
        const user = {
            name : name,
            phone : phone,
            nrc : nrc,
            address : address,
        }
        const {error } = await supabase.from('peoples')
            .update(user)
            .eq('id', toEdit.id);
        if(error){
            console.error(error);
        }else{
            alert('Updated user');
            goBack();

        }
    }
    return (
        <div className="mt-5 container">
            <form className={"col-10 col-md-8 col-lg-5 mx-auto"} onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Name</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Phone</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"phone"} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">NRC</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"nrc"} value={nrc} onChange={(e) => setNrc(e.target.value)}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Address</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"address"} value={address} onChange={(e) => setAddress(e.target.value)}/>
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

        </div>)
}