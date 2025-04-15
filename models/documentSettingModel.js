import db from "../config/database.js";

function getDocumentSetting(clinicId) {
    return db.query('SELECT * FROM clinic_document_setting WHERE clinic_id = ?', [clinicId]);
}

export default {
    getDocumentSetting
}