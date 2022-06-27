import BasicLayout from "../components/layouts/Basic"

const Contribute = () => {
    return <BasicLayout title="Contribute">
        <div className="flex flex-col gap-5">
            <p className="leading-6 text-third">{"This project is open source and is hosted on GitHub (link in the footer below). You can contribute there by adding new supported banks, fixing issues, or adding new features."}</p>
        </div>
    </BasicLayout>
}

export default Contribute