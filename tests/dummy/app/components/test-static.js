import TC from './test-component';
import CK from 'furnace-component-keywords';
export default TC.extend({
}).keywords({
	
	staticTest : CK.component('test-child').hash({					
		definedHash:CK.bind('definedHash')
	}).params([null,'definedParam']),
	
	staticTest2 : CK.component('test-child').hash({
		templateHash:'templateHash',
		definedHash:'definedHash'
	}).params(['templateParam','definedParam']),
	
});