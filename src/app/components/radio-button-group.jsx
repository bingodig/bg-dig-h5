var React = require('react');
var Classable = require('../mixins/classable');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButton = require('./radio-button');

var RadioButtonGroup = React.createClass({

	mixins: [Classable],

	propTypes: {
		name: React.PropTypes.string.isRequired,
        valueSelected: React.PropTypes.string,
        defaultSelected: React.PropTypes.string,
        labelPosition: React.PropTypes.oneOf(['left', 'right']),
		onChange: React.PropTypes.func,
        direction: React.PropTypes.oneOf(['row', 'column'])
	},

  getDefaultProps: function() {
    return {
      direction: 'row'
    };
  },

  getInitialState: function() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || ''
    };
  },

  componentWillMount: function() {
    var cnt = 0;
    
    this.props.children.forEach(function(option) {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  }, 

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({selected: nextProps.valueSelected});
    }
  },

	render: function() {

    var radioButtons = this.props.children.map(function(radioButton) {
      
      var {
        name,
        value, 
        label,
        onCheck,
        ...other
      } = radioButton.props;

      if (radioButton.type.displayName === "RadioButton") {
        return <RadioButton
          {...other}
          ref={radioButton.props.value}
          name={this.props.name}
          key={radioButton.props.value}
          value={radioButton.props.value}
          label={radioButton.props.label}
          labelPosition={this.props.labelPosition}
          direction={this.props.direction}
          onCheck={this._onChange}
          checked={radioButton.props.value == this.state.selected}/>
        }else{
          return radioButton;
        }

		}, this);

    var classes = this.getClasses('dig-radio-button-group', {
      'dig-direction-row': this.props.direction === 'row',
      'dig-direction-column': this.props.direction === 'column'
    });

		return (
			<div className={classes}>
				{radioButtons}
			</div>
		);
	},

  _hasCheckAttribute: function(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && 
      radioButton.props.checked; 
  },

  _updateRadioButtons: function(newSelection) {
    if (this.state.numberCheckedRadioButtons == 0) {
      this.setState({selected: newSelection});
    } else if (process.NODE_ENV !== 'production') {
      var message = "Cannot select a different radio button while another radio button " + 
                    "has the 'checked' property set to true.";
      console.error(message);
    }
  },

	_onChange: function(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons == 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
	},

  getSelectedValue: function() {
    return this.state.selected;
  },

  setSelectedValue: function(newSelection) {
    this._updateRadioButtons(newSelection);  
  },

  clearValue: function() {
    this.setSelectedValue('');  
  }

});

module.exports = RadioButtonGroup;
