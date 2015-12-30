import Ember from 'ember';
import {merge} from 'furnace-component-keywords/private-api';
import {ComponentBinding,bind} from 'furnace-component-keywords/utils/binding';


function hashBindings(hash) {
	let _hash={};
	for(let key in hash) {
		let binding=hash[key];
		if(typeof binding ==='string') {
			binding=bind(binding);
		}
		Ember.assert('furnace-component-keywords: hash key '+key+' is not a binding',binding instanceof ComponentBinding);
		_hash[key]=binding;
	}
	return _hash;
}

function paramBindings(params) {
	let _params=[];
	for(let index in params) {
		let binding=params[index];
		if(typeof binding ==='string') {
			binding=bind(binding);
		} 
		Ember.assert('furnace-component-keywords: param index '+index+' is not a binding',binding instanceof ComponentBinding || binding===null);
		_params[index]=binding;
	}
	return _params;
}

var Keyword = {
	isKeyword: true,
	
	isHelper: false,
	
	_hash : null,
	
	hash: function(hash) {
		this._hash=hashBindings(hash);		
		return this;
	},
	
	appendHash : function(append) {
		var hash=this._hash || {};
		this._hash=merge(hash,hashBindings(append));
	},
	
	_params: null,
	
	params: function(params) {
		this._params=paramBindings(params);
		return this;
	},
	
	appendParams : function(append) {
		var params=this._params || [];
		this._params=merge(params,paramBindings(append));
	},
	
	bindings: function() {
		return {hash:this._hash,params:this._params};
	},
	fn: function() {
		Ember.assert('Keyword function not implemented');
	},
	instance :function() {
		if(!this.instanceCache) {
			var keyword=this;
			this.instanceCache=function() {
				return keyword.fn.apply(keyword,arguments);
			};
		}
		return this.instanceCache;
	}
};

export default Keyword;