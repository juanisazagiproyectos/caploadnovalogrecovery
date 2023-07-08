sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/m/MessageBox",    
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType, JSONModel) {
        "use strict";
        return Controller.extend("com.uimonitorloaddatanovalog.uimonitorloaddatanovalog.controller.Home", {
            excelSheetsData: [],
            onOpenLoadExcelDialog: function () {
                var oFileUploader = this.getView().byId("uploadSet");
                oFileUploader.removeAllItems();
                this.getView().byId("OpenDialog").open();
             },
             onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
             },
             onCloseDialog: function (oEvent) {
                //this.pDialog.close();
                this.getView().byId("OpenDialog").close();
             },
             onRefresh : function () {
                var oBinding = this.byId("peopleList").getBinding("items");
    
                if (oBinding.hasPendingChanges()) {
                    MessageBox.error(this._getText("refreshNotPossibleMessage"));
                    return;
                }
                oBinding.refresh();
                MessageToast.show(this._getText("refreshSuccessMessage"));
            },
            _getText : function (sTextId, aArgs) {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
    
            },
             onInit: function() {
                //    var oActiveArtistContext = oModel
        	//.bindContext("/Artists(ArtistID='42',IsActiveEntity=true)")
        	//.getBoundContext();
                //var actividad1 = sap.ui.getCore().getModel("mainModel").getProperty("/Status");
            var oMessageManager = sap.ui.getCore().getMessageManager(),
            oMessageModel = oMessageManager.getMessageModel(),
            oMessageModelBinding = oMessageModel.bindList("/", undefined, [],
                new Filter("technical", FilterOperator.EQ, true)),
            oViewModel = new JSONModel({
                busy : false,
                hasUIChanges : false,
                usernameEmpty : false,
                order : 0
            });

			this.getView().setModel(oViewModel, "appView");
			this.getView().setModel(oMessageModel, "message");

			oMessageModelBinding.attachChange(this.onMessageBindingChange, this);
			this._bTechnicalErrors = false;

                this._oTable = this.byId("table0");
                var oDataActividad = {
                    "data":[
                                   {"id":"1","actividad":"PUERTO","descripcion":"Nuevo: Puerto"},
                                   {"id":"2","actividad":"PISO","descripcion":"Nuevo: Piso"},
                                   {"id":"3","actividad":"CY","descripcion":"Nuevo: CY"},
                                   {"id":"4","actividad":"MOD1","descripcion":"Mod1: Ingreso Pedidos para cargar en Planta y despachar a Puerto"},
                                   {"id":"5","actividad":"MOD2","descripcion":"Mod2: Ingreso Pedidos para cargar en Planta y despachar a CY"},
                                   {"id":"6","actividad":"MOD3","descripcion":"Mod3: Reprogramación y/o Cambio Jornada de cargue del dia D"},
                                   {"id":"7","actividad":"MOD4","descripcion":"Mod4: Reprogramación Pedidos que tenian solicitud de bajada a piso"},
                                   {"id":"8","actividad":"MOD5","descripcion":"Mod5: Modificación Pedidos o contenedores que tenian solicitud de bajada a piso y se modifican para cargar en Planta y despachar a Puerto"},
                                   {"id":"9","actividad":"MOD6","descripcion":"Mod6: Modificación Pedidos o contenedores que tenian solicitud de bajada a piso y se modifican para cargar en Planta y despachar a CY"},
                                   {"id":"10","actividad":"MOD7","descripcion":"Mod7: Ingreso de Pedidos nuevos para bajar a piso"},
                                   {"id":"11","actividad":"MOD8","descripcion":"Mod8: Modificación Pedidos o contenedores que tenian cargue en Planta y se modifican para bajar a piso."},
                                   {"id":"12","actividad":"MOD9","descripcion":"Mod9: Cambio lugar a Despachar contenedores llenos"},
                                   {"id":"13","actividad":"MOD10","descripcion":"Mod10: Devolución a Planta de contenedores llenos despachados a Puerto o CY."},
                                   {"id":"14","actividad":"MOD11","descripcion":"Mod11: Cancelación de pedidos o contenedores"}
                                ]
                };
                console.log(oDataActividad); 
                var oModelActividad = new sap.ui.model.json.JSONModel(oDataActividad);
                sap.ui.getCore().setModel(oModelActividad, "oModelActividad");
                var actividad = sap.ui.getCore().getModel("oModelActividad").getProperty("/data");
                var actividadSel;
                for (var i = 0; i < actividad.length; i++) {
                    if (actividad[i].descripcion =="Mod11: Cancelación de pedidos o contenedores"){
                        actividadSel = actividad[i].actividad;
                        console.log(actividad[i].actividad);
                    }
                }
                var oDataTipoMod_Actividad = {
                    "data":[
                                   {"id":"1","tipoMod":"NUEVO","actividades":"PUERTO,CY,PISO"},
                                   {"id":"2","tipoMod":"INGRESO","actividades":"MOD1,MOD2,MOD7"},
                                   {"id":"3","tipoMod":"REPROGRAMACION","actividades":"MOD4"},
                                   {"id":"4","tipoMod":"MODIFICACION","actividades":"MOD5,MOD6,MOD8"},
                                   {"id":"5","tipoMod":"CANCELACION","actividades":"MOD11"},
                                   {"id":"6","tipoMod":"REPROGRAMACIÓN Y/O CAMBIO JORNADA","actividades":"MOD3"},
                                   {"id":"7","tipoMod":"CAMBIO LUGAR","actividades":"MOD9"},
                                   {"id":"8","tipoMod":"DEVOLUCION","actividades":"MOD10"}
                                ]
                };
                var oModelTipoMod_Actividad = new sap.ui.model.json.JSONModel(oDataTipoMod_Actividad);
                sap.ui.getCore().setModel(oModelTipoMod_Actividad, "oModelTipoMod_Actividad");
                var tipoMod_actividad = sap.ui.getCore().getModel("oModelTipoMod_Actividad").getProperty("/data");
                for (var i = 0; i < tipoMod_actividad.length; i++) {
                    var tipoMod_actividadArr = tipoMod_actividad[i].actividades.split(',');
                    for (var j = 0; j < tipoMod_actividadArr.length; j++) {
                        if (tipoMod_actividadArr[j] ==actividadSel)
                        console.log(tipoMod_actividad[j].tipoMod);
                    }
                }

                var oDataTemplate = {
                    "data":[
                                   {"id":"1","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"PUERTO","h7a9":"X","h9_01a12":"","h12_01a18":"X","h18_01a659":"","pend_asignar":"X","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"2","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"PISO","h7a9":"","h9_01a12":"","h12_01a18":"","h18_01a659":"","pend_asignar":"","motivo":"","cant_cont_bpiso":"X","num_contenedor":""},
                                   {"id":"3","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"CY","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"4","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD1","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"5","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD2","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"6","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD3","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"7","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD4","h7a9":"","h9_01a12":"","h12_01a18":"","h18_01a659":"","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"8","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD5","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"X","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"9","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD6","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"X","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"10","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD7","h7a9":"","h9_01a12":"","h12_01a18":"","h18_01a659":"","pend_asignar":"","motivo":"","cant_cont_bpiso":"X","num_contenedor":""},
                                   {"id":"11","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD8","h7a9":"X","h9_01a12":"X","h12_01a18":"X","h18_01a659":"X","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"12","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD9","h7a9":"","h9_01a12":"","h12_01a18":"","h18_01a659":"","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"13","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD10","h7a9":"","h9_01a12":"","h12_01a18":"","h18_01a659":"","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                   {"id":"14","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"MOD11","h7a9":"","h9_01a12":"","h12_01a18":"","h18_01a659":"","pend_asignar":"","motivo":"","cant_cont_bpiso":"","num_contenedor":""},
                                ]
                };

                var oModelTemplate = new sap.ui.model.json.JSONModel(oDataTemplate);
                sap.ui.getCore().setModel(oModelTemplate, "oModelTemplate");

            },
            onUploadSetComplete: function (oEvent) {
                // getting the UploadSet Control reference
                //var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                var oFileUploader = this.getView().byId("uploadSet");
                // since we will be uploading only 1 file so reading the first file object
                var oFile = oFileUploader.getItems()[0].getFileObject();
    
                var reader = new FileReader();
                var that = this;
    
                reader.onload = (e) => {
                    // getting the binary excel file content
                    let xlsx_content = e.currentTarget.result;
    
                    let workbook = XLSX.read(xlsx_content, { type: 'binary' });
                    // here reading only the excel file sheet- Sheet1
                    var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Cargue"]);
                    
    //                workbook.SheetNames.forEach(function (sheetName) {
                        // appending the excel file data to the global variable
    //                    that.excelSheetsData.push(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]));
    //                });
                    that.excelSheetsData.push(XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Cargue"]));
                    //excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    
                    console.log("Excel Data", excelData);
                    console.log("excelSheetsData", that.excelSheetsData);
    //                console.log("Excel Sheets Data", this.excelSheetsData);
                };
                reader.readAsBinaryString(oFile);
                console.log("Upload Successful");
                //MessageToast.show("Upload Successful");
                    console.log("File Uploaded!!!")
                    /* TODO: Read excel file data*/
                },
    
             onUploadSet: function (oEvent) {
                console.log("Upload Button Clicked!!!")
                var payload = {};
                const oList = this._oTable;
                const oBinding = oList.getBinding("items");
                //var oModel = this.getView().getModel();
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "YYYY-MM-DD" });   
                this.excelSheetsData[0].forEach((value, index) => {
                    // setting the payload data
                    var dateParts = value["Fecha de cargue"].split("/");
                    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
                    const yyyy = dateObject.getFullYear();
                    const mm = String(dateObject.getMonth() + 1).padStart(2, "0"); // month is zero-based
                    const dd = String(dateObject.getDate()).padStart(2, "0");
                    //var newdate = value["Fecha de cargue"].split("/").reverse().join("-");
                    console.log(value["Fecha de cargue"])
                    console.log(yyyy + "-"+mm + "-"+dd)
                    var actividad = sap.ui.getCore().getModel("oModelActividad").getProperty("/data");
                    var actividadSel;
                    for (var i = 0; i < actividad.length; i++) {
                        if (actividad[i].descripcion ==value["Actividad"]){
                            actividadSel = actividad[i].actividad;
                            console.log(actividad[i].actividad +"-" + value["Actividad"]);
                        }
                    }
    
                    var tipoModSel;
                    var tipoMod_actividad = sap.ui.getCore().getModel("oModelTipoMod_Actividad").getProperty("/data");
                    for (var i = 0; i < tipoMod_actividad.length; i++) {
                        var tipoMod_actividadArr = tipoMod_actividad[i].actividades.split(',');
                        for (var j = 0; j < tipoMod_actividadArr.length; j++) {
                            if (tipoMod_actividadArr[j] ==actividadSel){
                                tipoModSel = tipoMod_actividad[j].tipoMod;
                                console.log(tipoMod_actividad[j].tipoMod);
                            }
                        }
                    }
//                                   {"id":"1","fecha_cargue":"X","pedido":"X","tipoMod":"X","actividad":"PUERTO","h7a9":"X","h9_01a12":"","h12_01a18":"X","h18_01a659":"","pend_asignar":"X","motivo":"","cant_cont_bpiso":"","num_contenedor":""},

                    var template = sap.ui.getCore().getModel("oModelTemplate").getProperty("/data");
                    var status = 2;
                    var actividadLlena = false;
                    for (var i = 0; i < template.length; i++) {
                        if (template[i].actividad ==actividadSel){
                            actividadLlena = true;
                            if (template[i].fecha_cargue.trim() !="" && value["Fecha de cargue"].trim() =="") status = 1;
                            if (template[i].pedido.trim() !="" && value["Pedido"].trim() =="") status = 1;
                            if (template[i].tipoMod.trim() !="" && tipoModSel.trim() =="") status = 1;
                            if (template[i].actividad.trim() !="" && actividadSel.trim() =="") status = 1;
                            if (template[i].h7a9.trim() !="" && value["7a9"].trim() =="") status = 1;
                            if (template[i].h9_01a12.trim() !="" && value["901a12"].trim() =="") status = 1;
                            if (template[i].h12_01a18.trim() !="" && value["1201a18"].trim() =="") status = 1;
                            if (template[i].h18_01a659.trim() !="" && value["1801a659"].trim() =="") status = 1;
                            if (template[i].pend_asignar.trim() !="" && value["PendienteAsignar"].trim() =="") status = 1;
                            if (template[i].motivo.trim() !="" && value["Motivo"].trim() =="") status = 1;
                            if (template[i].cant_cont_bpiso.trim() !="" && value["CantContenedoresBpiso"].trim() =="") status = 1;
                            if (template[i].num_contenedor.trim() !="" && value["Num Contenedor"].trim() =="") status = 1;
                        }
                    }
    
                    if (actividadLlena == false) status = 1;
                    console.log("status:" + status);
                    var uniqueNumber = new Date().getTime();
                    //uniqueNumber = uniqueNumber.toString().substring(6);
                    var nowMilliseconds = new Date().getUTCMilliseconds();;
                    console.log("pend_asignar: '"+ value["PendienteAsignar"] + "'");
                    const oContext = oBinding.create({
                        "id": Number(uniqueNumber),
                        //"fecha_cargue": yyyy + "-"+mm + "-"+dd,
                        "actividad": actividadSel,
                        "fecha_cargue": this.formatDate(value["Fecha de cargue"]),
                        "pedido": value["Pedido"],
                        "tipoMod": tipoModSel,
                        "h7a9": Number(value["7a9"]),
                        "h9_01a12": Number(value["901a12"]),
                        "h12_01a18": Number(value["1201a18"]),
                        "h18_01a6_59": Number(value["1801a659"]),
                        "pend_asignar": Number(value["PendienteAsignar"]),
                        "motivo": value["Motivo"],
                        "cant_cont_bpiso": Number(value["CantContenedoresBpiso"]),
                        "num_contenedor": value["Num Contenedor"],
                        "status": 1
                    });
                    //    payload = {
                    //    "fecha_cargue": value["Fecha de cargue"],
                    //    "pedido": value["Pedido"],
                    //    "actividad": value["Actividad"]
                    //};
                    // setting excel file row number for identifying the exact row in case of error or success
                    payload.ExcelRowNumber = (index + 1);
                    // calling the odata service
                    //oContext.created().then(fnSuccess, fnError);
                    try { 
                    oContext.created().then(
                        function () {
                            console.log("Creado correctamente");
                            //sap.m.MessageToast.show("Registros adicionados");
                        }, function (oError) {
                            console.log("Error en creacion: " + oError.toString());
                            sap.m.MessageToast.show(oError.toString());
                    });   
                } catch (err) {
                    sap.m.MessageBox.alert(err.toString());
                }                 
                });
                
                this.getView().byId("OpenDialog").close();
                //var oSorter = new Sorter({path: mainModel>fecha_cargue, descending: true});
                //this.byId("table0").getBinding("items").sort(oSorter);


            },
             onCreate: function () {
                var oSo = this.getView().byId("idSo").getValue();
                if (oSo !== "") {
                    const oList = this._oTable;
                        const oBinding = oList.getBinding("items");
                        const oContext = oBinding.create({
                            "soNumber": this.byId("idSo").getValue(),
                            "customerName": this.byId("idCustName").getValue(),
                            "customerNumber": this.byId("idCustomer").getValue(),
                            "PoNumber": this.byId("idPo").getValue(),
                            "inquiryNumber": this.byId("idInqNumber").getValue()      
                        });
                        oContext.created()
                        .then(()=>{
                                // that._focusItem(oList, oContext);
                                this.getView().byId("OpenDialog").close();
                        });
  
                }else {
                    MessageToast.show("So cannot be blank");
                }
    
            },
            onDelete: function(){

                var oSelected = this.byId("table0").getSelectedItem();
                if(oSelected){
                    
                    oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
                        sap.m.MessageToast.show("Borrado correctamente");
                    }.bind(this), function (oError) {
                        sap.m.MessageToast.show("Error Borrando: " + oError);
                    });
                } else {
                    MessageToast.show("Seleccione una fila a borrar");
                }
                
            },
            onSave: function(){
                var rowItems = this.getView().byId("table0").getSelectedItems();
                //var rowItems = table.getItems();
                if (rowItems.length !== 0) {
                    for (var i = 0; i < rowItems.length; i++) { 
                        var item = rowItems[i];
                        var oModelTable0 = this.getView().byId("table0").getModel("mainModel");
                        var bindingPath = item.getBindingContext("mainModel").getPath();
                        item.getBindingContext("mainModel").setProperty(bindingPath + "/mensaje", "prueba");
                        item.getBindingContext("mainModel").setProperty(bindingPath + "/status", 3);
                                                //item.getBindingContext("mainModel").getPath().setProperty("actividad","MOD99");
                        var Cells = item.getCells();
                        var pushData = {
                            tipo: {
                                valor: Cells[3].getText().trim(),
                                parametros: [],
                            }
                        };
                    if (Cells[0].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "FechaCargue",
                            "valor"  : Cells[0].getText().trim()
                        });
                    }
                    if (Cells[1].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "NumeroPedido",
                            "valor"  : Cells[1].getText().trim()
                        });
                    }
                    if (Cells[2].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "TipoModificacion",
                            "valor"  : Cells[2].getText().trim()
                        });
                    }
                    if (Cells[3].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "Actividad",
                            "valor"  : Cells[3].getText().trim()
                        });
                    }
                    if (Cells[4].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "H7_H9",
                            "valor"  : Cells[4].getText().trim()
                        });
                    }
                    if (Cells[5].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "H9_H12",
                            "valor"  : Cells[5].getText().trim()
                        });
                    }
                    if (Cells[6].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "H12_H18",
                            "valor"  : Cells[6].getText().trim()
                        });
                    }
                    if (Cells[7].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "H18_H7",
                            "valor"  : Cells[7].getText().trim()
                        });
                    }
                    if (Cells[8].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "PendienteAsignar",
                            "valor"  : Cells[8].getText().trim()
                        });
                    }
                    if (Cells[9].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "Motivo",
                            "valor"  : Cells[9].getText().trim()
                        });
                    }
                    if (Cells[10].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "CantContenedoresBpiso",
                            "valor"  : Cells[10].getText().trim()
                        });
                    }
                    if (Cells[11].getText().trim() !== ""){
                        pushData.tipo.parametros.push({ 
                            "nombre" : "NunContenedor",
                            "valor"  : Cells[11].getText().trim()
                        });
                    }

                    this.refreshModel("mainModel");
                    //sap.ui.getCore().getModel("mainModel").refresh(true);
                    //sap.ui.getCore().getModel("mainModel").refresh(true);
                    //this.byId("table0").getBinding("items").refresh();
                    //this.getView().byId("table0").getModel("mainModel").refresh(true);
                    }
                    } else {
                        MessageToast.show("Seleccione registros a enviar");
                    }
            },
            formatDate: function (date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
            
                if (month.length < 2) 
                    month = '0' + month;
                if (day.length < 2) 
                    day = '0' + day;
            
                return [year, month, day].join('-');
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
                        console.log("Registro actualizado correctamente");
                    },reject)
                    .catch(function errorHandler(err) {
                        console.log("Error actualizando registro "+ err.message); // 'Oops!'
                      });
                } else {
                    that.getView().getModel(sModelName).refresh(sGroup);
                    resolve();
                }
            },
            populateItems: function(sId, oContext) {
                var listaStatus = sap.ui.getCore().getModel("oModelStatus").getProperty("/data");
                var statusSel, state, status_icon, id;
                //id = "1";
                var id = oContext.getProperty("status");
                for (var i = 0; i < listaStatus.length; i++) {
                    if (listaStatus[i].id ==id){
                        statusSel = listaStatus[i].descripcion;
                        //console.log(oContext.getProperty("actividad")+"-"+id + "-"+ statusSel);
                    }
                }                
                if (id=="1"){state="Warning"; status_icon="sap-icon://alert";}
                if (id=="2"){state="Information"; status_icon="sap-icon://information";}
                if (id=="3"){state="Success"; status_icon="sap-icon://sys-enter-2";}
                if (id=="4"){state="Error"; status_icon="sap-icon://error";}

                var row = new sap.m.ColumnListItem(sId, {
                    type: "Active",
                    cells: [
                           new sap.m.Text({
                               text: "{mainModel>fecha_cargue}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>pedido}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>tipoMod}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>actividad}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>h7a9}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>h9_01a12}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>h12_01a18}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>h18_01a6_59}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>pend_asignar}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>motivo}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>cant_cont_bpiso}"
                           }),
                           new sap.m.Text({
                               text: "{mainModel>num_contenedor}"
                           }),
                           new sap.m.Text({
                            text: "{mainModel>status}",
                            visible:false
                        }),
                        new sap.m.ObjectStatus({
                            text: statusSel,
                            state :state,
                            icon:status_icon,
                        }),
                        new sap.m.Text({
                            text: "{mainModel>mensaje}",
                            visible:true
                        })
                 ]
                });
                return row;
            },
            });
            
    });
