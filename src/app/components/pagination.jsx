var React = require('react');
var Classable = require('../mixins/classable');

function noop() {
}

var Pagination = React.createClass({

    mixins: [Classable],

    propTypes: {
        current: React.PropTypes.number,
        total: React.PropTypes.number,
        pageSize: React.PropTypes.number,
        showQuickJumper : React.PropTypes.bool,
        onChange: React.PropTypes.func,
    },
    getDefaultProps : function(){
        return{
            current: 1,
            total: 0,
            pageSize : 10,
            showQuickJumper : false,
            onChange : noop,
        }        
    },

    getInitialState: function(){
        return{
            current: 1,
            changeCurrent : 1,
        }
    },

    componentDidMount: function(){
        var { current } = this.props;
        this.setState({
            current: current,
        });
    },

    onhandleClick: function(page,pageNumber,event){
        this.props.onChange(event,page,pageNumber);
        this.setState({
            current : page
        });
    },

    handleChangeCurrent: function(event){
        var page = event.target.value;
        if(page) page = parseInt(page);

        this.setState({changeCurrent: page});
    },

    handlerKeyUp: function(page,pageNumber,event){
        if(event.keyCode === 13){
            if(!page) return false;
            this.props.onChange(event,page,pageNumber);
            this.setState({current: page});
        }
    },

    _handleClickPrev: function(pageNumber,event){
        var { current } = this.state;
        if (current == 1) return;
        
        this.props.onChange(event,current -1,pageNumber);
        this.setState({current : current - 1});
    },

    _handleClickNext: function(pageNumber,event){
        var { current } = this.state;
        if (current == pageNumber) return;

        this.props.onChange(event,current + 1,pageNumber);
        this.setState({current : current + 1});
    },

	render: function() {
        var { current,changeCurrent } = this.state;
        var { total,pageSize,showQuickJumper } = this.props;
        var html=[];
        var pageNumber  = Math.ceil(total / pageSize);

        for(var i=1;i<=pageNumber;i++){

            var _class = (i == current) ? "disabled act" : "";

            if (i == 1) {

                html.push(<li key={i-1} className={i==current ? "disabled":""} onClick={this._handleClickPrev.bind(this,pageNumber)}><a href="javascript:;" title="上一页">上一页</a></li>);
                html.push(<li key={i} className={_class} onClick={this.onhandleClick.bind(this,i,pageNumber)}><a href="javascript:;">{i}</a></li>);

            }else if (i == pageNumber) {

                html.push(<li key={i} className={_class} onClick={this.onhandleClick.bind(this,i,pageNumber)}><a href="javascript:;">{i}</a></li>);
                html.push(<li key={i+1} className={i==current ? "disabled":""} onClick={this._handleClickNext.bind(this,pageNumber)}><a href="javascript:;" title="下一页">下一页</a></li>);

            }else{

                if ((current > 5 && i == 2) || (pageNumber-current > 4 && i == pageNumber - 1)) {
                    html.push(<li key={i} className="disabled"><a href="javascript:;">…</a></li>);
                }else{
                    if (i == current) {
                        html.push(<li key={i} className={_class}><a href="javascript:;">{i}</a></li>);
                    }else{
                        if ((current - i < 5 && current > i) || (i - current < 5 && current < i)) {
                            html.push(<li key={i} className={_class} onClick={this.onhandleClick.bind(this,i,pageNumber)}><a href="javascript:;">{i}</a></li>);
                        };
                    }
                } 

            }

        }

        return (
            <div className="dig-pagination">
                <ul>
                    {html}
                </ul>
                {
                    !showQuickJumper ? '' :            
                    <div className="options-quick-jumper">
                        跳至<input 
                            type="text" 
                            value={changeCurrent} 
                            onChange={this.handleChangeCurrent} 
                            onKeyUp={this.handlerKeyUp.bind(this,changeCurrent,pageNumber)}/>
                        页
                    </div>
                }

            </div>
        );
	},


});

module.exports = Pagination;