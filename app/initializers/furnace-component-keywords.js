import Ember from 'ember';
import CK from 'furnace-component-keywords';
import Keyword from 'furnace-component-keywords/keywords/proto';
import {RenderEnv,Keywords} from 'furnace-component-keywords/private-api';
import {mergeKeywords} from 'furnace-component-keywords/utils/env';
import ComponentLookup from 'furnace-component-keywords/utils/component-lookup';

var require = Ember.__loader.require;
require('ember-views/component_lookup').default=ComponentLookup;


export function initialize(app) {
	Ember.Component.reopenClass({
		keywords : function(keywords) {
			this.reopen({
				_hasFurnaceComponentKeywords:true,
				keywords : keywords
			});
			return this;
		}
	});
	var orgChildWithView=RenderEnv.prototype.childWithView;
	RenderEnv.prototype.childWithView=function furnaceChildWithView(view) {
		var env = orgChildWithView.apply(this,arguments);
		if(view._hasFurnaceComponentKeywords) {
			mergeKeywords(env,view.keywords);
		}
		return env;
	}
	var orgOutletChildEnv=Keywords.outlet.childEnv;
	Keywords.outlet.childEnv=function furnaceOutletChildEnv(state,env) {
		var env = orgOutletChildEnv.apply(this,arguments);		
		if(state.manager && state.manager.component && state.manager.component._hasFurnaceComponentKeywords) {
			mergeKeywords(env,state.manager.component.keywords);
		}
		return env;
	}
	
};

export default {
	name: 'furnace-component-keywords',
	initialize: initialize
};
