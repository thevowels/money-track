import { useState, useEffect } from 'react'
import './styles/style.scss'
import {supabase} from "./utils/supabaseClient.js";
import {Auth} from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared'
import People from "./Components/People.jsx";
import Pay from "./Components/Pay.jsx";
import Home from "./Components/Home.jsx";
import PersonDetail from "./Components/People/PersonDetail.jsx";

function App() {
    const [session, setSession] = useState(null);
    const [tab, setTab] = useState('home');
    const [person, setPerson] = useState(null);
    useEffect(() => {
        console.log('I log because its under development yet.')
        console.log("On form>select, I had to use default as I don't want to select user by default ")
        supabase.auth.getSession()
            .then(({data:{session}})=>{
                setSession(session);
            });
        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session);
        })
    },[])
    useEffect(() =>{
        document.title = 'Money Track '+ tab.toUpperCase();
    },[tab])

  return (
    <div >
        {!session ?<div className={"col-md-8 col-lg-5 mx-auto px-5"}>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }}/>
        </div>: <div >
            <div className="container">
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

            </div>
            {tab === 'home' && <div><Home session={session}/></div>}
            {tab === 'people' && <div className="container-fluid"><People session={session} setPerson={setPerson} setTab={setTab}/></div>}
            {tab === 'pay' && <div className="container-fluid"><Pay session={session}/></div>}
            {tab === 'get' && <div className="container-fluid"> I'm Get</div>}
            {tab === 'person' && !person && <div className="container-fluid">It shouldn't be happened</div>}
            {tab === 'person' && person && <div className="container-fluid"><PersonDetail person={person} session={session}/> </div>}

        </div>
        }

    </div>
  )
}

export default App
