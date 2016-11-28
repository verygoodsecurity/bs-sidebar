import { assign } from 'ember-platform';

export function header(label) {
  return { label, isHeader: true };
}

export function link(label, routeName, options) {
  return assign({ label, params: [ routeName ], isLink: true }, options);
}

export function badge(label, classNames) {
  return {
    label,
    classNames,
  };
}

export function faIcon(iconName) {
  return { classNames: `fa fa-${iconName}` };
}
