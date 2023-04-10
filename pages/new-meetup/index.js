import NewMeetupForm from "@/components/meetups/NewMeetupForm";


export default function NewMeetUpPage(){

    function addMeetupHandler(enterMeetupData){
        console.log(enterMeetupData, "helooooo12")
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}