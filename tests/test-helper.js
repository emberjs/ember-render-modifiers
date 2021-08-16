import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { assign } from '@ember/polyfills';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();

QUnit.assert.namedArgsEqual = function (actual, expected, message) {
  // this is needed because older versions of Ember pass an `EmptyObject`
  // based object and QUnit fails due to the prototypes not matching
  let sanitizedActual = assign({}, actual);

  this.deepEqual(sanitizedActual, expected, message);
};
