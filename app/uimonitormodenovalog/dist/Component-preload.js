//@ui5-bundle com/esenttia/uimonitormodenovalog/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"com/esenttia/uimonitormodenovalog/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","com/esenttia/uimonitormodenovalog/model/models"],function(e,t,i){"use strict";return e.extend("com.esenttia.uimonitormodenovalog.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
},
	"com/esenttia/uimonitormodenovalog/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(o){"use strict";return o.extend("com.esenttia.uimonitormodenovalog.controller.App",{onInit(){}})});
},
	"com/esenttia/uimonitormodenovalog/controller/Home.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(o){"use strict";return o.extend("com.esenttia.uimonitormodenovalog.controller.Home",{onInit:function(){}})});
},
	"com/esenttia/uimonitormodenovalog/i18n/i18n.properties":'# This is the resource bundle for com.esenttia.uimonitormodenovalog\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle= Administraci\\u00f3n Modos\n\n#YDES: Application description\nappDescription=Administracion de modos Novalog\n#XTIT: Main view title\ntitle= Administraci\\u00f3n Modos\n\nflpTitle=Administrador Modos\n\nflpSubtitle=\n',
	"com/esenttia/uimonitormodenovalog/manifest.json":'{"_version":"1.48.0","sap.app":{"id":"com.esenttia.uimonitormodenovalog","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.8.2","toolsId":"e7295f55-c0fb-4a1c-a91d-9e3219d8ed59"},"dataSources":{"mainService":{"uri":"catalog/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"com-esenttia-uimonitormodenovalog-inbound":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"Modo","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.108.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"com.esenttia.uimonitormodenovalog.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"com.esenttia.uimonitormodenovalog.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RouteHome","pattern":":?query:","target":["TargetHome"]}],"targets":{"TargetHome":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"Home","viewName":"Home"}}},"rootView":{"viewName":"com.esenttia.uimonitormodenovalog.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"apprcaploadnovalog"}}',
	"com/esenttia/uimonitormodenovalog/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"com/esenttia/uimonitormodenovalog/utils/locate-reuse-libs.js":'(function(e){var t=function(e,t){var n=["sap.apf","sap.base","sap.chart","sap.collaboration","sap.f","sap.fe","sap.fileviewer","sap.gantt","sap.landvisz","sap.m","sap.ndc","sap.ovp","sap.rules","sap.suite","sap.tnt","sap.ui","sap.uiext","sap.ushell","sap.uxap","sap.viz","sap.webanalytics","sap.zen"];Object.keys(e).forEach(function(e){if(!n.some(function(t){return e===t||e.startsWith(t+".")})){if(t.length>0){t=t+","+e}else{t=e}}});return t};var n=function(e){var n="";if(e){if(e["sap.ui5"]&&e["sap.ui5"].dependencies){if(e["sap.ui5"].dependencies.libs){n=t(e["sap.ui5"].dependencies.libs,n)}if(e["sap.ui5"].dependencies.components){n=t(e["sap.ui5"].dependencies.components,n)}}if(e["sap.ui5"]&&e["sap.ui5"].componentUsages){n=t(e["sap.ui5"].componentUsages,n)}}return n};var r=function(e){var t=e;return new Promise(function(r,a){$.ajax(t).done(function(e){r(n(e))}).fail(function(){a(new Error("Could not fetch manifest at \'"+e))})})};var a=function(e){if(e){Object.keys(e).forEach(function(t){var n=e[t];if(n&&n.dependencies){n.dependencies.forEach(function(e){if(e.url&&e.url.length>0&&e.type==="UI5LIB"){jQuery.sap.log.info("Registering Library "+e.componentId+" from server "+e.url);jQuery.sap.registerModulePath(e.componentId,e.url)}})}})}};e.registerComponentDependencyPaths=function(e){return r(e).then(function(e){if(e&&e.length>0){var t="/sap/bc/ui2/app_index/ui5_app_info?id="+e;var n=jQuery.sap.getUriParameters().get("sap-client");if(n&&n.length===3){t=t+"&sap-client="+n}return $.ajax(t).done(a)}})}})(sap);var scripts=document.getElementsByTagName("script");var currentScript=document.getElementById("locate-reuse-libs");if(!currentScript){currentScript=document.currentScript}var manifestUri=currentScript.getAttribute("data-sap-ui-manifest-uri");var componentName=currentScript.getAttribute("data-sap-ui-componentName");var useMockserver=currentScript.getAttribute("data-sap-ui-use-mockserver");var bundleResources=function(){jQuery.sap.require("jquery.sap.resources");var e=sap.ui.getCore().getConfiguration().getLanguage();var t=jQuery.sap.resources({url:"i18n/i18n.properties",locale:e});document.title=t.getText("appTitle")};sap.registerComponentDependencyPaths(manifestUri).catch(function(e){jQuery.sap.log.error(e)}).finally(function(){sap.ui.getCore().attachInit(bundleResources);if(componentName&&componentName.length>0){if(useMockserver&&useMockserver==="true"){sap.ui.getCore().attachInit(function(){sap.ui.require([componentName.replace(/\\./g,"/")+"/localService/mockserver"],function(e){e.init();sap.ushell.Container.createRenderer().placeAt("content")})})}else{sap.ui.require(["sap/ui/core/ComponentSupport"]);sap.ui.getCore().attachInit(bundleResources)}}else{sap.ui.getCore().attachInit(function(){sap.ushell.Container.createRenderer().placeAt("content")})}});sap.registerComponentDependencyPaths(manifestUri);',
	"com/esenttia/uimonitormodenovalog/view/App.view.xml":'<mvc:View controllerName="com.esenttia.uimonitormodenovalog.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"com/esenttia/uimonitormodenovalog/view/Home.view.xml":'<mvc:View controllerName="com.esenttia.uimonitormodenovalog.controller.Home"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><Page id="page" title="{i18n>title}"><content /></Page></mvc:View>\n'
}});
