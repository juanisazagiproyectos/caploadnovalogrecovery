/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/uimonitorloaddatanovalog/uimonitorloaddatanovalog/model/models"
],
function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("com.uimonitorloaddatanovalog.uimonitorloaddatanovalog.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            var oList = this.getModel("mainModel").bindList("/Status");
            var oDataStatus = {
                "data":[
                ]
            };
            oList.requestContexts(0, 20).then(function (aContexts) {
                aContexts.forEach(function (oContext) {
                    oDataStatus.data.push({"id":oContext.getProperty("id"),"descripcion":oContext.getProperty("description")});
            //        console.log("id" + oContext.getProperty("id") +" descripcion"+oContext.getProperty("description"));
            });
            });
            var oModelStatus = new sap.ui.model.json.JSONModel(oDataStatus);
            sap.ui.getCore().setModel(oModelStatus, "oModelStatus");


        }
    });
}
);