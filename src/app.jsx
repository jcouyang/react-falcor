let React = require('react'),
    Todo = require('./todo.jsx');

let todoModel = new falcor.Model({
  cache: {
    todos: {
      length: 10,
      0: {
        name: 'get milk from corner store',
        done: false
      },
      1: {
        name: 'take a dump',
        done: true
      },
      2:{
        name: 'eat a dump',
        done: false
      }
    }
  },
  onChange:function(e) {
    if(todoModel)
      React.render(
        <Todos model={todoModel}/>,document.querySelector('#todoapp')
      )
  }
});

let Todos = React.createClass({
  filters: {
    all: x=>true,
    completed: x=>x.done,
    active: x=>!x.done,
  },
  getInitialState: function() {
    return {
      todos: [],
      filter: this.filters.all
    }
  },
  _changeFilter: function(filter) {
    this.setState({filter: this.filters[filter]})
  },
  componentDidMount: function() {
    this.props.model.getValue("todos.length").then(len => {
      return len-1;
    }).then(range=>this.props.model.get(`todos[0..${range}].done`))
        .then(res=>this.setState(res.json))
  },
  render: function() {
    let todoList = fjs.toArray(this.state.todos)
                      .filter(x=>this.state.filter(x[1]))
                      .map((todo,idx)=>(                        
                        <Todo todoid={todo[0]} key={todo[0]} model={this.props.model}/>
                      ))
      return (
        <div>
          <header className="header">
            <h1>todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autofocus/>
          </header>
          <section class="main">
            <div>
              <input className="toggle-all" type="checkbox"/>
              <label for="toggle-all">Mark all as complete</label>
              <ul className="todo-list">
                {todoList}
              </ul>
            </div>
          </section>
          <Footer filter={this._changeFilter} count={fjs.toArray(this.state.todos).filter(x=>!x[1].done).length}/>
        </div>
      )
  }
});

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

React.render(
  <Todos model={todoModel}/>,document.querySelector('#todoapp')
)
