import NewMeetupForm from "@/components/meetups/NewMeetupForm";


export default function NewMeetUpPage() {

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
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}