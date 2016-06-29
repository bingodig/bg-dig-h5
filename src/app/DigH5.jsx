var DigH5 = {
    Form: {
        EnhancedTextarea : require("./enhanced-textarea/enhanced-textarea.jsx"),
        TextField : require("./text-field/text-field.jsx"),
        EnhancedSwitch: require("./enhanced-switch/enhanced-switch.jsx"),
        Toggle: require("./toggle/toggle.jsx"),
        Checkbox: require("./checkbox/checkbox.jsx"),
        RadioButton: require("./radio-button/radio-button.jsx"),
        RadioButtonGroup: require("./radio-button-group/radio-button-group.jsx"),
        Input: require("./input/input.jsx"),
        Slider: require("./slider/slider.jsx"),
        TabSelector: require("./tab-selector/tab-selector.jsx")
    },
    Shape: {
        RippleCircle: require("./ripples/circle.jsx"),
        FocusRipple: require("./ripples/focus-ripple.jsx"),
        TouchRipple: require("./ripples/touch-ripple.jsx")
    },
    Container: {
        AppCanvas        		: require("./app-canvas/app-canvas.jsx"),                //找不到style                                                     
        Paper            		: require("./paper/paper.jsx"),                     // ^_^                                                                                                          
        DropDownContainer		: require("./drop-down-container/drop-down-container.jsx"),       //没有style？ 
        Tab              		: require("./tabs/tab.jsx"),                                                                               
        Tabs             		: require("./tabs/tabs.jsx"),                                                                        
        Dialog           		: require("./dialog/dialog.jsx"),                                                                         
        DialogWindow     		: require("./dialog-window/dialog-window.jsx"),                            
        MediaQuery       		: require("./media-query/media-query.jsx"),          
        SilverlightHost  		: require("./silverlight-host/silverlight-host.jsx"),       
        AutoResponsive   		: require("./auto-responsive/auto-responsive.jsx"),           //没有style？
        Panel            		: require("./panel/panel.jsx"),                     // ^_^                                                                                                       
        Carousel         		: require("./carousel/carousel.jsx"),                                                                                
        Pagination       		: require("./pagination/pagination.jsx"),                // ^_^                                                                      
    },
    Layout: {                                                                 
       Row: require("./layout/row.jsx"),                                  // ^_^    
       Col: require("./layout/col.jsx")                                   // ^_^   
    },
    Icon: {
       FontIcon: require("./font-icon/font-icon.jsx"),                                  // ^_^   
       DropDownIcon: require("./drop-down-icon/drop-down-icon.jsx"),                
       SvgIcon: require("./svg-icons/svg-icon.jsx"),
       SvgIcons: {
           ActionGrade: require("./svg-icons/action-grade.jsx"),
           ActionHome: require("./svg-icons/action-home.jsx"),
           DropDownArrow: require("./svg-icons/drop-down-arrow.jsx"),
           NavigationChevronLeft: require("./svg-icons/navigation-chevron-left.jsx"),
           NavigationChevronRight: require("./svg-icons/navigation-chevron-right.jsx"),
           NavigationMenu: require("./svg-icons/navigation-menu.jsx"),
           ToggleCheckBoxChecked: require("./svg-icons/toggle-check-box-checked.jsx"),
           ToggleCheckBoxOutlineBlank: require("./svg-icons/toggle-check-box-outline-blank.jsx"),
           ToggleRadioButtonOff: require("./svg-icons/toggle-radio-button-off.jsx"),
           ToggleRadioButtonOn: require("./svg-icons/toggle-radio-button-on.jsx")
       }
    },
    Menu: {
       SubheaderMenuItem: require("./menu/subheader-menu-item.jsx"),
       LinkMenuItem: require("./menu/link-menu-item.jsx"),
       MenuItem: require("./menu/menu-item.jsx"),
       Menu: require("./menu/menu.jsx"),
       DropDownMenu: require("./drop-down-menu/drop-down-menu.jsx")
    },
    List: {
       ListItem: require("./list/list-item.jsx"),
       List: require("./list/list.jsx")
    },
    Nav: {
       LeftNav: require("./left-nav/left-nav.jsx"),
       AppBar: require("./app-bar/app-bar.jsx"),
       AppBarUser: require("./app-bar-user/app-bar-user.jsx"),
       Toolbar: require("./toolbar/toolbar.jsx"),
       ToolbarGroup: require("./toolbar-group/toolbar-group.jsx"),
       Steps: require("./steps/steps.jsx"),
       Timeline: require("./timeline/timeline.jsx"),
       Menu: require("./nav-menu/nav-menu.jsx"),
       Breadcrumb: require("./breadcrumb/breadcrumb.jsx"),
       ScrollToElement: require("./scroll-to-element/scroll-to-element.jsx")
    },
    Button: {
       EnhancedButton: require("./enhanced-button/enhanced-button.jsx"),
       FlatButton: require("./flat-button/flat-button.jsx"),
       RaisedButton: require("./raised-button/raised-button.jsx"),
       FloatingActionButton: require("./floating-action-button/floating-action-button.jsx"),
       IconButton: require("./icon-button/icon-button.jsx"),                                    //tooltip的重复问题
       DropDownButton: require("./drop-down-button/drop-down-button.jsx")                          //与drop-down-container联系
    },
    Animation: {
       Animate: require("./animate/animate.jsx"),                                           //没有style？
       QueueAnim: require("./queue-anim/queue-anim.jsx"),
       SlideInTransitionGroup: require("./transition-groups/slide-in.jsx")
    },
    Other: {
       Overlay: require("./overlay/overlay.jsx"),
       Tooltip: require("./tooltip/tooltip.jsx"),
       Popover: require("./tooltip/popover.jsx"),
       Popconfirm: require("./tooltip/popconfirm.jsx"),
       InkBar: require("./ink-bar/ink-bar.jsx"),
       Snackbar: require("./snackbar/snackbar.jsx"),
       HomeFeature: require("./home-feature/home-feature.jsx"),
       Spin: require("./spin/spin.jsx"),
       Progress: require("./progress/progress.jsx"),
       Upload: require("./upload/upload.jsx"),
       Message: require("./message/message.jsx"),
       Affix: require("./affix/affix.jsx")
    },
	Calendar: {
		DayButton: require("./date-picker/day-button.jsx"),
		MonthButton: require("./date-picker/month-button.jsx"),
		YearButton: require("./date-picker/year-button.jsx"),
		Calendar: require("./date-picker/calendar.jsx"),
		CalendarOnlyMonth: require("./date-picker/calendar-only-month.jsx"),
		CalendarOnlyYear: require("./date-picker/calendar-only-year.jsx"),
		CalendarDay: require("./date-picker/calendar-day.jsx"),
		CalendarMonth: require("./date-picker/calendar-month.jsx"),
		CalendarYear: require("./date-picker/calendar-year.jsx"),
		CalendarToolbar: require("./date-picker/calendar-toolbar.jsx"),
      DateToolbar: require("./date-picker/date-toolbar.jsx"),
		DateDisplay: require("./date-picker/date-display.jsx"),
		MonthDisplay: require("./date-picker/month-display.jsx"),
		YearDisplay: require("./date-picker/year-display.jsx"),
		DatePicker: require("./date-picker/date-picker.jsx"),
		DatePickerDialog: require("./date-picker/date-picker-dialog.jsx"),
	},
	Table: {
		Table: require("./table/reactable.jsx").Table,
		Thead: require("./table/reactable.jsx").Thead,
		Tr: require("./table/reactable.jsx").Tr,
		Th: require("./table/reactable.jsx").Th,
		Td: require("./table/reactable.jsx").Td,
		unsafe: require("./table/reactable.jsx").unsafe
	},
	Utils: {
		Convert: require("../utils/convert.js"),
		CssEvent: require("../utils/css-event.js"),
		DateTime: require("../utils/date-time.js"),
		DMS: require("../utils/dms.js"),
		DOM: require("../utils/dom.js"),
		Events: require("../utils/events.js"),
		KeyCode: require("../utils/key-code.js"),
		KeyLine: require("../utils/key-line.js"),
		UniqueId: require("../utils/unique-id.js"),
		WebContext: require("../utils/web-context.js"),
		Format: require("../utils/format.js"),
		DigConfig: require("../utils/dig-config.js"),
		Permission: require("../utils/permission.js")
	},
	Mixins: {
		Classable: require("../mixins/classable.js"),
		ClickAwayable: require("../mixins/click-awayable.js"),
		WindowListenable: require("../mixins/window-listenable.js")
	},
	Charts: {
	   Map: {
	       China: require("./chart/map/china"),
	       GuangDong: require("./chart/map/guangdong"),
	       GuiZhou: require("./chart/map/guizhou"),
	       JiangXi: require("./chart/map/jiangxi"),
	       SiChuan: require("./chart/map/sichuan"),
       },
       MapGeo:{
           GuangDong: require("./chart/map/guangdong_geo")
       },
		Chart: require("./chart/chart.jsx")
	},
    Permission: {
       PermissionValidate: require("./permission/permission-validate.jsx")
    },
    Visualization: {
       MarkdownFile: require('./visualization/markdown-file.jsx'),
       PanelBox: require('./visualization/panel-box.jsx')
    }
};

module.exports = DigH5;