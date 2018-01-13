import { Component, ContentChild, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { ElUploadProps } from './upload.props';
import { ElUploadRequest } from './upload.request';
export class ElUpload extends ElUploadProps {
    /**
     * @param {?} request
     * @param {?} sanitizer
     */
    constructor(request, sanitizer) {
        super();
        this.request = request;
        this.sanitizer = sanitizer;
        this.files = [];
    }
    /**
     * @return {?}
     */
    static generateID() {
        return Math.random().toString(16).substr(2, 8);
    }
    /**
     * @param {?} response
     * @return {?}
     */
    static updatePercentage(response) {
        const { loaded, total } = response;
        if (loaded === undefined || !total)
            return 0;
        return Math.round(loaded / total * 100);
    }
    /**
     * @return {?}
     */
    clickHandle() {
        if (this.disabled)
            return;
        this.input.nativeElement.click();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeHandle(event) {
        const /** @type {?} */ files = ((event.target)).files;
        if (!files || !files.length)
            return;
        const /** @type {?} */ checkedFiles = this.multiple ? Array.from(files) : [files[0]];
        this.input.nativeElement.value = null;
        checkedFiles.forEach((file) => {
            const /** @type {?} */ next = {
                id: ElUpload.generateID(),
                name: file.name,
                status: 'ready',
                size: file.size,
                percentage: 0,
                raw: file,
                url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
            };
            this.files.push(next);
            this.updateFile(next);
            this.uploadFilter(file) === false ? this.removeHandle(next) : this.upload(next);
        });
    }
    /**
     * @param {?} file
     * @return {?}
     */
    upload(file) {
        file.status = 'uploading';
        this.updateFile(file);
        this.request.upload(this.action, file.raw)
            .subscribe((event) => {
            file.percentage = ElUpload.updatePercentage(event);
            file.percentage && this.lifecycle.progress(file, file.percentage);
            if (event instanceof HttpResponse) {
                this.lifecycle.success(Object.assign(file, { status: 'success' }), event);
            }
            this.updateFile(file);
        }, err => {
            file.status = 'fail';
            this.lifecycle.error(file, err);
            this.removeHandle(file);
        });
    }
    /**
     * @param {?} file
     * @return {?}
     */
    removeHandle(file) {
        this.lifecycle.remove(file);
        const /** @type {?} */ index = this.files.findIndex(({ id }) => file.id === id);
        this.files.splice(index, 1);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    updateFile(file) {
        const /** @type {?} */ index = this.files.findIndex(({ id }) => file.id === id);
        if (!index)
            return;
        this.files[index] = file;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.request
            .setHeader(this.headers)
            .setCredentials(this.withCredentials)
            .setFileName(this.name)
            .addExtraData(this.data);
        this.fileList.forEach((file) => {
            this.files.push({
                id: ElUpload.generateID(),
                name: file.name,
                status: 'success',
                raw: null, size: null,
                url: this.sanitizer.bypassSecurityTrustUrl(file.url),
            });
        });
    }
}
ElUpload.decorators = [
    { type: Component, args: [{
                selector: 'el-upload',
                template: `
    <ng-template #uploadList>
      <el-upload-list [files]="files"  *ngIf="showFileList"
        [list-type]="listType" [disabled]="disabled"
        (remove)="removeHandle($event)" (preview)="lifecycle.preview($event)">
      </el-upload-list>
    </ng-template>
    
    <ng-template #triggerBlock>
      <div [class]="'el-upload el-upload--' + listType" (click)="clickHandle()">
        <el-button *ngIf="!trigger" size="small" type="primary">点击上传</el-button>
        <ng-container *ngIf="trigger">
          <ng-template [ngTemplateOutlet]="trigger"></ng-template>
        </ng-container>
        <input class="el-upload__input" type="file" name="file" #input
          [accept]="accept" [name]="name" [multiple]="multiple"
          (change)="changeHandle($event)">
      </div>
    </ng-template>
    
    <el-upload-dragger *ngIf="drag" [disabled]="disabled" (change)="changeHandle($event)">
      <ng-template [ngTemplateOutlet]="triggerBlock"></ng-template>
    </el-upload-dragger>
    
    <ng-container *ngIf="listType === 'picture-card'">
      <ng-template [ngTemplateOutlet]="uploadList"></ng-template>
    </ng-container>
    <ng-container *ngIf="!drag">
      <ng-template [ngTemplateOutlet]="triggerBlock"></ng-template>
    </ng-container>
    
    <ng-container *ngIf="tip">
      <ng-template [ngTemplateOutlet]="tip"></ng-template>
    </ng-container>
    <ng-container *ngIf="listType !== 'picture-card'">
      <ng-template [ngTemplateOutlet]="uploadList"></ng-template>
    </ng-container>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElUpload.ctorParameters = () => [
    { type: ElUploadRequest, },
    { type: DomSanitizer, },
];
ElUpload.propDecorators = {
    'trigger': [{ type: ContentChild, args: ['trigger',] },],
    'dragger': [{ type: ContentChild, args: ['dragger',] },],
    'tip': [{ type: ContentChild, args: ['tip',] },],
    'input': [{ type: ViewChild, args: ['input',] },],
};
function ElUpload_tsickle_Closure_declarations() {
    /** @type {?} */
    ElUpload.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElUpload.ctorParameters;
    /** @type {?} */
    ElUpload.propDecorators;
    /** @type {?} */
    ElUpload.prototype.trigger;
    /** @type {?} */
    ElUpload.prototype.dragger;
    /** @type {?} */
    ElUpload.prototype.tip;
    /** @type {?} */
    ElUpload.prototype.input;
    /** @type {?} */
    ElUpload.prototype.files;
    /** @type {?} */
    ElUpload.prototype.request;
    /** @type {?} */
    ElUpload.prototype.sanitizer;
}
//# sourceMappingURL=upload.js.map