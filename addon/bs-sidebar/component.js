import BaseComponent from 'ember-component';
import { filter } from 'ember-computed';
import { isBlank } from 'ember-utils';
import layout from './template';

const Component = BaseComponent.extend({
  layout,
  tagName: 'ul',
  classNameBindings: ['isChildren:nav-sub:nav', 'isStacked:nav-stacked', 'isPills:nav-pills'],

  validItems: filter('items', function(item) {
    return !isBlank(item);
  }),
});

Component.reopenClass({
  positionalParams: ['items'],
});

export default Component;
