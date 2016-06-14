import {ComponentLookup} from 'furnace-component-keywords/private-api';
import ClassComponent from 'furnace-component-keywords/utils/class-component';
import CustomLookup from 'furnace-component-keywords/utils/custom-lookup';
export default ComponentLookup.extend({
	componentFor: function (name, container) {
		var fullName;
		if(name instanceof ClassComponent) {
			return name.componentClass;
		} else if(name instanceof CustomLookup) {
			fullName = name.type + ':' + name.name;
		    return container.lookupFactory(fullName);
		} else if(name.indexOf(':')>-1) {
			var factory= container.lookupFactory(name);
			if(factory && !factory.typeKey) {
				name=name.substring(name.indexOf(':')+1);
				factory.typeKey=name;
			}
			return factory;
		} else { // TODO: This should be optional
			fullName = 'component:' + name;
		    return container.lookupFactory(fullName);
		}		
		//return this._super(name,container);
    },
    layoutFor: function (name, container) {
    	var templateFullName;
    	if(name instanceof ClassComponent) {
    		if(name.layoutName) {
    			templateFullName = 'template:' + name.layoutName;
    		    return container.lookup(templateFullName);
    		} else {
    			return null;
    		}
		} else if(name instanceof CustomLookup) {
			var fullName = 'template:' + name.type + '/'+ name.name;
		    return container.lookup(fullName);
		} else if(name.indexOf(':')>-1) {
			let type =name.substring(0,name.indexOf(':')-1);
			name=name.substring(name.indexOf(':')+1);
			return container.lookup('template:'+type+name);
		} else { // TODO: This should be optional
			templateFullName = 'template:components/' + name;
			return container.lookup(templateFullName);
		}
		//return this._super(name,container);
    },
});