import Footer from "../../components/common/footer";
import Header from "../../components/common/header";

const Contact = () => {
    return (
        <>
            <Header />
            <div className="bg-white " id="contact">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
                    <h2 className="text-4xl font-bold dark:text-amber-400">Contact</h2>
                    <p className="pt-6 pb-6 text-base max-w-2xl text-center m-auto dark:text-gray-900">
                        Want to contact us? Choose an
                        option below and well be happy to show you how we can transform companys web experience.
                    </p>
                </div>
                <div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
                    <div>
                        <h2 className="text-lg font-bold dark:text-amber-400">Contact Us</h2>
                        <p className="max-w-sm mt-4 mb-4 dark:text-gray-900">Have something to say? We are here to help. Fill up the
                            form or send email or call phone.</p>
                        <div className="flex items-center mt-8 space-x-2 text-dark-900 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z">
                                </path>
                            </svg><span>14th avenue glory road</span>
                        </div>
                        <div className="flex items-center mt-2 space-x-2 text-dark-900 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75">
                                </path>
                            </svg>
                            <a href="mailto:hello@company.com">hello@company.com</a>
                        </div>
                        <div className="flex items-center mt-2 space-x-2 text-dark-900">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z">
                                </path>
                            </svg>
                            <a href="tel:11111111111">+51 11111111111</a>
                        </div>
                    </div>
                    <div>
                        <form>
                            <div className="mb-5">
                                <input type="text" placeholder="Full Name" autocomplete="false"
                                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-amber-300 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                                    name="name" />
                            </div>
                            <div className="mb-5">
                                <label for="email_address" className="sr-only">Email Address</label>
                                <input id="email_address" type="email" placeholder="Email Address" autocomplete="false"
                                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-amber-300 focus:ring-4  border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                                    name="email" />
                            </div>
                            <div className="mb-3">
                                <textarea placeholder="Your Message"
                                    className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-amber-300  h-36 focus:ring-4  border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                                    name="message">
                                </textarea>
                            </div>
                            <button type="submit"
                                className="w-full py-4 font-semibold text-white transition-color rounded-md hover:bg-amber-400  focus:outline-amber-300 focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">Send
                                Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Contact;