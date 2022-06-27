import BasicLayout from "../components/layouts/Basic";

const About = () => {
  return (
    <BasicLayout title={"About"}>
      <p className="leading-6 text-third">
        We created this extension because a bank did not have the functionality
        to download all transactions as a CSV file.
      </p>
    </BasicLayout>
  );
};

export default About;
