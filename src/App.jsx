import { useState, useEffect } from 'react'
import './styles/style.scss'
import {supabase} from "./utils/supabaseClient.js";
import {Auth} from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'

function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession()
            .then(({data:{session}})=>{
                setSession(session);
            });
        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        })
    },[])

  return (
    <div className="container">
        {!session ?<div className={"col-md-8 col-lg-5 mx-auto px-5"}>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>
        </div>: <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link w-100">Home</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link w-100">People</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link w-100">Pay</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link w-100">Get</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>}
        {session && console.log(session)}

    </div>
  )
}

export default App
