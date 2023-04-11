import MeetupDetail from "@/components/meetups/MeetupDetail";


export default function MeetupDetails() {
    return (
        <MeetupDetail
            image="https://i.tribune.com.pk/media/images/1008232-faisalmain-1450079992/1008232-faisalmain-1450079992.jpg"
            title="A First Meetup"
            address="abc street islambad, Pakistan"
            description="this is a first meetup"
        />
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { meetupId: "m1" } },
            { params: { meetupId: "m2" } },
        ],
        fallback: true
    }
}

export async function getStaticProps(context) {
    // fetch a data for single meetup 
    const meetupId = context.params.meetupId
    return {
        props: {
            image: "https://i.tribune.com.pk/media/images/1008232-faisalmain-1450079992/1008232-faisalmain-1450079992.jpg",
            id: { meetupId },
            title: "A First Meetup",
            address: "xyz street islambad, Pakistan",
            description: "this is a first meetup",
        }
    }
}