import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";


export default function NewMeetUpPage() {
    const router = useRouter()
    async function addMeetupHandler(enterMeetupData) {
        // console.log(enterMeetupData, "helooooo12")
        const response = await fetch('/api/new-meetup', {
            method: "POST",
            body: JSON.stringify(enterMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data, "responseDATA")
        router.push('/')
    }

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                    name="description"
                    content="Add your own meetups and create amazing networking oppurtunities."
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}