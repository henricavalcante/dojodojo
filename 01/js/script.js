var BoxMessages = React.createClass({
	render: function() {
		<section id="wc_box_messages"></section>;
	};
});

var ListUsers = React.createClass({
	render: function() {
		return <section id="wc_list_users"></section>;
	}
})

var ReactChat = React.createClass({
	render: function() {
		return (
			<section id="{this.props.id}">
				<ListUsers/>
				<BoxMessages/>
			</section>
		);
	}
})

var mountNode = document.getElementById('mountNode');
React.render(<ReactChat id="WiChatMuhahaha" />, mountNode);