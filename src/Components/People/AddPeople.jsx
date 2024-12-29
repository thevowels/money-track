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
        if(error){
            console.log(error);
        }else if(!error){
            goBack();
        }
    }

    return(
        <div className="mt-5 container" >
            <form className={"col-10 col-md-8 col-lg-5 mx-auto"} onSubmit={handleSubmit}>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Name</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"name"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Phone</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"phone"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">NRC</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"nrc"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                        <label className="col-form-label">Address</label>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control" name={"address"}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center mb-3">
                    <div className="col-3">
                    </div>

                    <div className="col-9 text-center">
                        <button type="submit" className="btn btn-primary px-3 mx-2 mt-2">Add</button>
                        <button className={"btn btn-outline-dark px-3 mx-2 mt-2"} onClick={e=> {e.preventDefault();goBack();}}>Back</button>

                    </div>

                </div>

                {/*<div className={"row mt-5 justify-content-center "}>*/}
                {/*    <div className="col-6">*/}
                {/*    </div>*/}
                {/*    <div className="col-6">*/}

                {/*    </div>*/}
                {/*</div>*/}


            </form>

        </div>
    )
}