sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/util/uid"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.esenttia.uimonitorstatusnovalog.controller.Home", {
            onInit: function () {
                this._oTable = this.byId("table0");
                this._createReadOnlyTemplates();
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                this.oEditableTemplate = new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Input({
                            value: "{mainModel>id}",
                            change: [this.onInputChange, this]
                        }), new sap.m.Input({
                            value: "{mainModel>description}",
                            change: [this.onInputChange, this]
                        })
                    ]
                });
            },
            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
             },
             onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
             },
             onCreate: function () {
                var oSo = this.getView().byId("id").getValue();
                var dialog = this.getView().byId("OpenDialog");
                if (oSo !== "") {
                    var oList = this._oTable;
                    var oBinding = oList.getBinding("items");
                    var uniqueID = globalThis.crypto.randomUUID();
                    var currDateTime = new Date();
                    var dateTZDformat = currDateTime.toJSON(); // return "2013-09-23T07:42:18.730Z"
                    var email = "juan.isaza@giproyectos.com";
                    var today = new Date();
                        const oContext = oBinding.create({
                            "id": uniqueID,//this.byId("id").getValue(),
                            "description": this.byId("descripcion").getValue(),
                            "createdBy": email,
                            "createdAt": dateTZDformat
                        });

                        try { 
                            oContext.created().then(
                                function () {
                                    dialog.close();
                                    sap.m.MessageToast.show("Registro adicionado correctamente");
                                }, function (oError) {
                                    dialog.close();
                                    sap.m.MessageToast.show(oError.toString());
                            });   
                        } catch (err) {
                            sap.m.MessageBox.alert(err.toString());
                        }                 
         
  
                }else {
                    sap.m.MessageBox.alert("Debe ingresar un ID");
                }
    
            },
            onDelete: function(){

                var oSelected = this.byId("table0").getSelectedItem();
                if(oSelected){
                    var oSalesOrder = oSelected.getBindingContext("mainModel").getObject().id;
                    oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
                        sap.m.MessageToast.show(oSalesOrder + " borrado exitosamente");
                    }.bind(this), function (oError) {
                        sap.m.MessageToast.show("Error borrando: " + oError);
                    });
                } else {
                    sap.m.MessageToast.show("Seleccione una fila para borrar");
                }
                
            },
            onEditMode: function(){
                this.byId("editModeButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.byId("deleteButton").setVisible(true);
                this.rebindTable(this.oEditableTemplate, "Edit");
           },
           rebindTable: function(oTemplate, sKeyboardMode) {
            this._oTable.bindItems({
                path: "mainModel>/Status",
                template: oTemplate,
                templateShareable: true
            }).setKeyboardMode(sKeyboardMode);
            },
            onInputChange: function(){
                this.refreshModel("mainModel");

            },
            refreshModel: function (sModelName, sGroup){
                return new Promise((resolve,reject)=>{
                    this.makeChangesAndSubmit.call(this,resolve,reject,
                    sModelName,sGroup);
                });
                
            },
            makeChangesAndSubmit: function (resolve, reject, sModelName,sGroup){
                const that = this;
                sModelName = "mainModel";
                sGroup = "$auto";
                if (that.getView().getModel(sModelName).hasPendingChanges(sGroup)) {
                    that.getView().getModel(sModelName).submitBatch(sGroup).then(oSuccess =>{
                        that.makeChangesAndSubmit(resolve,reject, sModelName,sGroup);
                        sap.m.MessageToast.show("Registro actualizado correctamente");
                    },reject)
                    .catch(function errorHandler(err) {
                        sap.m.MessageToast.show("Error actualizando registro ",err.message); // 'Oops!'
                      });
                } else {
                    that.getView().getModel(sModelName).refresh(sGroup);
                    resolve();
                }
            },
            onSave: function(){
                this.getView().byId("editModeButton").setVisible(true);
                this.getView().byId("saveButton").setVisible(false);
                this._oTable.setMode(sap.m.ListMode.None);
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                
            },
            _createReadOnlyTemplates: function () {
                this.oReadOnlyTemplate = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: "{mainModel>id}"
					}),
					new sap.m.Text({
						text: "{mainModel>description}"
					})
				]
			});
            },
        });
    });
