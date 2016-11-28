import Component from 'ember-component';
import layout from './template';
import service from 'ember-service/inject';
import computed, { reads } from 'ember-computed';

export default Component.extend({
  layout,
  tagName: 'li',
  classNameBindings: ['item.classNames', 'item.isLink:nav-item', 'item.isHeader:nav-header', 'isActive:active'],

  _routing: service('-routing'),
  currentRouterState: reads('_routing.router.currentState'),
  isActive: computed('item.isLink', 'item.params', 'currentRouterState', function() {
    if (this.get('item.isLink')) {
      const params = this.get('item.params') || [];
      const state = this.get('currentRouterState');
      return state.isActiveIntent(params[0], params[1], params[2] || {}, false);
    }
  }),
});
