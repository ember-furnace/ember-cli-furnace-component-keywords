import Ember from 'ember';

export default Ember.Component.extend({

	test: 'no-child',
	
	definedParam : 'definedParam',
	
	templateParam : 'templateParam',
	
	definedHash : 'definedHash',
	
	templateHash : 'templateHash',
	
	init : function() {
		this._super();
		this.set('target',this.get('targetObject'));
	},
	
	cp : 'test-child',
	
	click: function() {
		if(this.get('definedParam')==='definedParam') {
			this.set('definedParam','definedParam-Updated');
			this.set('definedHash','definedHash-Updated');
		} else {
			if(this.get('templateParam')==='templateParam-Updated') { 
				this.set('definedParam','definedParam');
				this.set('definedHash','definedHash');
				this.set('templateParam','templateParam');
				this.set('templateHash','templateHash');
			} else {
				this.set('cp','test-dynamic-child');
				this.set('templateParam','templateParam-Updated');
				this.set('templateHash','templateHash-Updated');
			}
		}
	}
});