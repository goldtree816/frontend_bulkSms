import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { FaEnvelope, FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { MdOutlineDateRange, MdOutlineAttachMoney } from "react-icons/md";

const UserReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await axiosInstance.get("/userSubscription/subscriptionByUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.subscriptions || []);
      } catch (err) {
        console.error("Error while fetching data:", err);
      }
    };

    fetchSubscriptionData();
  }, []);

  const getUsagePercent = (sent, total) => {
    if (!total) return 0;
    return Math.min(100, Math.round((sent / total) * 100));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        User Subscription Report
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No subscriptions found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((subscriptionArray, index) => {
            const sub = subscriptionArray[0];
            const usage = getUsagePercent(sub.msgsSent, sub.numberOfMsgs);

            return (
              <div
                key={index}
                className="bg-white border rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white flex justify-between items-center">
                  <h2 className="text-lg font-bold">{sub.plan}</h2>
                  <span className="bg-white text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
                    #{sub.id}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MdOutlineAttachMoney className="text-green-600" />
                    <span><strong>Price:</strong> ${sub.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MdOutlineDateRange className="text-blue-600" />
                    <span>
                      <strong>Subscribed At:</strong>{" "}
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="text-yellow-600" />
                    <span><strong>Total Messages:</strong> {sub.numberOfMsgs}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaPaperPlane className="text-red-500" />
                    <span><strong>Messages Sent:</strong> {sub.msgsSent}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="text-teal-500" />
                    <span><strong>Remaining:</strong> {sub.remainingMsgs}</span>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Usage
                    </label>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          usage >= 90
                            ? "bg-red-500"
                            : usage >= 50
                            ? "bg-yellow-400"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${usage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-right text-gray-500 mt-1">
                      {usage}% used
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaUserCircle />
                      <span>{sub.createdBy}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserReport;
