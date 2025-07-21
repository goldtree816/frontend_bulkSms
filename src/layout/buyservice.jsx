import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../config/axios.config";

const BuyService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state || {};
  const isArray = Array.isArray(selectedPlan);
  const plans = isArray ? selectedPlan : [selectedPlan];

  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = plans.reduce((sum, plan) => sum + (parseFloat(plan.price) || 0), 0);

  console.log("the plans are:",plans)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      for (const plan of plans) {
        await axiosInstance.post("/userSubscription/createSubscription",
          {
            plan: plan.plan,
            numberOfMsgs: plan.messages,
            price: plan.price,
            subscribedAt: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Payment & Subscription successful!");
      navigate("/user/dashboard");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Payment</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:max-w-xl lg:p-8">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900">
                    Full name (as displayed on card)*
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900">
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="card-number-input"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900">
                    Card expiration*
                  </label>
                  <input
                    type="text"
                    id="card-expiration-input"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    placeholder="12/23"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="cvv-input" className="mb-2 block text-sm font-medium text-gray-900">
                    CVV*
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="•••"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600"
              >
                {loading ? "Processing..." : "Pay now"}
              </button>
            </form>
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
                <div className="space-y-2">
                  {plans.map((plan, index) => (
                    <dl className="flex items-center justify-between gap-4" key={index}>
                      <dt className="text-base font-normal text-gray-500">{plan.title || "Selected Plan"}</dt>
                      <dd className="text-base font-medium text-gray-900">${plan.price}</dd>
                    </dl>
                  ))}
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">${totalPrice.toFixed(2)}</dd>
                  </dl>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8">
                <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="PayPal" />
                <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="Visa" />
                <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="Mastercard" />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-500 sm:mt-8 lg:text-left">
            Payment processed by{" "}
            <a href="#" className="font-medium text-primary-700 underline hover:no-underline">
              GooglePay
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuyService;
