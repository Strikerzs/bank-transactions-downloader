import BasicLayout from "../components/layouts/Basic";

const HowsItsDone = () => {
  return (
    <BasicLayout title={"How it's done"}>
      <div className="flex flex-col gap-3">
        <span className="text-third">For Royal Bank of Canada (RBC):</span>
        <p className="leading-6 text-third">
          The extension sends a network request to the RBC transaction API.
          Normally, the website filters the transactions results between two
          dates. The extension removes that filter so it returns all
          transactions. No need to store anything :).
        </p>
      </div>
    </BasicLayout>
  );
};

export default HowsItsDone;
