import { MongoClient } from 'mongodb';

//ini akan di eksekusi di server dan bukan di browser
//routing nya akan sesuai nama file /api/new-meetup

const handler = async (req, res) => {
  if (req?.method !== 'POST') throw new Error('Cant find this routing');
  const data = req?.body;
  // console.log(data);

  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client?.db();

  const Meetups = db.collection('meetups');

  const result = await Meetups.insertOne(data);

  client.close();

  res.status(201).json({ message: 'Meetup inserted!', result });
};

export default handler;
