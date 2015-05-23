var Contacts = React.createClass({
	getInitialState: function() {
		return {status: 0, name: 'user'};
	},
	render: function() {
		return (
			<li>
				<span></span>
				<span></span>
			</li>
		);
	}
});

var BtnEnviar = React.createClass({
	render: function(){
		return <button id="btn_enviar">Enviar</button>
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
			//enviar a mensagem.
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
		window.addEventListener('newmsg', function(msg) {
			this.props.msg.push(msg);
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
		return <section id="wc_list_users"></section>;
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