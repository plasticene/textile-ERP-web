import HccwpPageView from '../layouts/HccwpPageView.vue'
import ApprovalForm from './approvalForm'
import ApprovalProcess, { ApproveNodeLine } from './approvalProcess'
import { BaseCard, BaseCardInfo } from './card'
import DemoBlock from './demoBlock'
import Descriptions from './descriptions'
import DetailFooter from './detailFooter/index.vue'
import HFilePreview from './FilePreview/index.vue'
import HFileUpload from './FileUpload/index.vue'
import HFileUploadWidthModel from './FileUpload/WidthModel.vue'
import HFileUploadWidthMultiple from './FileUpload/WidthMultiple.vue'
import FilterComponent from './filterComponent'
import HApprovalLayout from './HApprovalLayout/index.vue'
import HButton from './HButton/index.vue'
import HccwpAdvanceTable from './hccwpTable/AdvanceTable.vue'
import HccwpTable from './hccwpTable/index.vue'
import TAdvanceTable from './hccwpTable/TextileAdvanceTable.vue'
import HChangeList from './HChangeList/index.vue'
import HCollapseBtn from './HCollapseBtn/index.jsx'
import HEmpty from './HEmpty.vue'
import HHtmlPrint from './HHtmlPrint/index.vue'
import ImagePreviewPlugin from './HImagePreview/plugin'
import HInputNumber from './HInputNumber/index.vue'
import HSection from './HSection/index.vue'
import HSectionAnchor from './HSectionAnchor/index.vue'
import HSelect from './HSelect/index.vue'
import HSignModal from './HSignModal/index.vue'
import HStaffName from './HStaffName.vue'
import HStickyTable from './HStickyTable/index.vue'
import HTaskNode from './HTaskNode/index.vue'
import HTextarea from './HTextarea/index.vue'
import { InputBankNumber, VersionInput } from './input'
import MdTOC from './mdTOC'
import PopConfirm from './popConfirm/index.vue'
import RecordState from './recordState/index.vue'
import { BaseVirtualSelect, StaffSelect, VirtualSelect } from './select'
import TextLoading from './textLoading'
import HTextTooltip from './textTooltip/index.vue'
import WithCopyBtn from './withCopyBtn'

ApproveNodeLine.name = 'HApproveNodeLine'
const DescriptionItem = Descriptions.Item

const components = {
  Descriptions,
  DescriptionItem,
  DemoBlock,
  TextLoading,
  DetailFooter,
  ApprovalForm,
  ApprovalProcess,
  ApproveNodeLine,
  HccwpTable,
  HccwpAdvanceTable,
  PopConfirm,
  RecordState,
  HccwpPageView,
  BaseCard,
  BaseCardInfo,
  FilterComponent,
  StaffSelect,
  InputBankNumber,
  VersionInput,
  MdTOC,
  VirtualSelect,
  BaseVirtualSelect,
  WithCopyBtn,
  HSection,
  HSectionAnchor,
  HEmpty,
  HApprovalLayout,
  HCollapseBtn,
  HTextTooltip,
  HFileUpload,
  HFilePreview,
  HFileUploadWidthModel,
  HFileUploadWidthMultiple,
  HStickyTable,
  HButton,
  HInputNumber,
  HChangeList,
  HTextarea,
  HSelect,
  HSignModal,
  HStaffName,
  HHtmlPrint,
  HTaskNode,
  TAdvanceTable
}

export {
  ApprovalForm,
  ApprovalProcess,
  ApproveNodeLine,
  BaseCard,
  BaseCardInfo,
  BaseVirtualSelect,
  DemoBlock,
  DescriptionItem,
  Descriptions,
  DetailFooter,
  FilterComponent,
  HApprovalLayout,
  HButton,
  HccwpAdvanceTable,
  HccwpPageView,
  HccwpTable,
  HChangeList,
  HCollapseBtn,
  HEmpty,
  HFilePreview,
  HFileUpload,
  HFileUploadWidthModel,
  HFileUploadWidthMultiple,
  HHtmlPrint,
  HInputNumber,
  HSection,
  HSectionAnchor,
  HSelect,
  HSignModal,
  HStaffName,
  HStickyTable,
  HTaskNode,
  HTextarea,
  HTextTooltip,
  InputBankNumber,
  MdTOC,
  PopConfirm,
  RecordState,
  StaffSelect,
  TAdvanceTable,
  TextLoading,
  VersionInput,
  VirtualSelect,
  WithCopyBtn
}

export default {
  install(Vue) {
    // console.log(vc)
    for (const key in components) {
      let name = key.replace(/(h|H)ccwp/, 'H')
      // if (!isH.test(name)) {
      //   name = `H${name}`
      // }
      Vue.component(name, components[key])
    }

    Vue.use(ImagePreviewPlugin)
  }
}
