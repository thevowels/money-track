import { useState, useEffect } from 'react'
import './styles/style.scss'
import {supabase} from "./utils/supabaseClient.js";
import {Auth} from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import People from "./Components/People.jsx";

function App() {
    const [session, setSession] = useState(null);
    const [tab, setTab] = useState('home');
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
                    <a className="navbar-brand" href="#">Money Track</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button
                                        className={"nav-link w-100 text-end px-2 " + (tab === 'home' ? "active" : "")}
                                        onClick={() => setTab('home')}>Home
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={"nav-link w-100 text-end px-2 " + (tab === 'people' ? "active" : "")}
                                        onClick={() => setTab('people')}>People
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={"nav-link w-100 text-end px-2 " + (tab === 'pay' ? "active" : "")}
                                        onClick={() => setTab('pay')}>Pay
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={"nav-link w-100 text-end px-2 " + (tab === 'get' ? "active" : "")}
                                        onClick={() => setTab('get')}>Get
                                    </button>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>

        </div>}
        {session && console.log(session)}
        {tab === 'home' && <div className="container-fluid"> I'm Home</div>}
        {tab === 'people' && <div className="container-fluid"><People session={session}/></div>}
        {tab === 'pay' && <div className="container-fluid"> I'm Pay</div>}
        {tab === 'get' && <div className="container-fluid"> I'm Get</div>}

    </div>
  )
}

export default App
