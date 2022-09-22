"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanPhoneNumber = exports.componentsRequest = exports.templateInfo = exports.mediaUploadFromItem = exports.setType = exports.addTemplateComponents = void 0;
const lodash_set_1 = __importDefault(require("lodash.set"));
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const form_data_1 = __importDefault(require("form-data"));
async function addTemplateComponents(requestOptions) {
    const params = this.getNodeParameter('templateParameters');
    if (!(params === null || params === void 0 ? void 0 : params.parameter)) {
        return requestOptions;
    }
    const components = [
        {
            type: 'body',
            parameters: params.parameter,
        },
    ];
    if (!requestOptions.body) {
        requestOptions.body = {};
    }
    (0, lodash_set_1.default)(requestOptions.body, 'template.components', components);
    return requestOptions;
}
exports.addTemplateComponents = addTemplateComponents;
async function setType(requestOptions) {
    const operation = this.getNodeParameter('operation');
    const messageType = this.getNodeParameter('messageType', null);
    let actualType = messageType;
    if (operation === 'sendTemplate') {
        actualType = 'template';
    }
    Object.assign(requestOptions.body, { type: actualType });
    return requestOptions;
}
exports.setType = setType;
async function mediaUploadFromItem(requestOptions) {
    var _a;
    const mediaPropertyName = this.getNodeParameter('mediaPropertyName');
    if (((_a = this.getInputData().binary) === null || _a === void 0 ? void 0 : _a[mediaPropertyName]) === undefined) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `The binary property "${mediaPropertyName}" does not exist. So no file can be written!`);
    }
    const binaryFile = this.getInputData().binary[mediaPropertyName];
    const mediaFileName = this.getNodeParameter('additionalFields').mediaFilename;
    const binaryFileName = binaryFile.fileName;
    if (!mediaFileName && !binaryFileName) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No file name given for media upload.');
    }
    const mimeType = binaryFile.mimeType;
    const data = new form_data_1.default();
    data.append('file', await n8n_core_1.BinaryDataManager.getInstance().retrieveBinaryData(binaryFile), {
        contentType: mimeType,
        filename: mediaFileName || binaryFileName,
    });
    data.append('messaging_product', 'whatsapp');
    const phoneNumberId = this.getNodeParameter('phoneNumberId');
    const result = (await this.helpers.httpRequestWithAuthentication.call(this, 'whatsAppApi', {
        url: `/${phoneNumberId}/media`,
        baseURL: requestOptions.baseURL,
        method: 'POST',
        body: data,
    }));
    const operation = this.getNodeParameter('operation');
    if (!requestOptions.body) {
        requestOptions.body = {};
    }
    (0, lodash_set_1.default)(requestOptions.body, `${operation}.id`, result.id);
    if (operation === 'document') {
        (0, lodash_set_1.default)(requestOptions.body, `${operation}.filename`, mediaFileName || binaryFileName);
    }
    return requestOptions;
}
exports.mediaUploadFromItem = mediaUploadFromItem;
async function templateInfo(requestOptions) {
    const template = this.getNodeParameter('template');
    const [name, language] = template.split('|');
    if (!requestOptions.body) {
        requestOptions.body = {};
    }
    (0, lodash_set_1.default)(requestOptions.body, 'template.name', name);
    (0, lodash_set_1.default)(requestOptions.body, 'template.language.code', language);
    return requestOptions;
}
exports.templateInfo = templateInfo;
async function componentsRequest(requestOptions) {
    var _a;
    const components = this.getNodeParameter('components');
    const componentsRet = [];
    if (!(components === null || components === void 0 ? void 0 : components.component)) {
        return requestOptions;
    }
    for (const component of components.component) {
        const comp = {
            type: component.type,
        };
        if (component.type === 'body') {
            comp.parameters = (component.bodyParameters.parameter ||
                []).map((i) => {
                if (i.type === 'text') {
                    return i;
                }
                else if (i.type === 'currency') {
                    return {
                        type: 'currency',
                        currency: {
                            code: i.code,
                            fallback_value: i.fallback_value,
                            amount_1000: i.amount_1000 * 1000,
                        },
                    };
                }
                else if (i.type === 'date_time') {
                    return {
                        type: 'date_time',
                        date_time: {
                            fallback_value: i.date_time,
                        },
                    };
                }
            });
        }
        else if (component.type === 'button') {
            comp.index = (_a = component.index) === null || _a === void 0 ? void 0 : _a.toString();
            comp.sub_type = component.sub_type;
            comp.parameters = [component.buttonParameters.parameter];
        }
        else if (component.type === 'header') {
            comp.parameters = component.headerParameters.parameter.map((i) => {
                if (i.type === 'image') {
                    return {
                        type: 'image',
                        image: {
                            link: i.imageLink,
                        },
                    };
                }
                return i;
            });
        }
        componentsRet.push(comp);
    }
    if (!requestOptions.body) {
        requestOptions.body = {};
    }
    (0, lodash_set_1.default)(requestOptions.body, 'template.components', componentsRet);
    return requestOptions;
}
exports.componentsRequest = componentsRequest;
async function cleanPhoneNumber(requestOptions) {
    let phoneNumber = this.getNodeParameter('recipientPhoneNumber');
    phoneNumber = phoneNumber.replace(/[\-\(\)\+]/g, '');
    if (!requestOptions.body) {
        requestOptions.body = {};
    }
    (0, lodash_set_1.default)(requestOptions.body, 'to', phoneNumber);
    return requestOptions;
}
exports.cleanPhoneNumber = cleanPhoneNumber;
//# sourceMappingURL=MessageFunctions.js.map