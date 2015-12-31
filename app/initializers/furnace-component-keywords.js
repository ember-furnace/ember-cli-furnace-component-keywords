import Ember from 'ember';
import CK from 'furnace-component-keywords';
import Keyword from 'furnace-component-keywords/keywords/proto';
import {RenderEnv} from 'furnace-component-keywords/private-api';
import {mergeKeywords} from 'furnace-component-keywords/utils/env';
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

};

export default {
	name: 'furnace-component-keywords',
	initialize: initialize
};
