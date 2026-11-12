import { initialData } from '../data/mockData.js';

export const getHealthReport = (req, res) => {
  res.status(200).json({
    success: true,
    data: initialData.healthReport
  });
};

export const exportReportData = (req, res) => {
  res.status(200).json({
    success: true,
    exportedAt: new Date().toISOString(),
    patient: {
      name: initialData.user.name,
      age: initialData.user.age,
      gender: initialData.user.gender,
      height: `${initialData.user.height} cm`,
      weight: `${initialData.user.weight} kg`,
      bmi: initialData.user.bmi
    },
    metricsSummary: initialData.healthReport
  });
};
