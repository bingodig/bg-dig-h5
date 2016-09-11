var DigH5 = {
    Form: {
        EnhancedTextarea : require("./components/enhanced-textarea.jsx"),
        TextField : require("./components/text-field.jsx"),
        EnhancedSwitch: require("./components/enhanced-switch.jsx"),
        Toggle: require("./components/toggle.jsx"),
        Checkbox: require("./components/checkbox.jsx"),
        RadioButton: require("./components/radio-button.jsx"),
        RadioButtonGroup: require("./components/radio-button-group.jsx"),
        Input: require("./components/input.jsx"),
        Slider: require("./components/slider.jsx"),
        TabSelector: require("./components/tab-selector.jsx")
    },
    Shape: {
        RippleCircle: require("./components/ripples/circle.jsx"),
        FocusRipple: require("./components/ripples/focus-ripple.jsx"),
        TouchRipple: require("./components/ripples/touch-ripple.jsx")
    },
    Container: {
        AppCanvas: require("./components/app-canvas.jsx"),
        Paper: require("./components/paper.jsx"),
        DropDownContainer: require("./components/drop-down-container.jsx"),
        Tab: require("./components/tabs/tab.jsx"),
        Tabs: require("./components/tabs/tabs.jsx"),
        Dialog: require("./components/dialog.jsx"),
        DialogWindow: require("./components/dialog-window.jsx"),
        MediaQuery:require("./components/media-query/media-query.jsx"),
        SilverlightHost: require("./components/silverlight-host.jsx"),
        AutoResponsive: require("./components/auto-responsive.jsx"),
        Panel: require("./components/panel.jsx"),
        Carousel: require("./components/carousel.jsx"),
        Pagination: require("./components/pagination.jsx"),
    },
    Layout: {
        Row: require("./components/layout/row.jsx"),
        Col: require("./components/layout/col.jsx")
    },
    Icon: {
        FontIcon: require("./components/font-icon.jsx"),
        DropDownIcon: require("./components/drop-down-icon.jsx"),
        SvgIcon: require("./components/svg-icons/svg-icon.jsx"),
        SvgIcons: {
            ActionGrade: require("./components/svg-icons/action-grade.jsx"),
            ActionHome: require("./components/svg-icons/action-home.jsx"),
            DropDownArrow: require("./components/svg-icons/drop-down-arrow.jsx"),
            NavigationChevronLeft: require("./components/svg-icons/navigation-chevron-left.jsx"),
            NavigationChevronRight: require("./components/svg-icons/navigation-chevron-right.jsx"),
            NavigationMenu: require("./components/svg-icons/navigation-menu.jsx"),
            ToggleCheckBoxChecked: require("./components/svg-icons/toggle-check-box-checked.jsx"),
            ToggleCheckBoxOutlineBlank: require("./components/svg-icons/toggle-check-box-outline-blank.jsx"),
            ToggleRadioButtonOff: require("./components/svg-icons/toggle-radio-button-off.jsx"),
            ToggleRadioButtonOn: require("./components/svg-icons/toggle-radio-button-on.jsx")
        }
    },
    Menu: {
        SubheaderMenuItem: require("./components/menu/subheader-menu-item.jsx"),
        LinkMenuItem: require("./components/menu/link-menu-item.jsx"),
        MenuItem: require("./components/menu/menu-item.jsx"),
        Menu: require("./components/menu/menu.jsx"),
        DropDownMenu: require("./components/drop-down-menu.jsx")
    },
    List: {
        ListItem: require("./components/list/list-item.jsx"),
        List: require("./components/list/list.jsx")
    },
    Nav: {
        LeftNav: require("./components/left-nav.jsx"),
        AppBar: require("./components/app-bar.jsx"),
        AppBarUser: require("./components/app-bar-user.jsx"),
        Toolbar: require("./components/toolbar.jsx"),
        ToolbarGroup: require("./components/toolbar-group.jsx"),
        Steps: require("./components/steps.jsx"),
        Timeline: require("./components/timeline.jsx"),
        Menu: require("./components/menu.jsx"),
        Breadcrumb: require("./components/breadcrumb/breadcrumb.jsx"),
        ScrollToElement: require("./components/scroll-to-element.jsx")
    },
    Button: {
        EnhancedButton: require("./components/enhanced-button.jsx"),
        FlatButton: require("./components/flat-button.jsx"),
        RaisedButton: require("./components/raised-button.jsx"),
        FloatingActionButton: require("./components/floating-action-button.jsx"),
        IconButton: require("./components/icon-button.jsx"),
        DropDownButton: require("./components/drop-down-button.jsx")
    },
    Animation: {
        Animate: require("./components/animate.jsx"),
        QueueAnim: require("./components/queue-anim.jsx"),
        SlideInTransitionGroup: require("./components/transition-groups/slide-in.jsx")
    },
    Other: {
        Overlay: require("./components/overlay.jsx"),
        Tooltip: require("./components/tooltip/tooltip.jsx"),
        Popover: require("./components/tooltip/popover.jsx"),
        Popconfirm: require("./components/tooltip/popconfirm.jsx"),
        InkBar: require("./components/ink-bar.jsx"),
        Snackbar: require("./components/snackbar.jsx"),
        HomeFeature: require("./components/home-feature.jsx"),
        Spin: require("./components/spin.jsx"),
        Progress: require("./components/progress.jsx"),
        Upload: require("./components/upload/upload.jsx"),
        Message: require("./components/message.jsx"),
        Affix: require("./components/affix.jsx")
    },
	Calendar: {
		DayButton: require("./components/date-picker/day-button.jsx"),
		MonthButton: require("./components/date-picker/month-button.jsx"),
		YearButton: require("./components/date-picker/year-button.jsx"),
		Calendar: require("./components/date-picker/calendar.jsx"),
		CalendarOnlyMonth: require("./components/date-picker/calendar-only-month.jsx"),
		CalendarOnlyYear: require("./components/date-picker/calendar-only-year.jsx"),
		CalendarDay: require("./components/date-picker/calendar-day.jsx"),
		CalendarMonth: require("./components/date-picker/calendar-month.jsx"),
		CalendarYear: require("./components/date-picker/calendar-year.jsx"),
		CalendarToolbar: require("./components/date-picker/calendar-toolbar.jsx"),
        DateToolbar: require("./components/date-picker/date-toolbar.jsx"),
		DateDisplay: require("./components/date-picker/date-display.jsx"),
		MonthDisplay: require("./components/date-picker/month-display.jsx"),
		YearDisplay: require("./components/date-picker/year-display.jsx"),
		DatePicker: require("./components/date-picker/date-picker.jsx"),
		DatePickerDialog: require("./components/date-picker/date-picker-dialog.jsx"),
	},
	Table: {
		Table: require("./components/table/reactable.jsx").Table,
		Thead: require("./components/table/reactable.jsx").Thead,
		Tr: require("./components/table/reactable.jsx").Tr,
		Th: require("./components/table/reactable.jsx").Th,
		Td: require("./components/table/reactable.jsx").Td,
		unsafe: require("./components/table/reactable.jsx").unsafe
	},
	Utils: {
		Convert: require("./utils/convert.js"),
		CssEvent: require("./utils/css-event.js"),
		DateTime: require("./utils/date-time.js"),
		DMS: require("./utils/dms.js"),
		DOM: require("./utils/dom.js"),
		Events: require("./utils/events.js"),
		KeyCode: require("./utils/key-code.js"),
		KeyLine: require("./utils/key-line.js"),
		UniqueId: require("./utils/unique-id.js"),
		WebContext: require("./utils/web-context.js"),
		Format: require("./utils/format.js"),
		DigConfig: require("./utils/dig-config.js"),
		Permission: require("./utils/permission.js")
	},
	Mixins: {
		Classable: require("./mixins/classable.js"),
		ClickAwayable: require("./mixins/click-awayable.js"),
		WindowListenable: require("./mixins/window-listenable.js")
	},
	Charts: {
	    Map: {
	        China: require("./components/chart/map/china"),
	        GuangDong: require("./components/chart/map/guangdong"),
	        GuiZhou: require("./components/chart/map/guizhou"),
	        JiangXi: require("./components/chart/map/jiangxi"),
	        SiChuan: require("./components/chart/map/sichuan"),
        },
        MapGeo:{
            GuangDong: require("./components/chart/map/guangdong_geo")
        },
		Chart: require("./components/chart/chart.jsx"),
        Echarts: require("./components/chart/echarts/echarts.jsx")
	},
    Permission: {
        PermissionValidate: require("./components/permission/permission-validate.jsx")
    },
    Visualization: {
        MarkdownFile: require('./components/visualization/markdown-file.jsx'),
        PanelBox: require('./components/visualization/panel-box.jsx')
    }
};

module.exports = DigH5;