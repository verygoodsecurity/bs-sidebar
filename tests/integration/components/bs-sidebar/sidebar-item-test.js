import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bs-sidebar/sidebar-item', 'Integration | Component | vg sidebar/sidebar-item', {
  integration: true,
  beforeEach() {
    const environment = this;
    this.isActive = false;
    this.register('service:-routing', {
      generateURL() { return '/123/url'; },
      router: {
        currentState: {
          isActiveIntent() { return environment.isActive; }
        }
      }
    }, { instantiate: false, singleton: true });
    this.inject.service('-routing', { as: '-routing' });
  }
});

test('it renders a header', function(assert) {
  this.set('item', {
    isHeader: true,
    label: '123 Header',
  });
  this.render(hbs`{{bs-sidebar/sidebar-item item=item}}`);
  assert.equal(this.$().text().trim(), '123 Header');
});

test('it renders an active link', function(assert) {
  this.isActive = true;
  this.set('item', {
    isLink: true,
    params: ['cool-route'],
    label: '123 Link',
  });
  this.render(hbs`{{bs-sidebar/sidebar-item item=item}}`);
  assert.equal(this.$().find('a .nav-text').text().trim(), '123 Link');
  function testClasses(el, classes, expectation) {
    assert.equal(el.$().find('li').is(classes), expectation, `${classes} should be ${expectation}`);
  }
  testClasses(this, '.nav-item.active', true);
  testClasses(this, '.nav-header', false);
});

test('it renders an inactive link', function(assert) {
  this.set('item', {
    isLink: true,
    params: ['cool-route'],
    label: '123 Link',
  });
  this.render(hbs`{{bs-sidebar/sidebar-item item=item}}`);
  assert.equal(this.$().find('a .nav-text').text().trim(), '123 Link');
  assert.equal(this.$().find('a .nav-icon').length, 0);
  function testClasses(el, classes, expectation) {
    assert.equal(el.$().find('li').is(classes), expectation, `${classes} should be ${expectation}`);
  }
  testClasses(this, '.nav-item', true);
  testClasses(this, '.active', false);
});

test('it renders the icon', function (assert) {
  this.set('item', {
    isLink: true,
    params: ['cool-route'],
    label: '123 Link',
    icon: {
      classNames: 'fa fa-money',
    }
  });
  this.render(hbs`{{bs-sidebar/sidebar-item item=item}}`);
  assert.equal(this.$().find('a .nav-text').text().trim(), '123 Link');
  assert.equal(this.$().find('a .nav-icon').length, 1);
  assert.equal(this.$().find('a .nav-icon i').is('.fa.fa-money'), true);
});

test('it renders the children', function (assert) {
  this.set('item', {
    isLink: true,
    params: ['cool-route'],
    label: '123 Link',
    children: [{
      isLink: true,
      params: ['cool-route'],
      label: '123 Child Link',
    }]
  });
  this.render(hbs`{{bs-sidebar/sidebar-item item=item}}`);
  assert.equal(this.$().find('> li.nav-item > a.nav-link > .nav-text').text().trim(), '123 Link');
  assert.equal(this.$().find('> li.nav-item > ul.nav-sub > li.nav-item > a > .nav-text').text().trim(), '123 Child Link');
});
