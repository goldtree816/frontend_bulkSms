const Service = () => {
  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Compare Our Services</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-700 rounded-full p-4">
              <img src="/icons/basis.svg" alt="Basis Icon" className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-4 text-green-800">Basis</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>Team size</li>
            <li>Full time tracking</li>
            <li>Audit readiness</li>
            <li>Red flag report</li>
            <li>1 hour attorney consult</li>
            <li>Total annual cost</li>
            <li>Interest free monthly auto payments</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-8 border-yellow-400">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 rounded-full p-4">
              <img src="/icons/company.svg" alt="Company ABC Icon" className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-4 text-yellow-600">Premium</h3>
          <ul className="text-gray-700 space-y-2 text-sm text-center">
            <li>120</li>
            <li>Included</li>
            <li>2 hours included</li>
            <li>Included</li>
            <li>Included</li>
            <li>$2,350</li>
            <li>$XXXXX</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-700 rounded-full p-4">
              <img src="/icons/competitor.svg" alt="Competitor Icon" className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-4 text-green-800">Premium Plus</h3>
          <ul className="text-gray-700 space-y-2 text-sm text-center">
            <li>125</li>
            <li>$3,000</li>
            <li>$130 per hour</li>
            <li>Not Included</li>
            <li>Not Included</li>
            <li>~$2,350</li>
            <li>Not available</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Service;
