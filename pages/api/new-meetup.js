// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {  //POST api of new meetup page
    const data = req.body
    console.log(data, "data--")
    // const { title, image, address, description } = data
    
    //this link we get from mongodb database to connect with app
    const client = await MongoClient.connect('mongodb+srv://hamza:24nwO2kwsepHBms9@cluster1.runvqoc.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')

    const result = await meetupCollection.insertOne(data)
    console.log(result, "resilt----")
    client.close() //to close the db once done

    res.status(201).json({ message: "meetup insert successfully!" })
  }
}
