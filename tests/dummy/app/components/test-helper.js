import TC from './test-component';
import CK from 'furnace-component-keywords';
export default TC.extend({
}).keywords({
	
	helperTest : CK.helper(function(params,hash) {			
		return 'helperTest ('+params+','+hash.templateHash+','+hash.definedHash+')';
	}).hash({					
		definedHash:'definedHash'
	}).params([null,'definedParam'])
	
});