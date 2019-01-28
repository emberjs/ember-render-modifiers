import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import { assign } from '@ember/polyfills';
import QUnit from 'qunit';

setApplication(Application.create(config.APP));

start();

QUnit.assert.namedArgsEqual = function(actual, expected, message) {
  // this is needed because older versions of Ember pass an `EmptyObject`
  // based object and QUnit fails due to the prototypes not matching
  let sanitizedActual = assign({}, actual);

  this.deepEqual(sanitizedActual, expected, message);
};
