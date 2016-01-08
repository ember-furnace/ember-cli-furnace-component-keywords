function ClassComponent(componentClass,layoutName) {
	this.componentClass=componentClass;
	this.layoutName=layoutName;
}
ClassComponent.prototype={
	charAt:function() {
		return '@';
	},
	indexOf:function() {
		return -1;
	},
	match :function() {
		return false;
	}
};

export default ClassComponent;