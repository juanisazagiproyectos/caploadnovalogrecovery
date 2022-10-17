namespace com.novalog;

using {managed} from '@sap/cds/common';

entity Status : managed {
    key id          : UUID @(Core.Computed : True);
    key code        : String(1);
        description : String(100)
};

@cds.persistence.exists
@cds.persistence.calcview
entity Parameter : managed {
    key id        : UUID @(Core.Computed : True);
        Parameter : String(20);
        Value     : String(500)
};

entity Mode : managed {
    key id          : UUID @(Core.Computed : True);
        description : String(100)

};

entity Template : managed {
    key id              : UUID @(Core.Computed : True);
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

entity Load : managed {
    key id              : UUID @(Core.Computed : True);
        fecha_cargue    : Date;
        pedido          : String(20);
        actividad       : String(200);
        h7a9            : Integer;
        h9_01a12        : Integer;
        h12_01a18       : Integer;
        h18_01a6_59     : Integer;
        pend_asignar    : Integer;
        motivo          : String(200);
        cant_cont_bpiso : Integer;
        num_contenedor  : String(100);
        modo            : Association to Mode;
        status          : Association to Status;
        icon_status     : String(50);
        fecha_envio     : Date;
        hora_envio      : Time
}
