# 📋 更新历史 


### [0.6.11](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.10...v0.6.11) (2022-11-17)


### 🐛 Bug Fixes | Bug 修复

* **components:** 恢复原来的staffSelect，添加一个StaffSelectVirtual 72a5867
* **components:** staffselect efd8a1b

### [0.6.10](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.9...v0.6.10) (2022-11-14)


### 🐛 Bug Fixes | Bug 修复

* **config:** fix version value ca9cd5e

### [0.6.9](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.8...v0.6.9) (2022-11-14)


### 🐛 Bug Fixes | Bug 修复

* **components:** 菜单删除决策视窗 68f7e41
* **components:** HSectionAnchor 修改scrollView 获取的时机 ff4360a
* **components:** Safari 不支持 (?<=exp) 这种断言，正则修改 f32054e
* **doc:** 修复doc 组件名称错误的问题 69a2bd6


### ♻ Code Refactoring | 代码重构

* **styles:** change import order a797926


### ✨ Features | 新功能

* **config:** add sort and version file bda4ef7

### [0.6.8](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.7...v0.6.8) (2022-11-11)


### 🐛 Bug Fixes | Bug 修复

* **styles:** 全局样式修改 66424f7


### ⏪ Reverts | 回退

* **styles:** a标签颜色回滚 54bc403


### ✨ Features | 新功能

* **components:** approval添加change事件 d0e2381

### [0.6.7](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.6...v0.6.7) (2022-11-09)


### ✨ Features | 新功能

* **components:** descriptions 添加line分组 adb87c4


### 🐛 Bug Fixes | Bug 修复

* **components:** 修复BaseVirtualSelect的onChange 的问题 17a460c
* **components:** 修改组件的name e9153ca
* **styles:** 修复image-preview 影响别的样式 70b6b41

### [0.6.6](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.5...v0.6.6) (2022-11-08)


### 🐛 Bug Fixes | Bug 修复

* **components:** staffSelect 修复result回显问题 6bf1843


### 🔧 Continuous Integration | CI 配置

* **config:** release 添加git pull命名 99b49df

### [0.6.5](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.4...v0.6.5) (2022-11-07)


### 🐛 Bug Fixes | Bug 修复

* **components:** advancetabnle fixed 5af48cc

### [0.6.4](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.3...v0.6.4) (2022-11-04)


### ✨ Features | 新功能

* **components:** 添加组件和hooks 5f0a80f


### 🐛 Bug Fixes | Bug 修复

* **config:** 修复expose 导出错误 3f4b6c7


### ♻ Code Refactoring | 代码重构

* **other:** 代码优化 1efc15d


### 👷‍ Build System | 构建

* **config:** 添加了一些测试依赖 67b189d

### [0.6.3](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.2...v0.6.3) (2022-10-27)


### 🔧 Continuous Integration | CI 配置

* **other (其他修改):** cz-config remove desc d660e44
* **other:** cz-config remove desc af07f1c
* **release-it:** ignoreRecommendedBump b8b28d5


### ♻ Code Refactoring | 代码重构

* **components:** approval-node-line 样式优化 53972ed
* **deps :** 依赖调整，删除多余依赖 c060dee
* **other:** 代码优化， 07dc14c


### 🐛 Bug Fixes | Bug 修复

