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

var BoxMessenger = React.createClass({
	render: function() {
		return <span></span>
	} 
});

var BtnAndInput = React.createClass({
	render: function(){
		return (
			<div>
				<InputText/>
				<BtnSend/>
			</div>
		);
	}
});

var BtnSend = React.createClass({
	onMouseDown: function(){
		var event = new CustomEvent('clickBtnSend');
			window.dispatchEvent(event);
	},
	render: function(){
		return <button onClick={this.onMouseDown}>Enviar</button>
	}
});

var InputText = React.createClass({
	getInitialState: function () {
		return {};
	},
	dispatchMessage: function () {
		var text = this.state.text.trim();

		if(text.length){
			var event = new CustomEvent('newmsg', { 'detail': this.state.text });
			window.dispatchEvent(event);
			this.setState({text: ''});
		}
		
	},
	onKeyUp: function(e){
		if (e.keyCode === 13) {
			this.dispatchMessage();
		}
	},
	onChange: function (e) {
		this.setState({text: e.target.value});
	},
	componentDidMount: function() {
		var _this = this;
		window.addEventListener('clickBtnSend', function(e) {
			_this.dispatchMessage();
		});
	},
	render: function() {
		return <input onChange={this.onChange} onKeyUp={this.onKeyUp} value={this.state.text} />
	}
});

var ChatTime = React.createClass({
	teste: function(dateMsg) {
		var
			temp = ~~((_.now() - dateMsg)/1000),
			ss = _.padLeft(temp % 60,2,'0'),
			mm = _.padLeft(~~(temp / 60),2,'0'),
			hh = _.padLeft(~~(temp / 3600),2,'0'),
			hour = hh+':'+mm+':'+ss 

		return hour;
	},
	render: function(){
		return <span>{this.teste(this.props.time)}</span>
	}
});

var ChatHistory = React.createClass({
	getInitialState: function () {
		return {
			msg: []
		};
	},
	addMessage: function(msg) {
		var msgs = this.state.msg;
		msgs.push({
			date: _.now(),
			post: msg
		});
		this.setState({msg: msgs});
	},
	componentDidMount: function() {
		var _this = this;
		window.addEventListener('newmsg', function(e) {
			_this.addMessage(e.detail);
		});
	},
	render: function() {
		return (
			<section id='wc_box_messages'>
				<ul>
					{this.state.msg.map(function(item, i) {
	          return (
	          	<li key={i}><ChatTime time={item.date}/> {item.post}</li>
	          );
	        }, this)}
				</ul>
			</section>
			);
	}
});

var ListUsers = React.createClass({
	render: function() {
		return (
			<section id='wc_list_users'>
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
				<BtnAndInput/>
				<ChatHistory/>
			</section>
		);
	}
});

var mountNode = document.getElementById('mountNode');
React.render(<ReactChat id='WiChat' />, mountNode);