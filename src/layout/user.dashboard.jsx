import SummaryCard from "../components/financial";
import FinancialSummary from "../components/financial";
import FinancialSummaryCard from "../components/financial/financial.summerycard";
import GraphComponent from "../components/graph/graph.component";
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Money',
            data: [0, 1, 2, 3, 4],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: false,
            text: 'Amount Per Year',
        },
    },
};

const UserDashboard = () => {
    return (
        <>
            <div className="flex justify-between p-6 space-x-6">
                <SummaryCard
                    title="Total Receivables"
                    totalText="Total Receivables ₹44,82,218.52"
                    currentLabel="CURRENT"
                    currentValue="₹23,48,764.00"
                    overdueLabel="OVERDUE"
                    overdueValue="₹21,33,454.62"
                    currentWidth="52%"
                    overdueWidth="42%"
                />
                <SummaryCard
                    title="Total Payables"
                    totalText="Total unpaid bills ₹36,06,89,054.86"
                    currentLabel="CURRENT"
                    currentValue="₹31,74,41,096.91"
                    overdueLabel="OVERDUE"
                    overdueValue="₹4,32,47,957.95"
                    currentWidth="88%"
                    overdueWidth="12%"
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Cash Flow</h2>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
                    <div className="md:w-[70%] w-full flex-grow flex">
                        <div className="flex-grow bg-white shadow-md rounded-lg p-4 w-full">
                            <GraphComponent data={chartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="md:w-[30%] w-full flex">
                        <div className="flex-grow bg-white shadow-md rounded-lg p-4 flex flex-col">


                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Previous Fiscal Year
                                </label>
                                <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>2024</option>
                                    <option>2023</option>
                                    <option>2022</option>
                                </select>
                            </div>


                            <FinancialSummaryCard />
                        </div>
                    </div>



                </div>



            </div>





        </>
    )
}
export default UserDashboard;


