import { useNavigate } from "react-router-dom";
const pricingPlan = [
  {
    plan: "Basic",
    messages: "50",
    price: "5"
  },
  {
    plan: "Premium",
    messages: "200",
    price: "10"

  },
  {
    plan: "Premium Plus",
    messages: "500",
    price: "20"
  }

]

const Service = () => {
  const navigate = useNavigate();
  const buttonClicked = (plan) => {
    navigate("/user/buyService", {state:plan});
    console.log("you just have clicked a basic plan button")
    console.log("the plan data is:", plan)
  }
  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Compare Our Services</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlan.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg p-6 border-t-8 hover:scale-105 transition-transform duration-300 cursor-pointer ${plan.plan === "Basic"
              ? "bg-gradient-to-br from-slate-100 to-blue-100 border-blue-400 hover:from-blue-100 hover:to-blue-600"
              : plan.plan === "Premium"
                ? "bg-gradient-to-br from-yellow-100 to-yellow-100 border-yellow-400 hover:from-yellow-100 hover:to-yellow-400"
                : "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-700 hover:from-gray-300 hover:to-gray-700"
              }`}
            onClick={() => buttonClicked(plan)}
          >
            <div className="flex justify-center mb-4">
              <div className={`rounded-full p-4 shadow-md ${plan.plan === "Basic"
                ? "bg-green-600"
                : plan.plan === "Premium"
                  ? "bg-yellow-400"
                  : "bg-green-700"
                }`}>
                <img
                  src={
                    plan.plan === "Basic"
                      ? "/icons/basis.svg"
                      : plan.plan === "Premium"
                        ? "/icons/company.svg"
                        : "/icons/competitor.svg"
                  }
                  alt={`${plan.plan} Icon`}
                  className="w-8 h-8"
                />
              </div>
            </div>
            <h3 className={`text-xl font-semibold text-center mb-4 ${plan.plan === "Basic"
              ? "text-green-700"
              : plan.plan === "Premium"
                ? "text-yellow-600"
                : "text-green-800"
              }`}>
              {plan.plan}
            </h3>
            <ul className="text-slate-700 space-y-2 text-sm text-center">
              <li>Messages: {plan.messages}</li>
              <li>Price: {plan.price}</li>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
              <li>Feature 4</li>
              <li>Feature 5</li>
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Service;
