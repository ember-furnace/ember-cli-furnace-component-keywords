import TC from './test-component';
import CK from 'furnace-component-keywords';
import CC from './test-child';
export default TC.extend({
}).keywords({
	
	staticTest : CK.component(CK.componentClass(CC,'components/test-child')).hash({					
		definedHash:CK.bind('definedHash')
	}).params([null,'definedParam']),
	
	staticTest2 : CK.component('test-child').hash({
		templateHash:'templateHash',
		definedHash:'definedHash'
	}).params(['templateParam','definedParam']),
	
	staticTest3 : CK.component('test-child').hash({
		templateHash:'templateHash',
		templateParam:'templateParam',
		definedHash:'definedHash',
		definedParam:'definedParam'
	}),
});