import Ember from 'ember';
import Keyword from 'furnace-component-keywords/keywords/proto';
import {bind} from 'furnace-component-keywords/utils/binding';
import {componentKeyword} from 'furnace-component-keywords/keywords/component';
import ComponentKeyword from 'furnace-component-keywords/keywords/component';
import DynamicComponentKeyword from 'furnace-component-keywords/keywords/dynamic-component';

var EachKeyword=function(target,itemComponent) {
	this.fn=eachKeyword;
	this.target=target;
	this.component='furnace-component-keywords-each';
	
	Ember.assert("furnace-component-keywords: you should pass a component keyword as 2nd parameter for the each keyword",itemComponent instanceof ComponentKeyword );
	
	this.itemComponent=itemComponent;
	
	let itemBindings=itemComponent.bindings();
	
	this.appendHash(itemBindings.hash);
		
	let append={		
		_itemComponent : bind.literal(this.itemComponent),
		_models : bind(this.target),
	};
	
	Ember.warn("Using parameters with a dynamic component keyword may not work as expected!",!(itemComponent instanceof DynamicComponentKeyword) || !itemBindings.params );
	
	for(let index in itemBindings.params) {
		if(itemBindings.params[index]) {
			append['__definedParam'+index]=itemBindings.params[index];
			itemBindings.params[index]=bind('__definedParam'+index);
		} else {			
			itemBindings.params[index]=bind('__positionalParam'+index);
		}
	}
	this.appendHash(append);
};

EachKeyword.prototype=Keyword;

function eachKeyword() {
	return componentKeyword.apply(this,arguments);
}
/* 
 * Funny hack using each in current scope.
 * However, we need to update the env again to expose local keywords, this works initially
 * but breaks on updates
 */

/*

import {mergeKeywords} from 'furnace-component-keywords/utils/env';
import {htmlBarsContinueBlock} from 'furnace-component-keywords/private-api';

function eachKeyword(morph, env, scope, params, hash, template, inverse, visitor) {
	var bindings={
		params : [this.target]
	};
	
	template.arity=2;
	template.locals.unshift('index');
	template.locals.unshift('model');
	
	// Relink additional bindings
	if(bindings) {
		updateBinding(bindings,morph, env, scope, null, params, hash, visitor);
	}
	env=Object.create(env);
	mergeKeywords(env,this.keywords);
	htmlBarsContinueBlock(morph, env, scope, 'each', params, hash, template, inverse, visitor);
	return true;
}
*/
export default EachKeyword;
