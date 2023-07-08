namespace com.novalog;

using {managed} from '@sap/cds/common';
@odata.draft.enabled
entity Status : managed {
    key id          : Integer;
        description : String(100);
        icono : String(100);
};
@odata.draft.enabled
entity TipoMod_Actividad : managed {
    key id          : Integer;
        tipoMod : String(50);
        actividades: String(200)
};
@odata.draft.enabled
entity Parameter : managed {
    key id        : Integer;
        Parameter : String(20);
        Value     : String(500);
};
@odata.draft.enabled
entity Template : managed {
    key id              : Integer;
        template        : String(100);
        fecha_cargue    : Date;
        pedido          : String(1);
        actividad       : String(1);
        h7a9            : String(1);
        h9_01a12        : String(1);
        h12_01a18       : String(1);
        h18_01a659      : String(1);
        pend_asignar    : String(1);
        motivo          : String(1);
        cant_cont_bpiso : String(1);
        num_contenedor  : String(1);
};
@odata.draft.enabled
entity Load : managed {
    key id              : Integer64;
        fecha_cargue    : Date;
        pedido          : String(20);
        tipoMod         : String(50);
        actividad       : String(200);
        h7a9            : Integer;
        h9_01a12        : Integer;
        h12_01a18       : Integer;
        h18_01a6_59     : Integer;
        pend_asignar    : Integer;
        motivo          : String(200);
        cant_cont_bpiso : Integer;
        num_contenedor  : String(100);
        status          : Integer;
        fecha_envio     : Date;
        hora_envio      : Time;
        mensaje         : String(200);
};
@odata.draft.enabled
entity Actividad : managed {
    key id          : Integer;
        actividad : String(50);
        des_actividad: String(200)
};
