import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('helper');
	this.route('static');
	this.route('dynamic');
	this.route('inheritance');
	this.route('each');
	this.route('each-dynamic');
});

export default Router;

