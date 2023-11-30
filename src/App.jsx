// App.jsx

import React from 'react';
import ComplianceHistoryChart from './ComplianceHistoryChart';
import complianceData from 'Dummy Compliance Data.csv';

const App = () => {
  return (
    <div>
      <h1>Compliance History Chart</h1>
      <ComplianceHistoryChart data={complianceData} />
    </div>
  );
};

export default App;