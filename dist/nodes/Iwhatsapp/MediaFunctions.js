"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUpload = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const form_data_1 = __importDefault(require("form-data"));
async function setupUpload(requestOptions) {
    var _a;
    const mediaPropertyName = this.getNodeParameter('mediaPropertyName');
    if (!mediaPropertyName) {
        return requestOptions;
    }
    if (((_a = this.getInputData().binary) === null || _a === void 0 ? void 0 : _a[mediaPropertyName]) === undefined || !mediaPropertyName.trim()) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Could not find file in node input data', {
            description: `There’s no key called '${mediaPropertyName}' with binary data in it`,
        });
    }
    const binaryFile = this.getInputData().binary[mediaPropertyName];
    const mediaFileName = this.getNodeParameter('additionalFields').mediaFileName;
    const binaryFileName = binaryFile.fileName;
    if (!mediaFileName && !binaryFileName) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No file name given for media upload.');
    }
    const mimeType = binaryFile.mimeType;
    const buffer = await this.helpers.getBinaryDataBuffer(mediaPropertyName);
    const data = new form_data_1.default();
    data.append('file', buffer, {
        contentType: mimeType,
        filename: mediaFileName || binaryFileName,
    });
    data.append('messaging_product', 'whatsapp');
    requestOptions.body = data;
    return requestOptions;
}
exports.setupUpload = setupUpload;
//# sourceMappingURL=MediaFunctions.js.map