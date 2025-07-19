
import { NavLink } from 'react-router-dom';
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Hero from '../components/herosection';

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Hero/>
            <Footer />
        </>
    )
}
export default HomeLayout;