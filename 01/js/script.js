var Contacts = React.createClass({
	getInitialState: function() {
		return {status: 0, name: 'user'};
	},
	render: function() {
		return (
			<li>
				<span>{this.props.status}</span>
				<span>{this.props.name}</span>
			</li>
		);
	}
});

var BtnEnviar = React.createClass({
	onMouseDown: function(){
		alert("alo vo to esotrado");
	},
	render: function(){
		return <button id="btn_enviar" onClick={this.onMouseDown}>Enviar</button>
	}
});

var BoxMessenger = React.createClass({
	render: function() {
		return <span></span>
	} 
});

var InputText = React.createClass({
	onKeyDown: function (e) {
		if (e.keyCode == 13) {
			var event = new CustomEvent('newmsg', { 'detail': e.target.value });
			document.dispatchEvent(event);
		}
		return null;
	},
	render: function() {
		return <input onKeyDown={this.onKeyDown} id="ip_text"/>
	}
});

var ChatHistory = React.createClass({
	getDefaultProps: function() {
		return {
			msg: ['teste', 'teste', 'danilo viado']
		};
	},
	componentDidMount: function() {
		window.addEventListener('newmsg', function(e) {
			console.log(e);
			//this.props.msg.push(e.target);
		});
	},
	render: function() {
		var msg = this.props.msg;
		var chico = [];
		for (var i in msg) {
			if (msg.hasOwnProperty(i)){
				chico.push(<li>{this.props.msg[i]}</li>);
			}
		}
		return (
			<section id="wc_box_messages">
				<ul>
					{chico}
				</ul>
			</section>
			);
	}
});

var ListUsers = React.createClass({
	render: function() {
		return (
			<section id="wc_list_users">
				<Contacts status={'on'} name={'chumbrega'}/>
				<Contacts status={'on'} name={'alfranio'}/>
			</section>
		);
	}
});

var ReactChat = React.createClass({
	render: function() {
		return (
			<section id={this.props.id}>
				<ListUsers/>
				<ChatHistory/>
				<InputText/>
				<BtnEnviar/>
			</section>
		);
	}
});

var mountNode = document.getElementById('mountNode');
React.render(<ReactChat id="WiChat" />, mountNode);