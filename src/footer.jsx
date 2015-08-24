let React = require('react');
let Footer = React.createClass({
  getInitialState:function() {
    return {
      selected: "all"
    }
  },
  _handleClick: function(e) {
    let val = e.target.dataset.name;
    this.props.filter(val);
    this.setState({selected: val});
  },
  render: function() {
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.props.count}</strong> item left</span>
        <ul className="filters">
          <li>
            <a className={this.state.selected=="all"?"selected":""} data-name="all"
               onClick={this._handleClick}>
              All
            </a>
          </li>
          <li>
            <a className={this.state.selected=="active"?"selected":""} data-name="active" onClick={this._handleClick}>Active</a>
          </li>
          <li>
            <a className={this.state.selected=="completed"?"selected":""} data-name="completed" onClick={this._handleClick}>Completed</a>
          </li>
        </ul>

        <button className="clear-completed">Clear completed</button>
      </footer>
    )
  }
});
module.exports=Footer;
