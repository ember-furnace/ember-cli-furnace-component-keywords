import Ember from 'ember';
import Keyword from 'furnace-component-keywords/keywords/proto';
import {updateBinding} from 'furnace-component-keywords/utils/binding';
import {htmlBarsLinkParams} from 'furnace-component-keywords/private-api';

var HelperKeyword=function(helper) {
	if(typeof helper==='function') {
		helper = Ember.Helper.helper(helper);
	}
	this.fn=helperKeyword;
	this.helper=helper;	
};

HelperKeyword.prototype=Keyword;

function helperKeyword(morph, env, scope, params, hash, template, inverse, visitor) {
	// Relink additional bindings
	var value,hasValue;
	var streams;
	
	if (morph && morph.linkedResult) {
		value = env.hooks.getValue(morph.linkedResult);
		hasValue = true;
	} else {
		var bindings=this.bindings();	
		if(bindings) {
			streams=updateBinding(bindings,morph, env, scope, null, params, hash, visitor);
		}		
		var result = env.hooks.invokeHelper(morph, env, scope, visitor, params, hash, this.helper,{template:{},inverse:{}}, {});
		if(!morph) {
			if(streams) {
				for(let i=0; i<streams.length;i++) {
					result.value.addDependency(streams[i]);
				}
			}
			return result.value;
		}
		else {
			if (result && result.link) {
				morph.linkedResult = result.value;
				htmlBarsLinkParams(env, scope, morph, '@content-helper', [morph.linkedResult], null);
			}
			if (result && 'value' in result) {
				value = env.hooks.getValue(result.value);
				hasValue = true;
			}	
		}
	}
	if (hasValue) {
		if (morph.lastValue !== value) {
			morph.setContent(value);
		}
		morph.lastValue = value;
	}		  
	return true;
}


export default HelperKeyword;
