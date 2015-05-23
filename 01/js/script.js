var User = React.createClass({
	getInitialState: function() {

	},
	render: function() {
		return
	}
});

var BtnEnviar = React.createClass({
	render: function(){
		return <button id="btn_enviar">Enviar</button>
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
	componentDidMount: function() {
		window.addEventListener('newmsg', function(msg) {
			this.props.msg.push(msg);
		});
	},
	render: function() {
		return (
			<section id="wc_box_messages">
				<ul>
				for (var i in this.props.msg) {
					if () {
						<li>
							{this.props.msg[i]}
						</li>
					};
				}
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
			<section id="{this.props.id}">
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