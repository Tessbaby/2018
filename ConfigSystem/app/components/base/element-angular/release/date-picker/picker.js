import { Component, forwardRef, Renderer2 } from '@angular/core';
import { ElDatePickerProps } from './picker-props';
import { DateFormat } from './utils/format';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export class ElDataPicker extends ElDatePickerProps {
    /**
     * @param {?} dateFormat
     * @param {?} renderer
     */
    constructor(dateFormat, renderer) {
        super();
        this.dateFormat = dateFormat;
        this.renderer = renderer;
        this.showPanelPicker = false;
        this.iconShowClose = false;
        this.controlChange = () => { };
        this.controlTouch = () => { };
    }
    /**
     * @param {?} t
     * @return {?}
     */
    iconMouseActionHandle(t) {
        if (!this.clearable)
            return;
        this.iconShowClose = this.model && t;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    iconClickHandle(e) {
        this.iconClick.emit(e);
        if (this.disabled)
            return;
        // use close action
        if (this.iconShowClose) {
            this.clearClick.emit(e);
            this.model = null;
            this.value = Date.now();
            this.showPanelPicker = false;
            this.iconShowClose = false;
            return;
        }
        // toggle action
        this.showPanelPicker = !this.showPanelPicker;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    propagationHandle(event) {
        event.stopPropagation();
    }
    /**
     * @param {?} input
     * @return {?}
     */
    changeHandle(input) {
        const /** @type {?} */ time = this.dateFormat.getTime(input);
        // if (!time) return
        this.value = time;
    }
    /**
     * @return {?}
     */
    tryUpdateText() {
        if (!this.value) {
            this.model = null;
            this.modelChange.emit(null);
            this.controlChange(null);
            this.showPanelPicker = false;
            return;
        }
        const /** @type {?} */ modelTime = new Date(this.model).getTime();
        const /** @type {?} */ time = this.dateFormat.getTime(this.value);
        this.dateChangeHandle(time ? this.value : modelTime);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    dateChangeHandle(time) {
        this.model = DateFormat.moment(time, this.format);
        this.value = new Date(this.model).getTime();
        this.modelChange.emit(this.model);
        this.controlChange(this.model);
        this.showPanelPicker = false;
    }
    /**
     * @return {?}
     */
    focusHandle() {
        this.showPanelPicker = true;
        this.globalKeydownListener && this.globalKeydownListener();
        this.globalKeydownListener = this.renderer.listen('document', 'keydown', (event) => {
            if (event.keyCode === 9 || event.keyCode === 27) {
                this.showPanelPicker = false;
                this.globalKeydownListener && this.globalKeydownListener();
            }
            if (event.keyCode === 13) {
                this.tryUpdateText();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.globalClickListener = this.renderer.listen('document', 'click', () => {
            if (!this.showPanelPicker)
                return;
            this.showPanelPicker = false;
            this.changeOnBlur && this.tryUpdateText();
        });
        // init value
        const /** @type {?} */ time = this.dateFormat.getTime(this.model);
        if (!time)
            return;
        this.model = DateFormat.moment(time, this.format);
        this.value = time;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.globalClickListener && this.globalClickListener();
        this.globalKeydownListener && this.globalKeydownListener();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.model = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.controlChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.controlTouch = fn;
    }
}
ElDataPicker.decorators = [
    { type: Component, args: [{
                selector: 'el-date-picker',
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ElDataPicker),
                        multi: true
                    }, DateFormat],
                template: `
    <div (click)="propagationHandle($event)">
      <el-input [class]="'el-date-editor ' + 'el-date-editor--' + type"
        [readonly]="!editable || readonly"
        [disabled]="disabled"
        [size]="size" [placeholder]="placeholder"
        [icon]="iconShowClose ? 'close' : 'date'"
        [model]="model"
        (icon-click)="iconClickHandle($event)"
        (modelChange)="changeHandle($event)"
        (icon-mouseenter)="iconMouseActionHandle(true)"
        (icon-mouseleave)="iconMouseActionHandle(false)"
        (focus)="focusHandle()">
      </el-input>
      <el-data-picker-panel [show]="showPanelPicker"  [hidden-day]="hiddenDay"
        [panel-absolute]="panelAbsolute" [panel-index]="panelIndex" [width]="panelWidth"
        [model]="value" (modelChange)="dateChangeHandle($event)">
      </el-data-picker-panel>
    </div>
  `,
            },] },
];
/**
 * @nocollapse
 */
ElDataPicker.ctorParameters = () => [
    { type: DateFormat, },
    { type: Renderer2, },
];
function ElDataPicker_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDataPicker.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDataPicker.ctorParameters;
    /** @type {?} */
    ElDataPicker.prototype.showPanelPicker;
    /** @type {?} */
    ElDataPicker.prototype.value;
    /** @type {?} */
    ElDataPicker.prototype.globalClickListener;
    /** @type {?} */
    ElDataPicker.prototype.globalKeydownListener;
    /** @type {?} */
    ElDataPicker.prototype.iconShowClose;
    /** @type {?} */
    ElDataPicker.prototype.controlChange;
    /** @type {?} */
    ElDataPicker.prototype.controlTouch;
    /** @type {?} */
    ElDataPicker.prototype.dateFormat;
    /** @type {?} */
    ElDataPicker.prototype.renderer;
}
//# sourceMappingURL=picker.js.map