import BasicLayout from "../components/layouts/Basic"

const ReportABug = () => {
    return <BasicLayout title="Report A Bug">
        <div className="flex flex-col gap-5">
            <p className="leading-6 text-third">Encountered a bug? Report it to us through email at strikerzs.dev@gmail.com</p>
            <p className="leading-6 text-third">{"If you have a GitHub account, you can also open an issue in the GitHub repository (link in the footer below)."}</p>
        </div>
    </BasicLayout>
}

export default ReportABug