* **components:** advance-table 多选框问题修复 707ad83
* **styles (样式相关):** SvgIcon 修改默认颜色为var(--icon-color,[#000](undefined/undefined/undefined/issues/000)) fd8a8ce


### ✨ Features | 新功能

* **components (组件相关):** 添加SvgIcon单独导出 08456f8
* **components:** 添加Html2Pdf组件 f10374c
* **components:** select 虚拟列表 细节优化 bccdba8
* **hooks:** 添加useVModel ，方便生成 v-model组件 e0f6270

### [0.6.2](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.1...v0.6.2) (2022-10-21)


### 🐛 Bug Fixes | Bug 修复

* **antd  (对 antd 主题的调整):** btn-danger添加active颜色 eba59e9
* **styles (样式相关):** 修改sticky 下  pagination 的padding 14954d2

### [0.6.1](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v0.6.0...v0.6.1) (2022-10-20)


### 🐛 Bug Fixes | Bug 修复

* **advance-table :** 修复sticky table 的样式对其他table 的影响 c610c0f
* **utils (utils 相关):** download 在新窗口 483ffd4


### 📝 Documentation | 文档

* **a-button:** 修复button hover 的颜色不正确 56fd763

## [0.6.0](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v1.1.0...v0.6.0) (2022-10-18)


### ⏪ Reverts | 回退

* **other (其他修改):** 回退配置修改 297a6cb
* **other (其他修改):** 配置修改回滚 6ff2096


### 👷‍ Build System | 构建

* **other (其他修改):** 模块联邦 requiredVersion 修改 47efb40
* **other (其他修改):** 配置修改 c6a5df6
* **other (其他修改):** 修改环境配置 5226460
* **other (其他修改):** 修改配置，使得开发环境构建开发包 1e7a9b2
* **other (其他修改):** 修改vue全局配置 2a5e77b
* **other (其他修改):** config shred修改 d6fabaa
* **other (其他修改):** fix conifg 3992150
* **other (其他修改):** remove log f7a5d29
* **other (其他修改):** shared vue-demi vue-ecahrts ecahrts 594871f


### 📝 Documentation | 文档

* **other (其他修改):** 高级表格文档修改 7882c2a


### ✨ Features | 新功能

* **components (组件相关):** 审批表单添加hasReject props 7f9983c
* **components (组件相关):** 添加 transformParams 对于高级表格 5c935a5
* **components (组件相关):** 添加鸿程logo svg 224860c
* **components (组件相关):** advance table 添加 sticky 特性 d8a8b94
* **components (组件相关):** descriptions item添加vertical属性 3254e22
* **components (组件相关):** select 添加虚拟列表功能 d4b3268
* **styles (样式相关):** 添加pageview 的背景 1b23cbc
* **styles (样式相关):** 样式补丁 6c99085


### 📦 Chores | 其他更新

* **other (其他修改):** 环境变量配置修改 c346c76
* **other (其他修改):** 配置修改 39ca556
* **other (其他修改):** 修改构建配置 bfff8e8
* **other (其他修改):** 杂项 508e748
* **other (其他修改):** 杂项 848aafe


### 🐛 Bug Fixes | Bug 修复

* **components (组件相关):** 高级表格 滚动条位置错位 f5f13c6
* **components (组件相关):** 高级表格优化调整 34b7a59
* **components (组件相关):** 组件修复 443bda1
* **components (组件相关):** filter component 展开收起按钮修改 4c9b34b
* **components (组件相关):** HFilterComponent 修复 col span问题 560bb1d
* **components (组件相关):** sticky-table 的status slot未生效的问题 2a2e758
* **components (组件相关):** VirtualSelect 修复问题 b57f9eb
* **components (组件相关):** VirtualSelect 修改create为symbol 6e177bb
* **other (其他修改):** 保留testlog eb95313
* **other (其他修改):** 恢复log f72e652
* **other (其他修改):** 添加错误抛出 8b79275
* **other (其他修改):** 修复ApprovalForm hasReject错误 5720a89
* **other (其他修改):** 修改配置 8b6b717
* **other (其他修改):** 修改vue全局配置 198c74b
* **other (其他修改):** babel 3b4293e
* **styles (样式相关):** 高级表格固定列层级过高 31c6bdd
* **styles (样式相关):** 修复高级表单固定列层级错误问题 f6d108e
* **styles (样式相关):** 修复样式变量丢失问题 37fc47c

### [0.5.1](http://10.80.11.110/framework/zjhcsoft-web-component/compare/v1.1.0...v0.5.1) (2022-09-06)


### 📦 Chores | 其他更新

* **other (其他修改):** 杂项 848aafe

## [0.5.0](http://10.80.11.110/framework/zjhcsoft-web-component/compare/V1.0.0_20220301...0.5.0) (2022-08-12)


### ✨ Features | 新功能

* **antd                           (对 antd 主题的调整):** 圆角调整（变小） e1c411b
* **antd  (对 antd 主题的调整):** 添加主题色变量 93b4263
* **antd  (对 antd 主题的调整):** 修改antd主题色为css变量 2da2daa
* **components                     (组件相关):** 添加进度条组件 785a0b8
* **components                     (组件相关):** 增加高级表格组件 258ba4b
* **components                     (组件相关):** filter组件增加foldSize为0的情况 8ceb6cd
* **components (组件相关):** 高级表格添加select af0c655
* **components (组件相关):** 添加HSectionTile 组件 4f0fd59
* **styles                         (样式相关):** 添加主题色变量 ede6811
* **styles                         (样式相关):** shared style 6b8912e
* **utils (utils 相关):** 审批状态颜色处理 083faa3


### ♻ Code Refactoring | 代码重构

* **components (组件相关):** 组件名称调整 fbbf10d


### 👷‍ Build System | 构建

* **构建:** 添加构建命令 35097b9
* **deps                           (项目依赖):** 修复构建模式问题 52743dd
* **deps  (项目依赖):** 修复依赖的版本 307b468
* **deps:** 添加了commit提交规范 3264ae5
* **other (其他修改):** 配置项修改 d93d9b2
* **other (其他修改):** 添加依赖修改antd less变量 c25eaf4


### 🐛 Bug Fixes | Bug 修复

* **components                     (组件相关):** shared HAdvanceTable 210fb88
* **components (组件相关):** 修复高级表格的部分问题 ffe07f9
* **components (组件相关):** 修复filterslot不存在时会报错的问题 0a08daa
* **components (组件相关):** 修改advance-table 组件入参 f5ad4ba
* **components (组件相关):** HAdvanceTable 修复组件引用丢失 474c26f
* **components (组件相关):** HAdvanceTable 修复组件引用丢失 d2eeaeb
* **components (组件相关):** HAdvanceTable 修复selectRowkeys不存在导致编译错误的问题 aad2d71
* **deps                           (项目依赖):** 修复exoose/HAdvanceTable路径错误问题 aafd298
* **styles                         (样式相关):** 修改shared样式的组合 94d4350
* **styles (样式相关):** 修改调整颜色变量 a69ee8d
* **styles (样式相关):** 颜色样式修改 9c3949d


### 📦 Chores | 其他更新

* **other (其他修改):** 其他调整 5718a4b

## [0.4.0](http://10.80.11.110/framework/zjhcsoft-web-component/compare/V1.0.0_20220301...0.4.0) (2022-08-02)


### 👷‍ Build System | 构建

* **构建:** 添加构建命令 35097b9
* **deps                           (项目依赖):** 修复构建模式问题 52743dd
* **deps:** 添加了commit提交规范 3264ae5


### 🐛 Bug Fixes | Bug 修复

* **styles                         (样式相关):** 修改shared样式的组合 94d4350


### ✨ Features | 新功能

* **antd                           (对 antd 主题的调整):** 圆角调整（变小） e1c411b
* **components                     (组件相关):** 添加进度条组件 785a0b8
* **components                     (组件相关):** 增加高级表格组件 258ba4b
* **components                     (组件相关):** filter组件增加foldSize为0的情况 8ceb6cd
* **styles                         (样式相关):** 添加主题色变量 ede6811
* **styles                         (样式相关):** shared style 6b8912e

# 📋 更新历史

### [0.3.44](http://10.80.11.110/framework/zjhcsoft-web-component/compare/V1.0.0_20220301...0.3.44) (2022-07-26)

### 👷‍ Build System | 构建

* **deps:** 添加了commit提交规范 3264ae5