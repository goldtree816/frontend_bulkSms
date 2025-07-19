import Footer from "../../components/common/footer"
import Header from "../../components/common/header"

const Gallery = () => {
    return (
        <>
            <Header />

            <section class="py-20 bg-white">
                <div class="container mx-auto px-6">
                    <div class="text-center mb-16">
                        <span class="text-amber-600 font-semibold">OUR GALLERY</span>
                        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mt-4">Captured Moments</h2>
                        <p class="max-w-2xl mx-auto text-gray-600 mt-6 text-lg">A visual journey through our most memorable events and projects</p>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Concert crowd"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Annual Music Festival</h3>
                                        <p class="text-white/80 mt-1">June 2023</p>
                                    </div>
                                </div>
                        </div>


                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Team building"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Team Retreat</h3>
                                        <p class="text-white/80 mt-1">May 2023</p>
                                    </div>
                                </div>
                        </div>


                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Office meeting"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Strategy Workshop</h3>
                                        <p class="text-white/80 mt-1">April 2023</p>
                                    </div>
                                </div>
                        </div>


                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Team celebration"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Product Launch</h3>
                                        <p class="text-white/80 mt-1">March 2023</p>
                                    </div>
                                </div>
                        </div>

                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Conference"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Industry Conference</h3>
                                        <p class="text-white/80 mt-1">February 2023</p>
                                    </div>
                                </div>
                        </div>

              
                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Volunteering"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Community Service</h3>
                                        <p class="text-white/80 mt-1">January 2023</p>
                                    </div>
                                </div>
                        </div>

                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Award ceremony"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Awards Night</h3>
                                        <p class="text-white/80 mt-1">December 2022</p>
                                    </div>
                                </div>
                        </div>


                        <div class="group relative overflow-hidden rounded-lg aspect-square">
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Office party"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 class="text-white text-xl font-bold">Holiday Party</h3>
                                        <p class="text-white/80 mt-1">November 2022</p>
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div class="text-center mt-16">
                        <button class="px-8 py-3 bg-amber-400 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-lg">
                            Load More Photos
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Gallery;