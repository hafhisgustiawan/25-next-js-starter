import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://memberpress.com/wp-content/uploads/2019/10/Member-Meetup@2x.png",
    address: "Columbia, stand alone street : 01A",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://memberpress.com/wp-content/uploads/2019/10/Member-Meetup@2x.png",
    address: "Columbia, stand alone street : 02A",
    description: "This is a second meetup!",
  },
  {
    id: "m3",
    title: "A Thirs Meetup",
    image:
      "https://memberpress.com/wp-content/uploads/2019/10/Member-Meetup@2x.png",
    address: "Columbia, stand alone street : 03A",
    description: "This is a third meetup!",
  },
];

const Home = () => {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
};

export default Home;
