using {com.novalog as novalog} from '../db/schema';

service CatalogService @(requires: 'authenticated-user') {
    entity Status @(restrict: [
        {
            grant: ['READ'],
            to   : ['NovalogViewer']
        },
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : ['NovalogCreateHV']
        },
        {
            grant: [
                'READ',
                'UPDATE'
            ],
            to   : ['NovalogUpdateHV']
        },
        {
            grant: [
                'READ',
                'DELETE'
            ],
            to   : ['NovalogDeleteHV']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerHV']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerALL']
        }
    ]) as projection on novalog.Status;

    // @cds.persistence.exists
    // @cds.persistence.calcview
    entity Parameter @(restrict: [
        {
            grant: ['READ'],
            to   : ['NovalogViewer']
        },
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : ['NovalogCreateHV']
        },
        {
            grant: [
                'READ',
                'UPDATE'
            ],
            to   : ['NovalogUpdateHV']
        },
        {
            grant: [
                'READ',
                'DELETE'
            ],
            to   : ['NovalogDeleteHV']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerHV']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerALL']
        }
    ]) as projection on novalog.Parameter;

    entity Template @(restrict: [
        {
            grant: ['READ'],
            to   : ['NovalogViewer']
        },
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : ['NovalogCreateTemplate']
        },
        {
            grant: [
                'READ',
                'UPDATE'
            ],
            to   : ['NovalogUpdateTemplate']
        },
        {
            grant: [
                'READ',
                'DELETE'
            ],
            to   : ['NovalogDeleteTemplate']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerTemplate']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerALL']
        }
    ]) as projection on novalog.Template;

    entity Load @(restrict: [
        {
            grant: ['READ'],
            to   : ['NovalogViewer']
        },
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : ['NovalogCreateLoad']
        },
        {
            grant: [
                'READ',
                'UPDATE'
            ],
            to   : ['NovalogUpdateLoad']
        },
        {
            grant: [
                'READ',
                'DELETE'
            ],
            to   : ['NovalogDeleteLoad']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerLoad']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerALL']
        }
    ]) as projection on novalog.Load;

    entity Actividad @(restrict: [
        {
            grant: ['READ'],
            to   : ['NovalogViewer']
        },
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : ['NovalogCreateLoad']
        },
        {
            grant: [
                'READ',
                'UPDATE'
            ],
            to   : ['NovalogUpdateLoad']
        },
        {
            grant: [
                'READ',
                'DELETE'
            ],
            to   : ['NovalogDeleteLoad']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerLoad']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerALL']
        }
    ]) as projection on novalog.Actividad;

    entity TipoMod_Actividad @(restrict: [
        {
            grant: ['READ'],
            to   : ['NovalogViewer']
        },
        {
            grant: [
                'READ',
                'CREATE'
            ],
            to   : ['NovalogCreateLoad']
        },
        {
            grant: [
                'READ',
                'UPDATE'
            ],
            to   : ['NovalogUpdateLoad']
        },
        {
            grant: [
                'READ',
                'DELETE'
            ],
            to   : ['NovalogDeleteLoad']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerLoad']
        },
        {
            grant: ['*'],
            to   : ['NovalogManagerALL']
        }
    ]) as projection on novalog.TipoMod_Actividad;
}
