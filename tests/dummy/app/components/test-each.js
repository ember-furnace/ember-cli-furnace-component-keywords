import Ember from 'ember';
import TC from  './test-component';
import CK from 'furnace-component-keywords';
export default TC.extend({
	models : null,
	
	init : function() {
		this._super();
		this.set('models',Ember.A());
		this.models.pushObject('a');
	},
	
	definedParam : 'definedParam',
	
	definedHash : 'definedHash',
	
	click: function() {
		this._super();
		if(this.models.length===1) {
			this.models.pushObject('b');
		}
		else if(this.models.length===2) {
			this.models.pushObject('c');
		}
		else if(this.models.length===3) {
			this.models.removeAt(1);
			this.models.removeAt(1);
		}
	}
	
}).keywords({
	
	staticTest : CK.component('test-child').hash({					
		definedHash:'definedHash',
		model : '@model',
		index : '@index'
	}).params([null,'definedParam']),
	
	eachTest : CK.each('models',CK.component('test-child').hash({
		templateHash:'templateHash',
		definedHash:'definedHash',
		model : '@model',
		index : '@index'
	}).params([null,'definedParam']))
});