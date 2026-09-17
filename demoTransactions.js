// Static demo scenarios used for quick presentation of the analyzer.
export const demoScenarios = [
  {
    key: 'normal',
    label: 'Normal Transaction',
    description: 'Typical low-risk purchase from a trusted, aged account.',
    data: {
      amount: '145.50',
      type: 'pos',
      location: 'domestic',
      time: '14:30',
      device: 'mobile',
      transactionsToday: '2',
      accountAge: '540',
    },
  },
  {
    key: 'suspicious',
    label: 'Suspicious Transaction',
    description: 'Elevated amount, odd hour, and a fairly new account.',
    data: {
      amount: '6500',
      type: 'online',
      location: 'international',
      time: '23:45',
      device: 'desktop',
      transactionsToday: '6',
      accountAge: '45',
    },
  },
  {
    key: 'fraud',
    label: 'Fraud Alert',
    description: 'Large wire transfer, brand-new account, unknown device.',
    data: {
      amount: '25000',
      type: 'wire',
      location: 'unknown',
      time: '03:15',
      device: 'unknown',
      transactionsToday: '14',
      accountAge: '3',
    },
  },
];
