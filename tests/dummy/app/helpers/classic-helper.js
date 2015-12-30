import Ember from 'ember';
export default Ember.Helper.extend({
	compute:function(params) {
		return 'Classic helper: '+params[0];
	}

});