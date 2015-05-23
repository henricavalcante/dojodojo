var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
var mountNode = document.getElementById('mountNode');
React.render(<HelloMessage name="John" />, mountNode);