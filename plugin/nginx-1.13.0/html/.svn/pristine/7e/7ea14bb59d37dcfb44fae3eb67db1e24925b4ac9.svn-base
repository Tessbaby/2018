UE.registerUI('文章列表',function(editor,uiName){
    //debugger;
    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl: 'index.html#/editArticle',
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        //dialog的标题
        title:"文章列表",

        //指定dialog的外围样式
        cssRules:"width:800px;height:450px;",

    });

    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'dialogbutton' + uiName,
        title:' ' + uiName,
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'width: 69px !important;background-image:url(/lib/ueditor/themes/default/images/article.png) ;',
        onclick: function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });

    return btn;
});

