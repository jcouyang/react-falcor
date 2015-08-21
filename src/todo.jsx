let React = require('react');
let Todo = React.createClass({
  
  getInitialState: function() {
    return {
      name: "",
      done: false
    }
  },
  componentDidMount: function() {
    this.props.model.get(`todos[${this.props.todoid}]["name","done"]`)
        .then(res => {
          this.setState(res.json.todos[this.props.todoid])
        })
  },
  render: function() {
    return (
      <li className={this.state.done?"completed":""}>
      <div className="view">
				<input className="toggle" type="checkbox" checked={this.state.done}
               onClick={e=>this.props.model
                               .setValue(
                                 `todos[${this.props.todoid}].done`, e.target.checked)
                               .then(value=>this.setState({done:value}))} />
				<label>{this.state.name}</label>
				<button className="destroy"></button>
			</div>
      </li>
    )
  }
})

module.exports = Todo;
