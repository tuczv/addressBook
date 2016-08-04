var ApplicationConfiguration = (function(){
	var applicationModuleName = "addressbook";
	var applicationModuleVendorDependencies = ['ui.router', 'ngCookies', 'ngMaterial', 'md.data.table', 'ngAnimate', 'ngAria', 'ngMdIcons', 'ngMessages', 'ngMaterialSidemenu'];
	var registerModule = function(moduleName,dependencies){
		angular.module(moduleName, dependencies || []);
	    angular.module(applicationModuleName).requires.push(moduleName);
	};
	
	return{
		applicationModuleName : applicationModuleName,
		applicationModuleVendorDependencies : applicationModuleVendorDependencies,
		registerModule : registerModule
	}
})();