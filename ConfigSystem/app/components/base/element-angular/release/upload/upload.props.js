import { EventEmitter, Input, Output } from '@angular/core';
export class ElUploadProps {
    constructor() {
        this.data = {};
        this.name = 'file';
        this.drag = false;
        this.multiple = false;
        this.disabled = false;
        this.headers = {};
        this.withCredentials = false;
        this.showFileList = true;
        this.listType = 'text';
        // @Input('auto-upload') autoUpload: boolean = true
        this.fileList = [];
        // lifecycle event
        this.preview = new EventEmitter();
        this.remove = new EventEmitter();
        this.progress = new EventEmitter();
        // about http event
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.uploadFilter = f => true;
    }
    /**
     * @return {?}
     */
    get lifecycle() {
        return {
            preview: (f) => this.preview.emit(f),
            remove: (f) => this.remove.emit(f),
            success: (f, res) => this.success.emit({ commonFile: f, response: res }),
            error: (f, err) => this.error.emit({ commonFile: f, error: err }),
            progress: (f, percentage) => this.progress.emit({ commonFile: f, percentage }),
        };
    }
}
ElUploadProps.propDecorators = {
    'data': [{ type: Input },],
    'name': [{ type: Input },],
    'action': [{ type: Input },],
    'accept': [{ type: Input },],
    'drag': [{ type: Input },],
    'multiple': [{ type: Input },],
    'disabled': [{ type: Input },],
    'headers': [{ type: Input },],
    'withCredentials': [{ type: Input, args: ['with-credentials',] },],
    'showFileList': [{ type: Input, args: ['show-file-list',] },],
    'listType': [{ type: Input, args: ['list-type',] },],
    'fileList': [{ type: Input, args: ['file-list',] },],
    'preview': [{ type: Output },],
    'remove': [{ type: Output },],
    'progress': [{ type: Output },],
    'success': [{ type: Output },],
    'error': [{ type: Output },],
    'uploadFilter': [{ type: Input, args: ['upload-filter',] },],
};
function ElUploadProps_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadProps.propDecorators;
    /** @type {?} */
    ElUploadProps.prototype.data;
    /** @type {?} */
    ElUploadProps.prototype.name;
    /** @type {?} */
    ElUploadProps.prototype.action;
    /** @type {?} */
    ElUploadProps.prototype.accept;
    /** @type {?} */
    ElUploadProps.prototype.drag;
    /** @type {?} */
    ElUploadProps.prototype.multiple;
    /** @type {?} */
    ElUploadProps.prototype.disabled;
    /** @type {?} */
    ElUploadProps.prototype.headers;
    /** @type {?} */
    ElUploadProps.prototype.withCredentials;
    /** @type {?} */
    ElUploadProps.prototype.showFileList;
    /** @type {?} */
    ElUploadProps.prototype.listType;
    /** @type {?} */
    ElUploadProps.prototype.fileList;
    /** @type {?} */
    ElUploadProps.prototype.preview;
    /** @type {?} */
    ElUploadProps.prototype.remove;
    /** @type {?} */
    ElUploadProps.prototype.progress;
    /** @type {?} */
    ElUploadProps.prototype.success;
    /** @type {?} */
    ElUploadProps.prototype.error;
    /** @type {?} */
    ElUploadProps.prototype.uploadFilter;
}
//# sourceMappingURL=upload.props.js.map