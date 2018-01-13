import { Component, EventEmitter, Input, Output } from '@angular/core';
export class ElUploadList {
    constructor() {
        this.files = [];
        this.disabled = false;
        this.remove = new EventEmitter();
        this.preview = new EventEmitter();
    }
    /**
     * @param {?} file
     * @return {?}
     */
    clickHandle(file) {
    }
    /**
     * @param {?} file
     * @return {?}
     */
    removeHandle(file) {
        this.remove.emit(file);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    previewHandle(file) {
        this.preview.emit(file);
    }
}
ElUploadList.decorators = [
    { type: Component, args: [{
                selector: 'el-upload-list',
                template: `
    <ul [class]="'el-upload-list el-upload-list--' + listType"
      [class.is-disabled]="disabled">
      <li *ngFor="let file of files; let i = index"
        [class]="'el-upload-list__item is-' + file.status">
        <img class="el-upload-list__item-thumbnail"
          *ngIf="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          [src]="file.url">
        <a class="el-upload-list__item-name" (click)="clickHandle(file)">
          <i class="el-icon-document"></i>
          {{file.name}}
        </a>
        <label class="el-upload-list__item-status-label">
          <i [class.el-icon-check]="['picture-card', 'picture'].indexOf(listType) > -1"
            [class.el-icon-circle-check]="listType === 'text'"
            [class.el-icon-upload-success]="true"></i>
        </label>
        <i class="el-icon-close" *ngIf="!disabled" (click)="removeHandle(file)"></i>
        <el-progress *ngIf="file.status === 'uploading'"
          [type]="listType === 'picture-card' ? 'circle' : 'line'"
          [stroke-width]="listType === 'picture-card' ? 6 : 2"
          [percentage]="file.percentage">
        </el-progress>
        <span class="el-upload-list__item-actions" *ngIf="listType === 'picture-card'">
        <span class="el-upload-list__item-preview"
          *ngIf="listType === 'picture-card'"
          (click)="previewHandle(file)">
          <i class="el-icon-view"></i>
        </span>
        <span class="el-upload-list__item-delete"
          *ngIf="!disabled"
          (click)="removeHandle(file)">
          <i class="el-icon-delete2"></i>
        </span>
      </span>
      </li>
    </ul>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElUploadList.ctorParameters = () => [];
ElUploadList.propDecorators = {
    'files': [{ type: Input },],
    'disabled': [{ type: Input },],
    'listType': [{ type: Input, args: ['list-type',] },],
    'remove': [{ type: Output },],
    'preview': [{ type: Output },],
};
function ElUploadList_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUploadList.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUploadList.ctorParameters;
    /** @type {?} */
    ElUploadList.propDecorators;
    /** @type {?} */
    ElUploadList.prototype.files;
    /** @type {?} */
    ElUploadList.prototype.disabled;
    /** @type {?} */
    ElUploadList.prototype.listType;
    /** @type {?} */
    ElUploadList.prototype.remove;
    /** @type {?} */
    ElUploadList.prototype.preview;
}
//# sourceMappingURL=upload.list.js.map