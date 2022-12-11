import PropTypes from '@/utils/vue-types'
const AbstractSelectProps = () => ({
  prefixCls: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large', 'default']),
  showAction: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(String)
  ]),
  notFoundContent: PropTypes.any,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
  showSearch: PropTypes.bool,
  allowClear: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  placeholder: PropTypes.any,
  defaultActiveFirstOption: PropTypes.bool,
  dropdownClassName: PropTypes.string,
  dropdownStyle: PropTypes.any,
  dropdownMenuStyle: PropTypes.any,
  dropdownMatchSelectWidth: PropTypes.bool,
  // onSearch: (value: string) => any,
  filterOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  autoFocus: PropTypes.bool,
  backfill: PropTypes.bool,
  showArrow: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  // open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  autoClearSearchValue: PropTypes.bool,
  dropdownRender: PropTypes.func,
  loading: PropTypes.bool
})

const Value = PropTypes.shape({
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}).loose

const SelectValue = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.arrayOf(
    PropTypes.oneOfType([Value, PropTypes.string, PropTypes.number])
  ),
  Value
])

const SelectProps = {
  ...AbstractSelectProps(),
  value: SelectValue,
  defaultValue: SelectValue,
  // mode: PropTypes.oneOf(['default', 'multiple', 'tags', 'combobox']),
  mode: PropTypes.string,
  optionLabelProp: PropTypes.string,
  firstActiveValue: PropTypes.oneOfType([String, PropTypes.arrayOf(String)]),
  maxTagCount: PropTypes.number,
  maxTagPlaceholder: PropTypes.any,
  maxTagTextLength: PropTypes.number,
  dropdownMatchSelectWidth: PropTypes.bool,
  optionFilterProp: PropTypes.string,
  labelInValue: PropTypes.boolean,
  getPopupContainer: PropTypes.func,
  tokenSeparators: PropTypes.arrayOf(PropTypes.string),
  getInputElement: PropTypes.func,
  options: PropTypes.array,
  suffixIcon: PropTypes.any,
  removeIcon: PropTypes.any,
  clearIcon: PropTypes.any,
  menuItemSelectedIcon: PropTypes.any
}

export default {
  ...SelectProps,
  showSearch: PropTypes.bool.def(false),
  transitionName: PropTypes.string.def('slide-up'),
  choiceTransitionName: PropTypes.string.def('zoom')
}
