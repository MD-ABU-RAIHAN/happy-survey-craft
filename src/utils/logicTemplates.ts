import { LogicTemplate, LogicNode, LogicEdge } from '@/types/logic';

export const logicTemplates: LogicTemplate[] = [
  // E-commerce Templates
  {
    id: 'ecommerce-nps-with-recovery',
    name: 'E-commerce NPS with Recovery',
    description: 'NPS survey with detractor recovery and promoter leveraging for online stores',
    category: 'ecommerce',
    industry: ['retail', 'ecommerce', 'marketplace'],
    goal: 'nps',
    difficulty: 'intermediate',
    estimatedSetupTime: 15,
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 100 },
        meta: { label: 'Start Survey' },
      },
      {
        id: 'nps-question',
        type: 'question',
        questionId: 'nps-main',
        position: { x: 250, y: 100 },
        meta: {
          title: 'How likely are you to recommend our store to friends?',
          type: 'nps',
        },
      },
      {
        id: 'detractor-feedback',
        type: 'question',
        questionId: 'detractor-reason',
        position: { x: 150, y: 250 },
        meta: {
          title: 'What could we improve to better serve you?',
          type: 'text',
        },
      },
      {
        id: 'promoter-referral',
        type: 'question',
        questionId: 'promoter-action',
        position: { x: 350, y: 250 },
        meta: {
          title: 'Would you like to refer friends for a discount?',
          type: 'single-choice',
          options: ['Yes, send me referral link', 'Maybe later', 'No thanks'],
        },
      },
      {
        id: 'thank-you',
        type: 'end',
        position: { x: 250, y: 400 },
        meta: {
          label: 'Thank You',
          message: 'Thanks for your feedback! We value your input.',
        },
      },
    ],
    edges: [
      {
        id: 'start-to-nps',
        source: 'start',
        target: 'nps-question',
        action: { type: 'goto', target: 'nps-question' },
        priority: 0,
      },
      {
        id: 'nps-to-detractor',
        source: 'nps-question',
        target: 'detractor-feedback',
        condition: {
          type: 'single',
          clauses: [{ subject: 'nps-main', operator: 'lte', value: 6 }],
        },
        label: 'Detractors (0-6)',
        action: { type: 'goto', target: 'detractor-feedback' },
        priority: 1,
      },
      {
        id: 'nps-to-promoter',
        source: 'nps-question',
        target: 'promoter-referral',
        condition: {
          type: 'single',
          clauses: [{ subject: 'nps-main', operator: 'gte', value: 9 }],
        },
        label: 'Promoters (9-10)',
        action: { type: 'goto', target: 'promoter-referral' },
        priority: 1,
      },
      {
        id: 'nps-passives-to-end',
        source: 'nps-question',
        target: 'thank-you',
        condition: {
          type: 'single',
          clauses: [{ subject: 'nps-main', operator: 'between', value: 7, secondaryValue: 8 }],
        },
        label: 'Passives (7-8)',
        action: { type: 'goto', target: 'thank-you' },
        priority: 2,
      },
      {
        id: 'detractor-to-end',
        source: 'detractor-feedback',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
      {
        id: 'promoter-to-end',
        source: 'promoter-referral',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
    ],
    requiredQuestionTypes: ['nps', 'text', 'single-choice'],
    suggestedQuestions: [
      {
        type: 'nps',
        title: 'How likely are you to recommend our store to friends?',
      },
      {
        type: 'text',
        title: 'What could we improve to better serve you?',
      },
      {
        type: 'single-choice',
        title: 'Would you like to refer friends for a discount?',
        options: ['Yes, send me referral link', 'Maybe later', 'No thanks'],
      },
    ],
    expectedOutcomes: {
      completionRate: 0.85,
      responseQuality: 0.78,
      actionableInsights: [
        'Detractor recovery opportunities',
        'Promoter leveraging for growth',
        'Passive customer engagement',
      ],
    },
    tags: ['nps', 'customer-loyalty', 'referral', 'feedback'],
  },

  // SaaS Templates
  {
    id: 'saas-feature-satisfaction',
    name: 'SaaS Feature Satisfaction',
    description: 'Feature usage and satisfaction tracking with improvement suggestions',
    category: 'saas',
    industry: ['software', 'saas', 'technology'],
    goal: 'satisfaction',
    difficulty: 'intermediate',
    estimatedSetupTime: 20,
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 100 },
        meta: { label: 'Start Survey' },
      },
      {
        id: 'feature-usage',
        type: 'question',
        questionId: 'features-used',
        position: { x: 250, y: 100 },
        meta: {
          title: 'Which features do you use most?',
          type: 'multiple-choice',
          options: ['Dashboard', 'Reports', 'Integrations', 'API', 'Mobile App'],
        },
      },
      {
        id: 'satisfaction-rating',
        type: 'question',
        questionId: 'feature-satisfaction',
        position: { x: 450, y: 100 },
        meta: {
          title: 'How satisfied are you with these features?',
          type: 'satisfaction',
        },
      },
      {
        id: 'improvement-suggestions',
        type: 'question',
        questionId: 'improvement-ideas',
        position: { x: 250, y: 250 },
        meta: {
          title: 'What improvements would you suggest?',
          type: 'text',
        },
      },
      {
        id: 'high-satisfaction-upsell',
        type: 'question',
        questionId: 'upgrade-interest',
        position: { x: 450, y: 250 },
        meta: {
          title: 'Interested in our premium features?',
          type: 'single-choice',
          options: ['Very interested', 'Somewhat interested', 'Not interested'],
        },
      },
      {
        id: 'thank-you',
        type: 'end',
        position: { x: 350, y: 400 },
        meta: {
          label: 'Thank You',
          message: 'Thank you for helping us improve our product!',
        },
      },
    ],
    edges: [
      {
        id: 'start-to-features',
        source: 'start',
        target: 'feature-usage',
        action: { type: 'goto', target: 'feature-usage' },
        priority: 0,
      },
      {
        id: 'features-to-satisfaction',
        source: 'feature-usage',
        target: 'satisfaction-rating',
        action: { type: 'goto', target: 'satisfaction-rating' },
        priority: 0,
      },
      {
        id: 'satisfaction-to-improvement',
        source: 'satisfaction-rating',
        target: 'improvement-suggestions',
        condition: {
          type: 'single',
          clauses: [{ subject: 'feature-satisfaction', operator: 'in', value: ['Dissatisfied', 'Very Dissatisfied'] }],
        },
        label: 'Low Satisfaction',
        action: { type: 'goto', target: 'improvement-suggestions' },
        priority: 1,
      },
      {
        id: 'satisfaction-to-upsell',
        source: 'satisfaction-rating',
        target: 'high-satisfaction-upsell',
        condition: {
          type: 'single',
          clauses: [{ subject: 'feature-satisfaction', operator: 'in', value: ['Satisfied', 'Very Satisfied'] }],
        },
        label: 'High Satisfaction',
        action: { type: 'goto', target: 'high-satisfaction-upsell' },
        priority: 1,
      },
      {
        id: 'improvement-to-end',
        source: 'improvement-suggestions',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
      {
        id: 'upsell-to-end',
        source: 'high-satisfaction-upsell',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
    ],
    requiredQuestionTypes: ['multiple-choice', 'satisfaction', 'text', 'single-choice'],
    suggestedQuestions: [
      {
        type: 'multiple-choice',
        title: 'Which features do you use most?',
        options: ['Dashboard', 'Reports', 'Integrations', 'API', 'Mobile App'],
      },
      {
        type: 'satisfaction',
        title: 'How satisfied are you with these features?',
      },
      {
        type: 'text',
        title: 'What improvements would you suggest?',
      },
    ],
    expectedOutcomes: {
      completionRate: 0.82,
      responseQuality: 0.85,
      actionableInsights: [
        'Feature usage patterns',
        'Satisfaction vs usage correlation',
        'Improvement opportunities',
        'Upselling opportunities',
      ],
    },
    tags: ['features', 'satisfaction', 'upselling', 'product-feedback'],
  },

  // Healthcare Templates
  {
    id: 'healthcare-patient-satisfaction',
    name: 'Patient Experience Survey',
    description: 'Comprehensive patient satisfaction with care quality assessment',
    category: 'healthcare',
    industry: ['healthcare', 'medical', 'clinic'],
    goal: 'satisfaction',
    difficulty: 'beginner',
    estimatedSetupTime: 10,
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 100 },
        meta: { label: 'Start Survey' },
      },
      {
        id: 'care-rating',
        type: 'question',
        questionId: 'care-quality',
        position: { x: 250, y: 100 },
        meta: {
          title: 'How would you rate the quality of care you received?',
          type: 'rating',
        },
      },
      {
        id: 'wait-time',
        type: 'question',
        questionId: 'waiting-time',
        position: { x: 450, y: 100 },
        meta: {
          title: 'How satisfied were you with the waiting time?',
          type: 'satisfaction',
        },
      },
      {
        id: 'concern-follow-up',
        type: 'question',
        questionId: 'care-concerns',
        position: { x: 250, y: 250 },
        meta: {
          title: 'What specific concerns do you have about your care?',
          type: 'text',
        },
      },
      {
        id: 'recommendation',
        type: 'question',
        questionId: 'recommend-facility',
        position: { x: 450, y: 250 },
        meta: {
          title: 'Would you recommend our facility to others?',
          type: 'single-choice',
          options: ['Definitely', 'Probably', 'Maybe', 'Probably not', 'Definitely not'],
        },
      },
      {
        id: 'thank-you',
        type: 'end',
        position: { x: 350, y: 400 },
        meta: {
          label: 'Thank You',
          message: 'Thank you for your feedback. Your input helps us improve patient care.',
        },
      },
    ],
    edges: [
      {
        id: 'start-to-care',
        source: 'start',
        target: 'care-rating',
        action: { type: 'goto', target: 'care-rating' },
        priority: 0,
      },
      {
        id: 'care-to-wait',
        source: 'care-rating',
        target: 'wait-time',
        action: { type: 'goto', target: 'wait-time' },
        priority: 0,
      },
      {
        id: 'wait-to-concerns',
        source: 'wait-time',
        target: 'concern-follow-up',
        condition: {
          type: 'composite',
          mode: 'OR',
          clauses: [
            { subject: 'care-quality', operator: 'lte', value: 2 },
            { subject: 'waiting-time', operator: 'in', value: ['Dissatisfied', 'Very Dissatisfied'] },
          ],
        },
        label: 'Low Ratings',
        action: { type: 'goto', target: 'concern-follow-up' },
        priority: 1,
      },
      {
        id: 'wait-to-recommend',
        source: 'wait-time',
        target: 'recommendation',
        condition: {
          type: 'composite',
          mode: 'AND',
          clauses: [
            { subject: 'care-quality', operator: 'gte', value: 4 },
            { subject: 'waiting-time', operator: 'in', value: ['Satisfied', 'Very Satisfied'] },
          ],
        },
        label: 'High Satisfaction',
        action: { type: 'goto', target: 'recommendation' },
        priority: 1,
      },
      {
        id: 'concerns-to-end',
        source: 'concern-follow-up',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
      {
        id: 'recommend-to-end',
        source: 'recommendation',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
    ],
    requiredQuestionTypes: ['rating', 'satisfaction', 'text', 'single-choice'],
    suggestedQuestions: [
      {
        type: 'rating',
        title: 'How would you rate the quality of care you received?',
      },
      {
        type: 'satisfaction',
        title: 'How satisfied were you with the waiting time?',
      },
      {
        type: 'text',
        title: 'What specific concerns do you have about your care?',
      },
    ],
    expectedOutcomes: {
      completionRate: 0.88,
      responseQuality: 0.82,
      actionableInsights: [
        'Care quality assessment',
        'Service improvement areas',
        'Patient retention indicators',
      ],
    },
    tags: ['patient-care', 'healthcare-quality', 'satisfaction', 'medical'],
  },

  // Education Templates
  {
    id: 'education-course-evaluation',
    name: 'Course Evaluation & Improvement',
    description: 'Student course feedback with instructor and content assessment',
    category: 'education',
    industry: ['education', 'training', 'academia'],
    goal: 'feedback',
    difficulty: 'beginner',
    estimatedSetupTime: 12,
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 100 },
        meta: { label: 'Start Survey' },
      },
      {
        id: 'overall-rating',
        type: 'question',
        questionId: 'course-overall',
        position: { x: 250, y: 100 },
        meta: {
          title: 'How would you rate this course overall?',
          type: 'rating',
        },
      },
      {
        id: 'learning-objectives',
        type: 'question',
        questionId: 'objectives-met',
        position: { x: 450, y: 100 },
        meta: {
          title: 'Were the learning objectives clearly met?',
          type: 'single-choice',
          options: ['Completely', 'Mostly', 'Partially', 'Not at all'],
        },
      },
      {
        id: 'improvement-areas',
        type: 'question',
        questionId: 'course-improvements',
        position: { x: 250, y: 250 },
        meta: {
          title: 'What areas of the course need improvement?',
          type: 'multiple-choice',
          options: ['Content quality', 'Instructor delivery', 'Course materials', 'Pace', 'Assignments'],
        },
      },
      {
        id: 'recommendation',
        type: 'question',
        questionId: 'recommend-course',
        position: { x: 450, y: 250 },
        meta: {
          title: 'Would you recommend this course to other students?',
          type: 'nps',
        },
      },
      {
        id: 'thank-you',
        type: 'end',
        position: { x: 350, y: 400 },
        meta: {
          label: 'Thank You',
          message: 'Thank you for your feedback! It helps us improve our courses.',
        },
      },
    ],
    edges: [
      {
        id: 'start-to-overall',
        source: 'start',
        target: 'overall-rating',
        action: { type: 'goto', target: 'overall-rating' },
        priority: 0,
      },
      {
        id: 'overall-to-objectives',
        source: 'overall-rating',
        target: 'learning-objectives',
        action: { type: 'goto', target: 'learning-objectives' },
        priority: 0,
      },
      {
        id: 'objectives-to-improvements',
        source: 'learning-objectives',
        target: 'improvement-areas',
        condition: {
          type: 'composite',
          mode: 'OR',
          clauses: [
            { subject: 'course-overall', operator: 'lte', value: 3 },
            { subject: 'objectives-met', operator: 'in', value: ['Partially', 'Not at all'] },
          ],
        },
        label: 'Needs Improvement',
        action: { type: 'goto', target: 'improvement-areas' },
        priority: 1,
      },
      {
        id: 'objectives-to-recommend',
        source: 'learning-objectives',
        target: 'recommendation',
        condition: {
          type: 'composite',
          mode: 'AND',
          clauses: [
            { subject: 'course-overall', operator: 'gte', value: 4 },
            { subject: 'objectives-met', operator: 'in', value: ['Completely', 'Mostly'] },
          ],
        },
        label: 'High Quality',
        action: { type: 'goto', target: 'recommendation' },
        priority: 1,
      },
      {
        id: 'improvements-to-end',
        source: 'improvement-areas',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
      {
        id: 'recommend-to-end',
        source: 'recommendation',
        target: 'thank-you',
        action: { type: 'goto', target: 'thank-you' },
        priority: 0,
      },
    ],
    requiredQuestionTypes: ['rating', 'single-choice', 'multiple-choice', 'nps'],
    suggestedQuestions: [
      {
        type: 'rating',
        title: 'How would you rate this course overall?',
      },
      {
        type: 'single-choice',
        title: 'Were the learning objectives clearly met?',
        options: ['Completely', 'Mostly', 'Partially', 'Not at all'],
      },
      {
        type: 'multiple-choice',
        title: 'What areas of the course need improvement?',
        options: ['Content quality', 'Instructor delivery', 'Course materials', 'Pace', 'Assignments'],
      },
    ],
    expectedOutcomes: {
      completionRate: 0.75,
      responseQuality: 0.80,
      actionableInsights: [
        'Course effectiveness metrics',
        'Specific improvement areas',
        'Student satisfaction tracking',
      ],
    },
    tags: ['education', 'course-evaluation', 'student-feedback', 'learning'],
  },

  // Lead Qualification Template
  {
    id: 'lead-qualification-scoring',
    name: 'Smart Lead Qualification',
    description: 'Progressive lead scoring with intelligent routing based on responses',
    category: 'general',
    industry: ['sales', 'marketing', 'b2b'],
    goal: 'lead_qualification',
    difficulty: 'advanced',
    estimatedSetupTime: 25,
    nodes: [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 100 },
        meta: { label: 'Start Survey' },
      },
      {
        id: 'company-size',
        type: 'question',
        questionId: 'company-employees',
        position: { x: 250, y: 100 },
        meta: {
          title: 'How many employees does your company have?',
          type: 'single-choice',
          options: ['1-10', '11-50', '51-200', '201-1000', '1000+'],
        },
      },
      {
        id: 'budget-range',
        type: 'question',
        questionId: 'annual-budget',
        position: { x: 450, y: 100 },
        meta: {
          title: 'What is your annual budget for this solution?',
          type: 'single-choice',
          options: ['Under $1K', '$1K-$10K', '$10K-$50K', '$50K-$100K', 'Over $100K'],
        },
      },
      {
        id: 'timeline',
        type: 'question',
        questionId: 'implementation-timeline',
        position: { x: 650, y: 100 },
        meta: {
          title: 'When are you looking to implement?',
          type: 'single-choice',
          options: ['Immediately', 'Within 1 month', 'Within 3 months', 'Within 6 months', 'Just researching'],
        },
      },
      {
        id: 'high-priority-routing',
        type: 'action',
        position: { x: 250, y: 250 },
        meta: {
          label: 'High-Priority Lead',
          actionType: 'redirect',
          redirectUrl: '/contact-sales',
        },
      },
      {
        id: 'medium-priority-routing',
        type: 'action',
        position: { x: 450, y: 250 },
        meta: {
          label: 'Medium-Priority Lead',
          actionType: 'show_coupon',
          couponCode: 'SAVE15',
        },
      },
      {
        id: 'nurture-sequence',
        type: 'action',
        position: { x: 650, y: 250 },
        meta: {
          label: 'Nurture Campaign',
          actionType: 'redirect',
          redirectUrl: '/resources',
        },
      },
    ],
    edges: [
      {
        id: 'start-to-size',
        source: 'start',
        target: 'company-size',
        action: { type: 'goto', target: 'company-size' },
        priority: 0,
      },
      {
        id: 'size-to-budget',
        source: 'company-size',
        target: 'budget-range',
        action: { type: 'goto', target: 'budget-range' },
        priority: 0,
      },
      {
        id: 'budget-to-timeline',
        source: 'budget-range',
        target: 'timeline',
        action: { type: 'goto', target: 'timeline' },
        priority: 0,
      },
      {
        id: 'timeline-to-high-priority',
        source: 'timeline',
        target: 'high-priority-routing',
        condition: {
          type: 'composite',
          mode: 'AND',
          clauses: [
            { subject: 'company-employees', operator: 'in', value: ['51-200', '201-1000', '1000+'] },
            { subject: 'annual-budget', operator: 'in', value: ['$50K-$100K', 'Over $100K'] },
            { subject: 'implementation-timeline', operator: 'in', value: ['Immediately', 'Within 1 month'] },
          ],
        },
        label: 'High-Value Prospect',
        action: { type: 'redirect', target: '/contact-sales' },
        priority: 1,
      },
      {
        id: 'timeline-to-medium-priority',
        source: 'timeline',
        target: 'medium-priority-routing',
        condition: {
          type: 'composite',
          mode: 'AND',
          clauses: [
            { subject: 'company-employees', operator: 'in', value: ['11-50', '51-200'] },
            { subject: 'annual-budget', operator: 'in', value: ['$10K-$50K', '$50K-$100K'] },
            { subject: 'implementation-timeline', operator: 'in', value: ['Within 1 month', 'Within 3 months'] },
          ],
        },
        label: 'Qualified Lead',
        action: { type: 'show_coupon', payload: { couponCode: 'SAVE15' } },
        priority: 2,
      },
      {
        id: 'timeline-to-nurture',
        source: 'timeline',
        target: 'nurture-sequence',
        condition: {
          type: 'composite',
          mode: 'OR',
          clauses: [
            { subject: 'implementation-timeline', operator: 'in', value: ['Within 6 months', 'Just researching'] },
            { subject: 'annual-budget', operator: 'in', value: ['Under $1K', '$1K-$10K'] },
          ],
        },
        label: 'Nurture Prospect',
        action: { type: 'redirect', target: '/resources' },
        priority: 3,
      },
    ],
    requiredQuestionTypes: ['single-choice'],
    suggestedQuestions: [
      {
        type: 'single-choice',
        title: 'How many employees does your company have?',
        options: ['1-10', '11-50', '51-200', '201-1000', '1000+'],
      },
      {
        type: 'single-choice',
        title: 'What is your annual budget for this solution?',
        options: ['Under $1K', '$1K-$10K', '$10K-$50K', '$50K-$100K', 'Over $100K'],
      },
      {
        type: 'single-choice',
        title: 'When are you looking to implement?',
        options: ['Immediately', 'Within 1 month', 'Within 3 months', 'Within 6 months', 'Just researching'],
      },
    ],
    expectedOutcomes: {
      completionRate: 0.90,
      responseQuality: 0.88,
      actionableInsights: [
        'Lead scoring and prioritization',
        'Automated sales routing',
        'Revenue opportunity identification',
      ],
    },
    tags: ['lead-qualification', 'sales', 'scoring', 'automation'],
  },
];

export const getTemplatesByCategory = (category: string) => {
  return logicTemplates.filter(template => template.category === category);
};

export const getTemplatesByIndustry = (industry: string) => {
  return logicTemplates.filter(template =>
    template.industry?.includes(industry.toLowerCase())
  );
};

export const getTemplatesByGoal = (goal: string) => {
  return logicTemplates.filter(template => template.goal === goal);
};

export const getTemplatesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return logicTemplates.filter(template => template.difficulty === difficulty);
};

export const searchTemplates = (query: string) => {
  const searchTerm = query.toLowerCase();
  return logicTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm) ||
    template.description.toLowerCase().includes(searchTerm) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};