import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetupDetails(props) {
    return (

        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                // image="https://i.tribune.com.pk/media/images/1008232-faisalmain-1450079992/1008232-faisalmain-1450079992.jpg"
                // title="A First Meetup"
                // address="abc street islambad, Pakistan"
                // description="this is a first meetup"

                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    )

}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://hamza:24nwO2kwsepHBms9@cluster1.runvqoc.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection("meetups")
    const Get_meetupDetails = await meetupCollection.find({}, { _id: 1 }).toArray()
    client.close()

    return {
        fallback: true,
        // this path is dynamically generated according to database id
        paths: Get_meetupDetails.map((meetupDetails) => ({
            params: { meetupId: meetupDetails._id.toString() }
        })),

        // this path is statically generated according to dummy id
        // paths: [
        //     { params: { meetupId: "m1" } },
        //     { params: { meetupId: "m2" } },
        // ]

    }
}

export async function getStaticProps(context) {
    // fetch a data for single meetup 
    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://hamza:24nwO2kwsepHBms9@cluster1.runvqoc.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection("meetups")
    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) })
    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }

        // ------ dummy fetrching data ----- 

        // props: {
        //     image: "https://i.tribune.com.pk/media/images/1008232-faisalmain-1450079992/1008232-faisalmain-1450079992.jpg",
        //     id: { meetupId },
        //     title: "A First Meetup",
        //     address: "xyz street islambad, Pakistan",
        //     description: "this is a first meetup",
        // }
    }
}