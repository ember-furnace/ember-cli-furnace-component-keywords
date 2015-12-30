import TC from './test-child';
export default TC.extend({
	definedOtherParam : 'No-definedOtherParam',
	
	definedOtherHash : 'No-definedOtherHash',
	
	didInsertElement : function() {
	},
}).reopenClass({
	positionalParams: ['templateParam', 'definedOtherParam']
});