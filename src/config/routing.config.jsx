import { Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from '../layout/homelayout';
import UserLayout from '../layout/userlayout';
import UserDashboard from '../layout/user.dashboard';
import About from '../pages/about';
import Contact from '../pages/contactus';
import Gallery from '../pages/gallery';
import UserReport from '../layout/user.report';
import ManageContacts from '../layout/managecontacts';
import MyCalendar from '../components/calendar/mycalendar';
import EditProfile from '../layout/edit.profile';
import FilterByCountry from '../layout/user.bynumber';
import LoginPage from '../pages/login/login.page';
import RegisterPage from '../pages/register/register.page';
import CreateGroup from '../layout/createGroup';
import EditGroup from '../layout/editGroupById';
import SendWhatsAppMsg from '../components/twilio/sendWhatsApp';
import SendEmail from '../components/twilio/sendEmail';
import Service from '../layout/services';
import BuyService from '../layout/buyservice';

const RoutingConfig = () => {

  const token = localStorage.getItem("accessToken");
  console.log("the token is this:", token)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path="profile" element={<UserReport />} />
          <Route path="dashboard" element={<UserDashbo
          <Route path="contacts" element={
            token ? (<ManageContacts />) : (<Navigate to="/login" />)} />
          <Route path="whatsApp" element={token ? (<SendWhatsAppMsg />) : (<Navigate to="/login" />)} />
          <Route path="email" element={token ? (<SendEmail />) : (<Navigate to="/login" />)} />
          <Route path="service" element={token ? (<Service />) : (<Navigate to="/login" />)} />
          <Route path="buyService" element={<BuyService />} />
          <Route
            path="calendar"
            element={
              token ? (
                <MyCalendar />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="editProfile" element={<EditProfile />} />
          <Route path="bycountry" element={<FilterByCountry />} />
          <Route path="createGroup" element={<CreateGroup />} />
          <Route path="editGroup/:id" element={<EditGroup />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default RoutingConfig;
