//for server auto detect by next js
import { MongoClient } from 'mongodb';

//for client
import Head from 'next/head';
import MeetupList from '@/components/meetups/MeetupList';
import { Fragment } from 'react';

const Home = ({ meetups }) => {
  // return <p>Bisa kok</p>;
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browsa a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

//THIS FUNCTION IS ONLY AVAILABLE IN PAGES FOLDER
//THIS PREPARE PROPS / DATA BEFORE COMPONENT RENDERED
//THIS DATA RETURN WILL AVAILABLE IN PROPS COMPONENT
//THIS GOOD FOR SEO
//CEK VIDEO 547

export const getStaticProps = async () => {
  //disini, bisa gunakan kodingan server seperti konek ke db dll, karena ini akan di eksekusi di back end bukan di front end
  //TAPI DALAM HAL INI HANYA STATIC, KETIKA DI DB BERUBAH, DISINI GAK AKAN BERUBAH, ALTERNATIVE BISA PAKE REVALIDATE DI OBJ RETURNED NYA, ITUPUN TIDAK BERLAKU UNTUK SETIAP REQUEST, TAPI BERDASARKAN WAKTU

  //1) START FETCH DATA DIRECT TO MONGO CLIENT
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client?.db();
  const Meetups = db.collection('meetups');
  const meetups = await Meetups.find().toArray();
  client.close();
  //1) END FETCH DATA DIRECT TO MONGO CLIENT

  //RETURN REQUIRED!!!
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        };
      }),
    },
    //incremental static generation
    revalidate: 10, //its will revalidate data every 10 second if there are request. cek video 549
  };
};

// export const getServerSideProps = async (context) => {
//   //this always be running in the server. You can use any credential here.

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default Home;
