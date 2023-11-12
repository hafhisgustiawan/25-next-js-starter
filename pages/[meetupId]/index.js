import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '@/components/meetups/MeetupDetail';

const MeetupDetailPage = ({ meetup }) => {
  return (
    <MeetupDetail
      image={meetup?.image}
      title={meetup?.title}
      address={meetup?.address}
      description={meetup?.description}
    />
  );
};

//ini wajid digunakan ketika kita pakai dinamic route seperti file ini [meetupId]
//ini hanya bisa digunakan ketika ada getStaticProps
//ini berfungsi untuk generate path yang boleh (fallback : false) atau secara dinamic boleh semua (fallback : true)
export const getStaticPaths = async () => {
  //JANGAN LUPA DI RESTART DEV SERVER ATAU REBUILD YA, KALO GAK KODINGAN INI GAK AKAN DI KENALI

  //1) START FETCH DATA DIRECT TO MONGO CLIENT
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client?.db();

  const Meetups = db.collection('meetups');
  const meetups = await Meetups.find({}, { _id: 1 }).toArray();
  client?.close();

  return {
    paths: meetups?.map((meetup) => ({
      params: { meetupId: meetup?._id.toString() },
    })),

    fallback: 'blocking', //cek video 559
  };
  // return {
  //   paths: [
  //     {
  //       params: {
  //         meetupId: 'm1',
  //       },
  //     },
  //     {
  //       params: {
  //         meetupId: 'm2',
  //       },
  //     },
  //   ],
  //   fallback: false,
  // };
};

export const getStaticProps = async (context) => {
  const meetupId = context?.params?.meetupId;

  //1) START FETCH DATA DIRECT TO MONGO CLIENT
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();

  const Meetups = db.collection('meetups');
  const meetup = await Meetups.findOne({ _id: new ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetup: {
        id: meetup?._id.toString(),
        image: meetup?.image,
        title: meetup?.title,
        address: meetup?.address,
        description: meetup?.description,
      },
    },
    revalidate: 10,
  };
};

export default MeetupDetailPage;
