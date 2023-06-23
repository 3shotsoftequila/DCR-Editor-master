import RulesModule from 'diagram-js/lib/features/rules';

import DCRRules from './DCRRules';

export default {
  __depends__: [
    RulesModule
  ],
  __init__: [ 'odRules' ],
  odRules: [ 'type', DCRRules ]
};
