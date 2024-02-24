// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  
  defaultSidebar: [
    {
      type: 'doc',
      id: 'quick-start',
      label: 'Quick Start',
    },
    {
      type: 'category',
      label: 'Mocks',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: 'mocks',
      },
      items: [
        'mocks/disposable-mocks',
        'mocks/persistent-mocks',
      ],
    },
    {
      type: 'category',
      label: 'Matchers',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: 'matchers',
      },
      items: [
        'matchers/request-matchers',
        'matchers/logical-matchers',
        'matchers/attribute-matchers',
      ],
    },
    {
      type: 'category',
      label: 'Responses',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: 'responses',
      },
      items: [
        'responses/response',
        'responses/delayed-response',
        'responses/relay-response',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: 'features',
      },
      items: [
        'features/expiration-policy',
        'features/low-level-api',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: 'integrations',
      },
      items: [
        'integrations/d42',
      ],
    },
  ],

};

module.exports = sidebars;
