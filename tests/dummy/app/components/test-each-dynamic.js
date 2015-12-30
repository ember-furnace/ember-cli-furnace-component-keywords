import Ember from 'ember';
import TC from  './test-each';
import CK from 'furnace-component-keywords';
export default TC.extend({
	
}).keywords({
	eachTest : CK.each('models',
		CK.component(function(hashFn,paramFn) {			
			if(paramFn(0)==='templateParam-Updated') {
				return 'test2';
			}
			return 'test';
		}).hash({
			templateHash:'templateHash',
			definedHash:CK.bind.mut('definedHash'),
			definedParam:'definedParam'
		}).params([null,'definedParam']).keywords({
		
			test : CK.component('test-child').hash({					
				definedHash:CK.bind.mut('definedHash'),
				templateHash:'templateHash',
				model : '@model',
				index : '@index'
			}),
			
			test2 : CK.component(function() {
				return 'test';
			}).keywords({
			
				test:CK.component('test-dynamic-child').hash({					
					templateHash:'templateHash',
					definedOtherHash:'definedHash',
					model : '@model',
					index : '@index'
				})
				
			})
		}))
});