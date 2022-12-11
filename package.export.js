/**
 * @description: 需要导出的模块
 * @param {*}
 * @return {*}
 */
const packages = {
  exposes: {
    './ant-design-vue': './src/components/ant-design-vue.js',
    /**
     * @description: 路由相关的布局
     * TabsView： 多标签页布局
     * BlankView： 空页面路由
     * WebView： iframe嵌入路径中带有 target 参数的url
     * EmptyPage: 待开发的界面
     */
    './TabsView': './src/layouts/tabs/HccwpTabsView',
    './PageView': './src/layouts/PageView.vue',
    './BlankView': './src/layouts/BlankView.vue',
    './WebView': './src/layouts/WebView',
    './EmptyPage': './src/pages/EmptyPage',
    './Layouts': './src/layouts/index.js',
    /**
     * @description: 异常界面
     * Page403: 403界面
     * Page404: 404界面
     * Page405: 405界面
     */
    './Page403': './src/pages/exception/403',
    './Page404': './src/pages/exception/404',
    './Page500': './src/pages/exception/500',
    /**
     * @description: 页面布局，目前各个系统中没有用到
     */
    './CommonLayout': './src/layouts/CommonLayout.vue',
    './PageLayout': './src/layouts/PageLayout.vue',
    './AdminLayout': './src/layouts/AdminLayout.vue',
    // 页面带页头的布局
    './HccwpPageView': './src/layouts/HccwpPageView',
    /**
     * @description: 以下是组件
     */

    './StandardTable': './src/components/table/StandardTable',
    //可拖拽的表格
    './DraggableTable': './src/components/table/DraggableTable',
    './RecordState': './src/components/recordState/index.vue',
    //协同平台
    './ApprovalForm': './src/components/approvalForm',
    './ApprovalProcess': './src/components/approvalProcess',
    './TextLoading': './src/components/textLoading',
    './DetailFooter': './src/components/detailFooter',
    './Descriptions': './src/components/descriptions',
    './DescriptionItem':
      './src/components/descriptions/src/DescriptionItem.vue',
    './HccwpTable': './src/components/hccwpTable',
    // 高级表格
    './HAdvanceTable': './src/components/hccwpTable/AdvanceTable',
    // 详情页面的小标题
    './SectionTitle': './src/components/sectionTitle',
    './HSectionTitle': './src/components/sectionTitle/HSectionTitle',
    './HText': './src/components/hText',
    // 按钮的二次确认弹窗
    './PopConfirm': './src/components/popConfirm',
    // select 选择器，目前包含了 StaffSelect
    './Select': './src/components/select',
    // Card 布局，目前包含了 BaseCard
    './Card': './src/components/card',
    // 一般用于table 的 搜索查询工具条，涵盖了重置和查询逻辑
    './FilterComponent': './src/components/filterComponent',
    //公司论坛
    './BBSHomePage': './src/components/bbsHomePage',
    './HomeLayout': './src/components/bbsHomePage/HomeLayout.vue',
    './LayoutComponents': './src/components/bbsHomePage/layoutComponents',
    // 版本号输入框
    './VersionInput': './src/components/input/src/VersionInput',
    './HApprovalLayout': './src/components/HApprovalLayout',
    './HButton': './src/components/HButton',
    './HChangeList': './src/components/HChangeList',
    './HCollapseBtn': './src/components/HCollapseBtn',
    './HEmpty': './src/components/HEmpty.vue',
    './HFilePreview': './src/components/FilePreview',
    './HFileUpload': './src/components/FileUpload',
    './HFileUploadWidthModel': './src/components/FileUpload/WidthModel.vue',
    './HFileUploadWidthMultiple':
      './src/components/FileUpload/WidthMultiple.vue',
    './HHtmlPrint': './src/components/HHtmlPrint',
    './HIconWrap': './src/components/hIconWrap',
    './HImagePreview': './src/components/HImagePreview',
    './HInputNumber': './src/components/HInputNumber',
    './HMonthRangePicker': './src/components/HMonthRangePicker',
    './HPageViewTitle': './src/components/HPageViewTitle.vue',
    './HSectionAnchor': './src/components/HSectionAnchor',
    './HSelect': './src/components/HSelect',
    './HSignModal': './src/components/HSignModal',
    './HStaffName': './src/components/HStaffName.vue',
    './HTaskNode': './src/components/HTaskNode',
    './HYearPicker': './src/components/HYearPicker',
    './HTextTooltip': './src/components/textTooltip',
    './HTextarea': './src/components/HTextarea',
    /**
     * @description 以下是方法
     */
    // 工具类方法
    './utils': './src/utils/index.js',
    // 请求实体，axios封装
    // axios封装
    './request': './src/utils/request.js',
    './hooks': './src/hooks',
    /**
     * @description 协同平台登录鉴权以及请求封装等流程处理
     */
    './bootstrap': './src/bootstrap.js',
    './mixin': './src/utils/mixin',
    // 包含 svg icon
    './plugins': './src/plugins',
    './svg-icon': './src/plugins/svg-icon-plugin',
    './style': './src/theme/index.js'
  }
}

module.exports = packages
