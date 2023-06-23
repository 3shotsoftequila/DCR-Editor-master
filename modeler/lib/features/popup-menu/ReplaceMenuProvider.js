import inherits from 'inherits';
import { getBusinessObject } from '../../util/ModelUtil';
//import PopupMenuProvider from 'diagram-js/lib/features/popup-menu/PopupMenuProvider';

//import { isDifferentType } from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';


/**
 * @class
 * @implements {PopupMenuProvider}
 */
export default function DCRPopupProvider(
   popupMenu, modeling, moddle, 
   dcrReplace, rules, translate
) {
  //injector.invoke(PopupMenuProvider, this);
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._moddle = moddle;
  this._dcrReplace = dcrReplace;
  this._rules = rules;
  this._translate = translate;

  this.register();
}

//inherits(DCRPopupProvider, PopupMenuProvider);

DCRPopupProvider.$inject = [
  //'injector',
  'popupMenu',
  'modeling',
  'moddle',
  'dcrReplace',
  'rules',
  'translate'
];

DCRPopupProvider.prototype.getHeaderEntries = function(element) {
  
  const isPending = element.businessObject.get('pending') || false;
  const isIncluded = element.businessObject.get('included') || false;
  const isExecuted = element.businessObject.get('executed') || false;

  let self = this;
  
  return [
    {
      id: 'toggle-pending-state',
      className: 'bpmn-icon-end-event-none',
      title: 'Pending State',
      active: isPending,
      action: (event, entry) => {
        self._modeling.updateProperties(element, {
          pending: !isPending
        });
      },
      loopType: 'Pending',
    },
    {
      id: 'toggle-included-state',
      className: 'bpmn-icon-intermediate-event-none',
      title: 'Included State',
      active: !isIncluded,
      action: (event, entry) => {
        self._modeling.updateProperties(element, {
          included: !isIncluded
        });
      },
      loopType: 'Included',
    },
    {
      id: 'toggle-executed-state',
      className: 'bpmn-icon-start-event-none',
      title: 'Executed State',
      active: isExecuted,
      action: (event, entry) => {
        self._modeling.updateProperties(element, {
          executed: !isExecuted
        });
      },
      loopType: 'Executed',
    }
  ];
};

DCRPopupProvider.prototype.getEntries = function(element) {

  let businessObject = element.businessObject;

  let entries;

  if (!this._rules.allowed('shape.replace', {element: element})) {
    return [];
  }

  //var differentType = isDifferentType(element);

  if (is(businessObject, 'dcr:Link')) {
    return this._createLinkEntries(element, replaceOptions.LINK);
  }

  return [];
};

DCRPopupProvider.prototype._createLinkEntries = function(element, replaceOptions) {

  var businessObject = getBusinessObject(element);

  var menuEntries = [];

  var modeling = this._modeling,
      moddle = this._moddle;

  var self = this;

  forEach(replaceOptions, function(entry) {
    
  })
}

DCRPopupProvider.prototype._createMenuEntry = function(definition, element, action) {
  var translate = this._translate;
  var replaceElement = this._postitReplace.replaceElement;

  var replaceAction = function() {
    return replaceElement(element, definition.target);
  };

  action = action || replaceAction;

  var menuEntry = {
    label: translate(definition.label),
    className: definition.className,
    id: definition.actionName,
    action: action
  };

  return menuEntry;
};

DCRPopupProvider.prototype._createMenuEntry = function(definition, element, action) {
  var translate = this._translate;
  var replaceElement = this._dcrReplace.replaceElement;

};

DCRPopupProvider.prototype.register = function() {
  this._popupMenu.registerProvider('dcr-replace', this);
}; 