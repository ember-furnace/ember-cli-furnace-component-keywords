import Mixin from 'furnace-component-keywords/component-keywords';
import HelperKeyword from 'furnace-component-keywords/keywords/helper';
import ComponentKeyword from 'furnace-component-keywords/keywords/component';
import DynamicComponentKeyword from 'furnace-component-keywords/keywords/dynamic-component';
import EachKeyword from 'furnace-component-keywords/keywords/each';
import {bind} from 'furnace-component-keywords/utils/binding';
import ClassComponent from 'furnace-component-keywords/utils/class-component';
import CustomLookup from 'furnace-component-keywords/utils/custom-lookup';

export default {
	Mixin : Mixin,
	
	Keywords : {
		Component : ComponentKeyword,
		DynamicComponent : DynamicComponentKeyword,
		Helper : HelperKeyword
	},
	
	ClassComponent : ClassComponent,
	
	CustomLookup : CustomLookup,
	
	componentLookup : function(type,name,layoutName) {
		return new CustomLookup(type,name,layoutName);
	},
	
	componentClass : function(componentClass,layoutName) {
		return new ClassComponent(componentClass,layoutName);
	},
	
	component : function(component) {		
		if(typeof component === 'function') {
			return new DynamicComponentKeyword(component);
		}
		if(typeof component==='string' && component.indexOf(':')>-1) {
			let split=component.split(':');
			component=this.componentLookup(split[0],split[1]);
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