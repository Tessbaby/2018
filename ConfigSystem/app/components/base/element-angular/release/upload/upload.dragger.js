import { Component, EventEmitter, Input, Output } from '@angular/core';
export class ElUploadDragger {
    constructor() {
        this.disabled = false;
        this.change = new EventEmitter();
        this.dragger = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragoverHandle(event) {
        event.preventDefault();
        if (this.disabled)
            return;
        this.dragger = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragLeaveHandle(event) {
        event.preventDefault();
        this.dragger = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropHandle(event) {
        event.preventDefault();
        if (this.disabled)
            return;
        this.change.emit({ target: { files: event.dataTransfer.files } });
    }
}
ElUploadDragger.decorators = [
    { type: Component, args: [{
                selector: 'el-upload-dragger',
                template: `
    <div class="el-upload-dragger"
      [class.is-dragover]="dragger"
      (drop)="dropHandle($event)"
      (dragover)="dragoverHandle($event)"
      (dragleave)="dragLeaveHandle($event)">
      <ng-content></ng-content>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElUploadDragger.ctorParameters = () => [];
ElUploadDragger.propDecorators = {
    'disabled': [{ type: Input },],
    'change': [{ type: Output },],
};
function ElUploadDragger_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadDragger.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUploadDragger.ctorParameters;
    /** @type {?} */
    ElUploadDragger.propDecorators;
    /** @type {?} */
    ElUploadDragger.prototype.disabled;
    /** @type {?} */
    ElUploadDragger.prototype.change;
    /** @type {?} */
    ElUploadDragger.prototype.dragger;
}
//# sourceMappingURL=upload.dragger.js.map