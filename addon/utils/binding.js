import {htmlBarsSubscribe,htmlBarsLinkParams,htmlBarsAcceptParams,BasicStream,isStream} from 'furnace-component-keywords/private-api';

function createStreamBinding(component,key) {
	var stream=new BasicStream(function(){
		return component.get(key);
	},'Helper keyword stream');
	component.addObserver(key,stream,stream.notify);
	return stream;
}

function updateBinding(bindings, morph, env, scope, path, params, hash, visitor) {
	// Update params
	var streams=[];
	if(bindings.params!==null) {		
		for (let i in bindings.params) {
			if(params[i]===undefined) {
				if(bindings.params[i]) {
					params[i]=bindings.params[i].bind(morph,env,scope,visitor);
					if(isStream(params[i])) {
						streams.push(params[i]);
					}
				}
				else {
					params[i]=null;
				}
			}
		}		
	}
	
	// Update hash
	if(bindings.hash!==null) {
		let updates = Object.keys(bindings.hash);			
		for (let i = 0, l = updates.length; i < l; i++) {
			let key = updates[i];			
			if(hash[key]===undefined) {
				hash[key]=bindings.hash[key].bind(morph,env,scope,visitor);
				if(isStream(params[i])) {
					streams.push(hash[key]);
				}
			}
		}
	}
	
	if(morph) {
		// Updated linkedParams
		if(!morph.linkedParams && streams.length>0) {
			htmlBarsLinkParams(env, scope, morph, '@furnace-keyword', params, hash);
			
		} 
		morph.linkedParams = { params: params, hash: hash };
	}	
	return streams;
}

function ComponentBinding() {
	
}


function Binding(key) {
	switch(key) {
	case '@model':
		key="$model";
		break;
	case '@index':
		key="$index";
		break;
	}
	this.key=key;
}
Binding.prototype=new ComponentBinding();
Binding.prototype.bind=function(morph,env,scope,visitor) {
	var stream;
	if(visitor) {
		stream=htmlBarsAcceptParams([['get',this.key]],env,scope)[0];
	} else {
		let component=scope.component || scope._component;
		stream=createStreamBinding(component,this.key);					
	}
	if(morph && morph.linkedParams) {
		htmlBarsSubscribe(morph, env, scope, stream);
	}
	return stream;
};

function MutBinding(key) {
	switch(key) {
		case '@model':
		case '@index':
			Ember.assert('furnace-component-keywords: you can\'t have a mutable binding on @model or @index.');
	}
	Binding.call(this, key);
}
MutBinding.prototype=new ComponentBinding();
MutBinding.prototype.bind=function(morph,env,scope,visitor) {
	var stream;
	if(visitor) {
		stream=htmlBarsAcceptParams([['subexpr','@mut',[['get',this.key]],[]]],env,scope)[0];
	} else {
		let component=scope.component || scope._component;
		stream=createStreamBinding(component,this.key);							
	}
	if(morph && morph.linkedParams) {
		htmlBarsSubscribe(morph, env, scope, stream);
	}
	return stream;
};

function LiteralBinding(value) {
	this.value=value;	
	this.bind=function() {
		return this.value;
	};
}

LiteralBinding.prototype=new ComponentBinding();


function mut(key) {
	return new MutBinding(key);
}

function literal(value) {
	return new LiteralBinding(value);
}

function bind(key) {
	return new Binding(key);
}

bind.mut=mut;
bind.literal=literal;


export {updateBinding,bind,ComponentBinding};