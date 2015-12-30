import TC from './test-component';
import CK from 'furnace-component-keywords';
export default TC.extend({
	actions : {
		hide : function() {
			
		}
	}
}).keywords({
	
	staticTest : CK.helper(function() {
		return 'static-child-override';
	})
	
});