import TC from './test-component';
import CK from 'furnace-component-keywords';
export default TC.extend({
}).keywords({
	
	chain : CK.component(function(hashFn,paramFn) {		
		return 'test';
	}).keywords({
	
		test : CK.component('test-static')
		
	}),
});