import Mixin from 'furnace-component-keywords/component-keywords';
import HelperKeyword from 'furnace-component-keywords/keywords/helper';
import ComponentKeyword from 'furnace-component-keywords/keywords/component';
import DynamicComponentKeyword from 'furnace-component-keywords/keywords/dynamic-component';
import EachKeyword from 'furnace-component-keywords/keywords/each';
import {bind} from 'furnace-component-keywords/utils/binding';
export default {
	Mixin : Mixin,
	
	component : function(component) {
		if(typeof component === 'function') {
			return new DynamicComponentKeyword(component);
		}
		return new ComponentKeyword(component);
	},
	helper : function(helper) {
		return new HelperKeyword(helper);
	},
	each : function(target,itemComponent) {
		return new EachKeyword(target,itemComponent);
	},
	
	bind : bind
	
};