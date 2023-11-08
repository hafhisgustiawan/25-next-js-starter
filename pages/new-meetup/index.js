import NewMeetupForm from "@/components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const meetupHandler = (data) => {
    console.log(data);
  };

  return <NewMeetupForm onAddMeetup={meetupHandler} />;
};

export default NewMeetup;
