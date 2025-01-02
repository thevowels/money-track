import {useEffect, useState} from "react";
import {supabase} from "../utils/supabaseClient.js";
import PersonCard from "./People/PersonCard.jsx";

export default function Home({session}) {

    return(
        <div className="Home">
            <div className="HomeTop">
                <div className={"container"}>
                    <p className={"welcome"}> Welcome, {session && session.user.user_metadata.display_name || "John Doe"} </p>
                </div>
            </div>
            <div className={"container"}>
                <div className={"row info-gap justify-content-center"}>
                    <div className={"homeInfo col"}>
                        <PersonCard/>
                    </div>
                    <div className={"homeInfo col"}>
                        <PersonCard/>
                    </div>
                    <div className={"homeInfo col"}>
                        <PersonCard/>
                    </div>

                </div>

            </div>
        </div>
    )
}