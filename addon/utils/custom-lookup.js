function CustomLookup(type,name,layoutName) {
	this.type=type;
	this.name=name;
	this.layoutName=layoutName;
}
CustomLookup.prototype={
	charAt:function(index) {
		return this.name.charAt(index);
	},
	indexOf:function(char) {
		return this.name.indexOf(char);
	},
	toString : function()  {
		return this.type+':'+this.name;
	},
	match : function(test) {
		return this.toString().match(test);
	}
};

export default CustomLookup;