import TC from './test-component';
import CK from 'furnace-component-keywords';
export default TC.extend({
}).keywords({
	
	dynamicTest : CK.component(function(hashFn,paramFn) {
		
		if(paramFn(0)==='templateParam-Updated') {
			return 'test2';
		}
		return 'test';
	}).keywords({
	
		test : CK.component('test-child').hash({					
			definedHash:'definedHash'
		}).params([null,'definedParam']),
		
		test2 : CK.component(function() {
			return 'test';
		}).keywords({
		
			test:CK.component('test-dynamic-child').hash({					
				definedOtherHash:'definedHash'
			}).params([null,'definedOtherParam'])
			
		})
	}).params([null,'definedParam']),
	
	
	dynamicTest2 : CK.component(function(hashFn,paramFn) {
		if(paramFn(0)==='templateParam-Updated') {
			return 'test2';
		}
		return 'test';
	}).keywords({
	
		test : CK.component('test-child').hash({
			templateHash:'templateHash',
			definedHash:'definedHash'
		}).params(['templateParam','definedParam']),
		
		test2 : CK.component(function() {
			return 'test';
		}).keywords({
		
			test:CK.component('test-dynamic-child').hash({
				templateHash : 'templateHash',
				definedOtherHash:'definedHash'
			}).params(['templateParam','definedOtherParam'])
			
		})
	}).params(['templateParam','definedParam']),
	
});