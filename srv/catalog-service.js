const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {
    const {
        Load
    } = this.entities;

    this.after('READ', Load, (each) => {
        if (each.status_id == '20466921-7d57-4e76-b14c-e53fd97dcb02' ) {
            each.icon_status = 'sap-icon://message-success';
        }else{
            each.icon_status = 'sap-icon://message-error';
        }
    })
}
);

