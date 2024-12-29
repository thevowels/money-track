import {supabase} from "../../utils/supabaseClient.js";
export default function AddPeople({session, goBack}) {

    async function handleSubmit(e){
        e.preventDefault();
        console.log('session', session);
        const people = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            nrc: e.target.nrc.value,
            address: e.target.address.value,
            user_id: session.user.id,
        }
        const {error } = await supabase
            .from('peoples')
            .insert(people)
        // console.log(e.target.name.value);
        if(error){
            console.log(error);
        }else if(!error){
            goBack();
        }
    }

    return(
        <div className="mt-5 container" >
            <form className={"col-10 col-md-4 mx-auto"} onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-auto">
                        <label className="col-form-label">Name</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" name={"name"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-auto">
                        <label className="col-form-label">Phone</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" name={"phone"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-auto">
                        <label className="col-form-label">NRC</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" name={"nrc"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-auto">
                        <label className="col-form-label">Address</label>
                    </div>
                    <div className="col-auto">
                        <input type="text" className="form-control" name={"address"}/>
                    </div>
                </div>
                <div className={"text-center mt-5"}>
                    <button type="submit" className="btn btn-primary px-5">Add</button>

                </div>


            </form>

        </div>
    )
}