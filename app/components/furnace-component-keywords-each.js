import Ember from 'ember';
import CK from 'furnace-component-keywords';
export default Ember.Component.extend({
	_itemComponent : null,
	
	_models: null,
	
	init : function() {
		this._super();
		this.keywords.itemComponent=this._itemComponent;
		
	}
}).reopenClass({
	positionalParams: ['__positionalParam0','__positionalParam1','__positionalParam2','__positionalParam3','__positionalParam4','__positionalParam5','__positionalParam6','__positionalParam7','__positionalParam8','__positionalParam9']
}).keywords({
	itemComponent : CK.component()
})