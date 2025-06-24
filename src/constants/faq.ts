export const FAQ = [
  {
    title: 'Getting Started',
    questions: [
      {
        id: 'registration',
        question: 'How do I register as an agent?',
        answer:
          'To register as an agent, fill out your basic information (name, email, phone number) and upload a valid government-issued ID for verification. Our team will review your ID within 24-48 hours and send you a confirmation once approved.',
      },
      {
        id: 'verification',
        question: 'Why do I need to verify my identity?',
        answer:
          'Identity verification ensures security and credibility within our platform. Only verified agents can participate in missions. This helps maintain high quality standards and trust between agents and businesses.',
      },
      {
        id: 'agent-profile',
        question: 'What is the Agent Profile Questionnaire?',
        answer:
          "The Agent Profile Questionnaire helps us match you with appropriate missions. You'll answer questions about your work experience and educational background. This determines your Agent Tier - higher tiers unlock higher-paying missions!",
      },
    ],
  },
  {
    title: 'Missions & Execution',
    questions: [
      {
        id: 'accept-mission',
        question: 'How do I accept and complete a mission?',
        answer:
          'Browse the mission list and review location, instructions, deadline, and cash reward before accepting. Once accepted, follow the provided instructions carefully, observe and evaluate as required, and capture necessary evidence without being noticed. Submit your report before the deadline.',
      },
      {
        id: 'mission-deadlines',
        question: 'What happens if I miss a mission deadline?',
        answer:
          "If you miss the mission deadline, the mission expires and you won't receive your reward. Every mission has a specific completion timeframe that must be followed.",
      },
      {
        id: 'report-submission',
        question: 'What should I include in my mission report?',
        answer:
          'Fill out all required fields accurately, upload necessary photos, receipts, or proof of visit. Double-check your report before submitting as no edits are allowed after submission. Incorrect or incomplete reports will not receive payment.',
      },
    ],
  },
  {
    title: 'Rewards & Growth',
    questions: [
      {
        id: 'payment-process',
        question: 'How and when do I get paid?',
        answer:
          'After submitting your mission report, it will be reviewed for accuracy and completeness. If approved, your payment will be credited to your account. Incorrect or incomplete reports will not receive payment.',
      },
      {
        id: 'level-up',
        question: 'How can I level up and earn more?',
        answer:
          'You can level up by successfully completing more missions, maintaining high accuracy in reports, and participating in exclusive challenges and competitions. Higher levels unlock premium missions with bigger rewards.',
      },
      {
        id: 'agent-conduct',
        question: 'What is expected of me as an agent?',
        answer:
          'As an agent, you should stay honest by providing accurate reports, be professional by following instructions and deadlines, and remain discreet during missions. Your insights help improve businesses, so maintaining high standards is crucial.',
      },
    ],
  },
];

export const getFAQById = (id: string) => {
  return FAQ.reduce(
    (acc, faqCategory) => {
      acc.push(...faqCategory.questions);
      return acc;
    },
    [] as { id: string; question: string; answer: string }[],
  ).find((q) => q.id === id);
};
