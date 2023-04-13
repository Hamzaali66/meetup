import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: "A First Meetup",
//     image: "https://i.tribune.com.pk/media/images/1008232-faisalmain-1450079992/1008232-faisalmain-1450079992.jpg",
//     address: "xyz street islambad, Pakistan",
//     description: "this is a first meetup"
//   },
//   {
//     id: 'm2',
//     title: "A second Meetup",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW3vyt6ZcBnBVmOg29p7AehwfRxbjERm49sQ&usqp=CAU",
//     address: "xyz street Lahore, Pakistan",
//     description: "this is a second meetup"
//   }
// ]
export default function HomePage(props) {

  return (
    <Fragment>
      <Head>
        <title>Meetup App</title>
        <meta
          name="description"
          content="Browse a huge list of meetup place in pakistan!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://hamza:24nwO2kwsepHBms9@cluster1.runvqoc.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db()
  const meetupCollection = db.collection('meetups')

  const Get_meetups = await meetupCollection.find().toArray()
  client.close()
  return {
    props: {
      // meetups: DUMMY_MEETUPS
      meetups: Get_meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,

      }))
    },
    revalidate: 1
  }
}