import Ember from 'ember';
export default Ember.Component.extend({
	definedParam : 'No-definedParam',
	
	templateParam : 'No-templateParam',
	
	definedHash : 'No-definedHash',
	
	templateHash : 'No-templateHash',
	
	model : null,
	
	index : null,
	
	didInsertElement : function() {
		//console.log('didInsert: test-child');
	},
	
}).reopenClass({
	positionalParams: ['templateParam', 'definedParam']
});