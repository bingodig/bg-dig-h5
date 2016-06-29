
webpack-study
├── docs
├   ├── dist    					//打包目录
├   ├── sass    					//sass文件
├   ├── www     					//模板目录
├   ├    ├── images	
├   ├    └── index.html	
├   └── index.jsx     				//入口文件
├── node_modules					//依赖包
├── src								//组件源文件
├   ├── app 						//组件
├   └── sass 						//样式
├── webpack 						
├   ├── console.msg.js          	//打印信息
├   ├── webpack.loaders.js 			//加载器配置
├   └── webpack.plugins.js 			//插件配置
├── .babelrc	
├── config.js 						//基础信息配置
├── package.json	
└── webpack.config.js   			//webpack配置
	
dist								//打包目录
├── css
├── js
├── font
├── images
└── index.html

//介绍配置文件的相关内容

config.js 							//基础信息配置
├── 基本配置						//比如出入口路径
├── 打包配置						//设置dist里的文件目录
└── 服务器配置						//服务器、端口号
	
webpack.loaders.js   				//加载器配置
└── jsx,sass,images,fonts...		//针对不同类型文件配置不同加载器配置
	
webpack.plugins.js  				//插件配置
├── 开发环境				
├   ├── HotModuleReplacementPlugin 	//热加载
├   ├── NoErrorsPlugin 				//加载器配置
├   └── OpenBrowserPlugin			//自动打开浏览器
├── 生产环境						
├   └── UglifyJsPlugin				//压缩
├── 公有							
├   ├── CopyWebpackPlugin       	//复制模板
├   ├── ExtractTextPlugin       	//分离CSS
└── └── DefinePlugin				//插件配置# bg-dig-h5
