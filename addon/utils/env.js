import Ember from 'ember';
import {merge} from 'furnace-component-keywords/private-api';

function mergeKeywords(env,keywords) {
	let updates = Object.keys(keywords);
	let newKeywords = Object.create(env.hooks.keywords);
	for (let i = 0, l = updates.length; i < l; i++) {
		let prop = updates[i];
		Ember.assert('furnace-component-keywords: '+prop+' is not a keyword',keywords[prop].isKeyword);
		newKeywords[prop] = keywords[prop].instance();
	}
	env.hooks=merge({},env.hooks);
	env.hooks.keywords=newKeywords;
	return env;
} 


export {mergeKeywords};