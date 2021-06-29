import React, { useState, useEffect } from 'react';

import AdminNav from '../../components/nav/AdminNav';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>Admin Dashboard</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
