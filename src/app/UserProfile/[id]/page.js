'use client'
import { useParams } from "next/navigation"
export default function UserProfile(){
    const params = useParams();
    const email = params.id;
    return(
        <>
        <h1>
            User Email is : {email}
        </h1>
        </>
    )
}