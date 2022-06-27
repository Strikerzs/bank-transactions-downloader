import BasicLayout from "../components/layouts/Basic";

const PrivacyPolicy = () => {
  return (
    <BasicLayout title={"Privacy Policy"}>
      <p className="leading-6 text-third">
        We do not store any data remotely. The only real data stored is your bank preference and that is stored locally on your computer. Nothing else is stored. No
        bank details, no user information (e.g. location, name).
      </p>
    </BasicLayout>
  );
};

export default PrivacyPolicy;
