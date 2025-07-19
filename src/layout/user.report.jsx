import TableComponent from "../components/table/table.component";
import TableToolbar from "../components/table/table.toolbar";
const tableData = [
  {
    time: '17th May, 10:23 AM',
    from: '+15551234567',
    to: '+15559876543',
    type: 'SMS',
    status: 'sending',
  },
  {
    time: '17th May, 11:47 AM',
    from: '+15557654321',
    to: '+15558765432',
    type: 'WhatsApp',
    status: 'delivered',
  },
  {
    time: '17th May, 01:15 PM',
    from: '+15553456789',
    to: '+15550987654',
    type: 'SMS',
    status: 'failed',
  },
  {
    time: '17th May, 02:30 PM',
    from: '+15557890123',
    to: '+15551239876',
    type: 'WhatsApp',
    status: 'delivered',
  },
  {
    time: '17th May, 03:42 PM',
    from: '+15555678901',
    to: '+15554321098',
    type: 'SMS',
    status: 'sending',
  },
  {
    time: '17th May, 04:50 PM',
    from: '+15550123456',
    to: '+15559872134',
    type: 'WhatsApp',
    status: 'failed',
  },
  {
    time: '17th May, 05:05 PM',
    from: '+15551239870',
    to: '+15555678901',
    type: 'SMS',
    status: 'delivered',
  },
  {
    time: '17th May, 06:20 PM',
    from: '+15553456567',
    to: '+15557659876',
    type: 'WhatsApp',
    status: 'sending',
  },
  {
    time: '17th May, 07:15 PM',
    from: '+15554321678',
    to: '+15550986543',
    type: 'SMS',
    status: 'failed',
  },
  {
    time: '17th May, 08:35 PM',
    from: '+15556780987',
    to: '+15553456789',
    type: 'WhatsApp',
    status: 'delivered',
  },
];


const UserReport = () => {
  return (
    <>
      <TableToolbar />
      <TableComponent data={tableData} />
    </>
  );
};

export default UserReport;
