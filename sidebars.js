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
      label: 'Matchers',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: 'matchers',
      },
      items: [
        'matchers/request-matchers',
        'matchers/logical-matchers',
      ],
    },
  ],

};

module.exports = sidebars;
