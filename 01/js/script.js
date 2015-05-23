var Btn_enviar = React.createClass({
	render: function(){
		return <button id="btn_enviar"/>
	}
});

var InputText = React.createClass({
	render: function() {
		return <input id="ip_text"/>
	}
});

var BoxMessages = React.createClass({
	render: function() {
		return (
			<section id="wc_box_messages">
				<InputText/>
				<Btn_enviar/>
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
				<BoxMessages/>
			</section>
		);
	}
});

var mountNode = document.getElementById('mountNode');
React.render(<ReactChat id="WiChatMuhahaha" />, mountNode);