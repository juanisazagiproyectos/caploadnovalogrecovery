using CatalogService as service from '../../srv/catalog-service';

annotate CatalogService.Load with {
    fecha_cargue    @title : '{i18n>load_date}';
    pedido          @title : '{i18n>order}';
    actividad       @title : '{i18n>activity}';
    h7a9            @title : '{i18n>h7}';
    h9_01a12        @title : '{i18n>h9}';
    h12_01a18       @title : '{i18n>h12}';
    h18_01a6_59     @title : '{i18n>h18}';
    pend_asignar    @title : '{i18n>pending_assign}';
    motivo          @title : '{i18n>reason}';
    cant_cont_bpiso @title : '{i18n>cant_cont_bpiso}';
    num_contenedor  @title : '{i18n>num_container}';
    modo            @title : '{i18n>mode}';
    status          @title : '{i18n>status}';
    icon_status     @title : '{i18n>status_icon}';
    fecha_envio     @title : '{i18n>send_date}';
    hora_envio      @title : '{i18n>send_time}'
};

annotate service.Load with @(UI : {

    HeaderInfo         : {
        TypeName       : '{i18n>order}',
        TypeNamePlural : '{i18n>orders}',
        Title          : {Value : pedido},
        Description    : {Value : actividad},
        ImageUrl       : icon_status
    },
    
    SelectionFields    : [
        fecha_cargue,
        pedido,
        actividad,
        motivo,
        num_contenedor,
        modo_id,
        status_id,
        fecha_envio,
        hora_envio
    ],
    LineItem           : [
        {
            $Type : 'UI.DataFieldWithUrl',
            Value : icon_status,
            Url   : icon_status
        },
        {Value : fecha_cargue},
        {Value : pedido},
        {Value : actividad},
        {Value : motivo},
        {Value : num_contenedor},
        {Value : modo_id},
        {Value : status_id},
        {Value : fecha_envio},
        {Value : hora_envio}
    ],
    FieldGroup #Orders : {Data : [
        {Value : fecha_cargue},
        {Value : pedido},
        {Value : actividad},
        {Value : h7a9},
        {Value : h9_01a12},
        {Value : h12_01a18},
        {Value : h18_01a6_59},
        {Value : pend_asignar},
        {Value : cant_cont_bpiso},
        {Value : motivo},
        {Value : num_contenedor},
        // {Value : modo_id},
        // {Value : status_id},
        {Value : fecha_envio},
        {Value : hora_envio}
    ]},
    Facets             : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>order}',
        Target : '@UI.FieldGroup#Orders'
    }],
}, ) {
    createdAt @UI.HiddenFilter : false;
    createdBy @UI.HiddenFilter : false;
};

annotate CatalogService.Load with {
    icon_status @(UI.IsImageURL : true)
};

annotate CatalogService.Load with @(Capabilities : {
    DeleteRestrictions : {
        $Type     : 'Capabilities.DeleteRestrictionsType',
        Deletable : false
    },
    UpdateRestrictions : {
        $Type     : 'Capabilities.UpdateRestrictionsType',
        Updatable : false
    },
    InsertRestrictions : {
        $Type      : 'Capabilities.InsertRestrictionsType',
        Insertable : false
    }
});

annotate CatalogService.Load with {
    status @(Common : {
        Text      : {
            $value                 : Status,
            ![@UI.TextArrangement] : #TextOnly,
        },
        ValueList : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Status',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : status,
                    ValueListProperty : 'id'
                },
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : status,
                    ValueListProperty : 'description'
                }
            ]
        },
    });

    modo   @(Common : {
        ValueListWithFixedValues : true,
        ValueList                : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Mode',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : modo,
                ValueListProperty : 'id'
            }]
        },
    });
};

annotate CatalogService.Status with {
    id   @(
        UI     : {Hidden : true},
        Common : {Text : {
            $value                 : description,
            ![@UI.TextArrangement] : #TextOnly,
        }}
    );
    Text @(UI : {HiddenFilter : true});
};

annotate CatalogService.Mode {
    id @(Common : {Text : {
        $value                 : description,
        ![@UI.TextArrangement] : #TextOnly,
    }, })
};
