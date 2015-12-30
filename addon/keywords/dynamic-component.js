import Keyword from 'furnace-component-keywords/keywords/proto';
import ComponentKeyword from 'furnace-component-keywords/keywords/component';
import {componentKeyword} from 'furnace-component-keywords/keywords/component';
import {updateBinding} from 'furnace-component-keywords/utils/binding';
import {assign} from 'furnace-component-keywords/private-api';

import CK from 'furnace-component-keywords';

function readHash(env,scope,hash,unboundHash,key) {
	if(hash[key]!==undefined) {
		return env.hooks.getValue(hash[key]);
	}
	if(unboundHash[key]!==undefined) {
		if(scope.locals[unboundHash[key].key]!==undefined) { 
			return env.hooks.getValue(scope.locals[unboundHash[key].key]);
		} else {
			return scope.component.get(unboundHash[key].key);
		}
	}
	return undefined;
}

function readParam(env,scope,params,unboundParams,index) {
	if(params[index]!==undefined) {
		return env.hooks.getValue(params[index]);
	}
	if(unboundParams[index]!==undefined && unboundParams[index]!==null) {
		return scope.component.get(unboundParams[index].key);
	}
	return undefined;
}

function getComponent(fn,env,scope,params,hash,unboundParams,unboundHash) {
	var _params=[];
	var _hash={};
	for(let i=0;i<params.length;i++) {
		_params[i]=env.hooks.getValue(params[i]);
	}
	if(unboundParams!==undefined) {
		for (let i in unboundParams) {
			if(_params[i]===undefined && unboundParams[i]) {
				_params[i]=scope.component.get(unboundParams[i].key);
			}
		}
	}

	for(let i in hash) {
		_hash[i]=env.hooks.getValue(hash[i]);
	}
	
	if(unboundHash!==null) {
		let updates = Object.keys(unboundHash);			
		for (let i = 0, l = updates.length; i < l; i++) {
			let key = updates[i];
			if(_hash[key]===undefined && unboundHash[key]) {
				if(scope.locals[unboundHash[key].key]!==undefined) { 
					_hash[key]=env.hooks.getValue(scope.locals[unboundHash[key].key]);
				} else {
					_hash[key]=scope.component.get(unboundHash[key].key);
				}
			}
		}
	}
	
	return fn.call(CK,_hash,_params);
}

function DynamicKeywordProto() {
	
}

DynamicKeywordProto.prototype= Keyword;

var DynamicKeyword = function(componentFn) {
	this.componentFn=componentFn;
};

DynamicKeyword.prototype=new DynamicKeywordProto();

DynamicKeyword.prototype.getComponent = function(env,scope,params,hash) {
	var bindings=this.bindings();
	return this.componentFn.call(CK,function(key) {
		return readHash(env,scope,hash,bindings.hash,key);
	},function(index) {
		return readParam(env,scope,params,bindings.params,index);
	});
};


DynamicKeyword.prototype.setupState = function(lastState, env, scope, params, hash) {
	var componentPath=this.getComponent(env,scope,params,hash);
	if(this.keywords[componentPath]!==undefined) {
		componentPath=this.keywords[componentPath].instance();
		if(componentPath.setupState) {
			return componentPath.setupState.apply(componentPath,arguments);
		}
	} 
	return assign({}, lastState, { componentPath });
};

DynamicKeyword.prototype.render = function(morph, env, scope, params, hash, template, inverse, visitor) {
	if (morph.state.manager) {
		morph.state.manager.destroy();
    }	
	morph.state.manager = null;
	
	if(morph.linkedParams) {
		params=morph.linkedParams.params;
		hash=morph.linkedParams.hash;
	}

	var bindings=this.bindings();
	// Relink additional bindings
	if(bindings) {
		updateBinding(bindings,morph, env, scope, null, params, hash, visitor);
	}
	
	var componentPath=morph.state.componentPath;
	
	if(typeof componentPath==='string') {
		env.hooks.component(morph, env, scope, componentPath, params, hash, { "default": template, inverse: inverse }, visitor);		
		return;
	} else if(typeof componentPath==='function') {
		componentPath.apply(componentPath,arguments);
		return;
	} else if(componentPath.render) {
		return componentPath.render.apply(componentPath,arguments);
	}
	
};
	
DynamicKeyword.prototype.rerender = function(morph, env, scope, params, hash, template, inverse, visitor) {		
	var componentPath=morph.state.componentPath;
	if(typeof componentPath==='string') {
		env.hooks.component(morph, env, scope, componentPath, params, hash, { "default": template, inverse: inverse }, visitor);		
		return;
	} else if(typeof componentPath==='function') {
		componentPath.apply(componentPath,arguments);		
		return;
	} else if(componentPath.render) {
		return componentPath.render.apply(componentPath,arguments);
	}
};

DynamicKeyword.prototype.keywords = function(keywords) {
	this.keywords=keywords;
	return this;
};

DynamicKeyword.prototype.instance=function() {
	return this;
};


export default DynamicKeyword;