const FinancialSummaryCard = () => {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6 w-full max-w-xs">
      <h3 className="text-sm text-gray-600 mb-2">Cash as on 01/08/15</h3>
      <p className="text-xl font-bold text-gray-900 mb-4">₹34,82,877.32</p>

      <div className="mb-2">
        <p className="text-green-600 text-sm font-semibold">Incoming</p>
        <p className="text-lg text-green-700">₹9,17,489.98</p>
      </div>

      <div className="mb-2">
        <p className="text-red-600 text-sm font-semibold">Outgoing</p>
        <p className="text-lg text-red-700">₹13,33,396.81</p>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <p className="text-blue-600 text-sm font-semibold">Cash as on 31/07/16</p>
        <p className="text-lg text-blue-700 font-bold">₹30,66,970.49</p>
      </div>
    </div>
  );
};

export default FinancialSummaryCard;
