import Keyword from 'furnace-component-keywords/keywords/proto';
import {updateBinding} from 'furnace-component-keywords/utils/binding';

var ComponentKeyword=function(component) {
	this.component=component;
	this.fn=componentKeyword;
};

ComponentKeyword.prototype=Keyword;

function componentKeyword(morph, env, scope, params, hash, template, inverse, visitor) {
	if(morph.linkedParams) {
		params=morph.linkedParams.params;
		hash=morph.linkedParams.hash;
	}

	var bindings=this.bindings();
	// Relink additional bindings
	if(bindings) {
		updateBinding(bindings,morph, env, scope, null, params, hash, visitor);
	}
	
	
	var componentPath = this.component;
	
	if (componentPath === undefined || componentPath === null) {
		return;
	}

	env.hooks.component(morph, env, scope, componentPath, params, hash, { "default": template, inverse: inverse }, visitor);		
	return true;
}

export default ComponentKeyword;
export {componentKeyword};