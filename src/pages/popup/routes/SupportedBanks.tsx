import BasicLayout from "../components/layouts/Basic"
import { BANKS } from "../../../constants"

const SupportedBanks = () => {
    return <BasicLayout title="Supported Banks">
        <div className="flex flex-col gap-5">
            <p className="leading-6 text-third">{"Below is the list of supported banks:"}</p>
            <table className="text-sm border-collapse mt-4 w-full table-fixed">
                <tbody>
                    <tr>
                        <th className="text-third w-1/2 text-left py-2 px-2">Bank</th> 
                        <th className="text-third w-1/2 text-left py-2 px-2">Country</th>
                    </tr>
                    {BANKS.map((bank) => {
                        return <tr className="bg-white/10">
                            <td className="w-1/2 py-2 px-2">{bank.display} {bank.abbreviation}</td>
                            <td className="w-1/2 py-2 px-2">{bank.country.display}</td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    </BasicLayout>
}

export default SupportedBanks