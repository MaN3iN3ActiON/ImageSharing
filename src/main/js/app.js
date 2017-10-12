'use strict';

// tag::vars[]

const React = require('react');
const ReactDOM = require('react-dom');

// end::vars[]

// tag::app[]


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {tasks: [
			{
				'id' : '1',
				'name' : 'class',
				'detail' : 'happy class'
			},

				{
					'id' : '1',
					'name' : 'class',
					'detail' : 'snappy class'
				}
		]};
	}

	render() {
		return (
			<TaskList tasks={this.state.tasks}/>
		)
	}
}

class TaskList extends React.Component{
	render() {
		var tasks = this.props.tasks.map(task =>
			<Task key={task.id} task={task}/>
		);
		return (
			<table className='table table-bordered'>
				<tbody>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Detail</th>
					</tr>
					{tasks}
				</tbody>
			</table>
		)
	}
}

class Task extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.task.id}</td>
				<td>{this.props.task.name}</td>
				<td>{this.props.task.detail}</td>
			</tr>
		)
	}
}


// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
