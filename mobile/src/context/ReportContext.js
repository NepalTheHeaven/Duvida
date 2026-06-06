import React, { createContext, useContext, useState } from 'react';

const initial = {
  accidentType: '',
  severity: 'minor',
  occurredAt: new Date(),
  location: { name: 'Thapathali, Kathmandu', lat: 27.6802, lng: 85.3314 },
  description: '',
  vehiclesInvolved: 2,
  roadCondition: 'Normal',
  weatherCondition: 'Clear',
  photos: [],
};

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [report, setReport] = useState(initial);
  const update = (patch) => setReport((r) => ({ ...r, ...patch }));
  const reset = () => setReport(initial);
  return (
    <ReportContext.Provider value={{ report, update, reset }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => useContext(ReportContext);
