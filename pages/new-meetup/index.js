import Head from 'next/head';
import NewMeetupForm from '@/components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const NewMeetup = () => {
  const router = useRouter();

  const meetupHandler = async (data) => {
    const res = await fetch('api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const result = await res?.json();
    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create great network oportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={meetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
