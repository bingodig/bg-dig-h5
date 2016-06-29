var React = require('react');
var Classable = require('../../mixins/classable');

var Paper = require('../paper/paper.jsx');
var Row = require('../layout/row.jsx');
var Col = require('../layout/col.jsx');
var DropDownMenu = require('../drop-down-menu/drop-down-menu.jsx');

require('./style/index.scss');


var DateToolbar = React.createClass({

  mixins: [Classable],

  propTypes: {
    onChange: React.PropTypes.func,
  },

  getDefaultProps: function(){
    return{
      lastYear : new Date().getFullYear(),
      firstYear: new Date().getFullYear() - 9,
      zDepth : 1,
      defaultMonth : 1
    }
  },

  getInitialState: function() {

    var filterYears = [];
    var {lastYear,firstYear,defaultMonth} = this.props;
    for(var i=0;i<=lastYear - firstYear;i++){
      filterYears[i] = {'payload':lastYear - i,'text':lastYear - i};
    }
    return {
        isChecked : 0,
        filterYears : filterYears,
        defaultMonth : defaultMonth,
        checkedYear : this.props.lastYear,
    };
  },
  handleClick: function(defaultMonth){
    // console.log(this.refs);
    this.setState({defaultMonth:defaultMonth});
    var data = {};
    data['getYear'] = this.state.checkedYear;
    data['getMonth'] = parseInt(defaultMonth) + 1;
    this.props.onChange(data);
  },
  onChange: function(a,b,c){
    this.setState({checkedYear : c.text});
    var data = {};
    data['getYear'] = c.text;
    data['getMonth'] = parseInt(this.state.defaultMonth) + 1;
    this.props.onChange(data);
  },
  render: function() {
    var {lastYear,zDepth} = this.props;
    var pStyle={height:40,width:40,lineHeight:'40px',textAlign:'center'};
    var eStyle={height:40,width:40,lineHeight:'40px',textAlign:'center',background:'#673ab7','color':'#fff'} 
    var months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']; 

    var defaultMonth = this.state.defaultMonth;
    var filterYears = this.state.filterYears;
    var checkedYear = this.state.checkedYear;
    return (
        <div>
            <Paper zDepth={zDepth} innerStyle={{height:47}}>   
              <div style={{width:'15%',float:'left',marginTop:8}}>
              <DropDownMenu
                onChange={this.onChange}
                mini={true} 
                menuItems={filterYears}
                isTransparent={true} 
                zDepth={0}/>
              </div>
              <div style={{width:'85%',float:'right',padding:3}}>
              <Row ref="months" type="flex" justify="space-around" align="middle">
              {
                months.map(function(data,index){
                  var _style = (defaultMonth) == index ? eStyle : pStyle;
                  return(
                    <Col key={index} ref={'m'+index} style={{cursor:'pointer'}} onClick={this.handleClick.bind(this,index)} span="2"><Paper zDepth={0} style={_style} circle={true}>{data}</Paper></Col>
                  )
                },this)
              }
              </Row>
              </div>
            </Paper>
        </div> 
    );
  },
  getDate: function(){
    var {lastYear,defaultMonth} = this.props;
    var data = {};
    data['getYear'] = lastYear;
    data['getMonth'] = parseInt(defaultMonth) + 1;
    return data;
  },
});

module.exports = DateToolbar;
