import Keyword from 'furnace-component-keywords/keywords/proto';
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
			let component=scope.component || scope._component;
			return component.get(unboundHash[key].key);
		}
	}
	return undefined;
}

function readParam(env,scope,params,unboundParams,index) {
	if(params[index]!==undefined) {
		return env.hooks.getValue(params[index]);
	}
	if(unboundParams[index]!==undefined && unboundParams[index]!==null) {
		let component=scope.component || scope._component || scope.parent._component;
		return component.get(unboundParams[index].key);
	}
	return undefined;
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
	let state;
	if(morph.getState) {
		state = morph.getState();
		if (state.manager) {
			state.manager.destroy();
		}
		state.manager = null;
	} else {
		state=morph.state;
		if (morph.state.manager) {
			morph.state.manager.destroy();
	    }	
		morph.state.manager = null;
	}
	
	if(morph.linkedParams) {
		params=morph.linkedParams.params;
		hash=morph.linkedParams.hash;
	}

	var bindings=this.bindings();
	// Relink additional bindings
	if(bindings) {
		updateBinding(bindings,morph, env, scope, null, params, hash, visitor);
	}
	
	var componentPath=state.componentPath;
	
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
	let state;
	if(morph.getState) {
		state = morph.getState();
	} else {
		state=morph.state;
	}
	var componentPath=state.componentPath;
	if(typeof componentPath==='string') {
		env.hooks.component(morph, env, scope, componentPath, params, hash, { "default": template, inverse: inverse }, visitor);
		if (morph.buildChildEnv) {
	        return morph.buildChildEnv(morph.getState(), env);
	    }
		return;
	} else if(typeof componentPath==='function') {
		componentPath.apply(componentPath,arguments);
		if (morph.buildChildEnv) {
	        return morph.buildChildEnv(morph.getState(), env);
	    }
		return;
	} else if(componentPath.render) {
		return componentPath.rerender.apply(componentPath,arguments);
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