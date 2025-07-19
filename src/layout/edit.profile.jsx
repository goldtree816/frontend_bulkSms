import goldTree from "../assets/images/goldtree.png";

const EditProfile = () => {
    return (
        <>
            <div className="bg-gray-50 py-8 px-4">
                <h3 className="text-2xl font-semibold text-center mb-6">Edit Profile</h3>
                <div className="flex flex-col items-center justify-center mb-8">
                    <img
                        className="h-24 w-24 rounded-full border border-gray-500"
                        src={goldTree}
                        alt="Profile"
                    />
                    <label className="mt-2 text-lg font-medium">Kamal Basyal</label>
                </div>


                <form className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">

                    <div className="flex gap-6">
                        <div className="flex flex-col w-full">
                            <label htmlFor="firstName" className="mb-1 text-sm font-medium">First Name</label>
                            <input
                                id="firstName"
                                className="border border-gray-300 rounded px-3 py-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="lastName" className="mb-1 text-sm font-medium">Last Name</label>
                            <input
                                id="lastName"
                                className="border border-gray-300 rounded px-3 py-2"
                                type="text"
                            />
                        </div>
                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
                        <input
                            id="email"
                            className="border border-gray-300 rounded px-3 py-2"
                            type="email"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="contact" className="mb-1 text-sm font-medium">Contact Number</label>
                        <input
                            id="contact"
                            className="border border-gray-300 rounded px-3 py-2"
                            type="text"
                        />
                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="address" className="mb-1 text-sm font-medium">Address</label>
                        <input
                            id="address"
                            className="border border-gray-300 rounded px-3 py-2"
                            type="text"
                        />
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col w-full">
                            <label htmlFor="city" className="mb-1 text-sm font-medium">City</label>
                            <input
                                id="city"
                                className="border border-gray-300 rounded px-3 py-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="state" className="mb-1 text-sm font-medium">State</label>
                            <input
                                id="state"
                                className="border border-gray-300 rounded px-3 py-2"
                                type="text"
                            />
                        </div>
                    </div>


                    <div className="flex gap-6">
                        <div className="flex flex-col w-full">
                            <label htmlFor="zip" className="mb-1 text-sm font-medium">Zip Code</label>
                            <input
                                id="zip"
                                className="border border-gray-300 rounded px-3 py-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="country" className="mb-1 text-sm font-medium">Country</label>
                            <input
                                id="country"
                                className="border border-gray-300 rounded px-3 py-2"
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
                        <input
                            id="password"
                            className="border border-gray-300 rounded px-3 py-2"
                            type="password"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>

    );
};

export default EditProfile;
