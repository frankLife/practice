var Comment = React.createClass({
	render: function(){
		return (
			<div className="commentWrap">
				<div>
					<div className='comment-name'>{this.props.name}</div> 
					<div className="comment-time">{this.props.time}</div>
				</div>
				<div className="comment-content">{this.props.content}</div>
			</div>
		)
	}
})
var CommentList = React.createClass({
	render: function(){
		var commentArr = [];
		var comments = this.props.comments;
		comments.forEach(function(comment,index) {
			commentArr.push( <Comment name={comment.name} time={comment.time} content={comment.content} /> );
		});
		return (
			<div className="commentList" >
				{commentArr}
			</div>
		)
	}
})
var CommentForm = React.createClass({
	render: function(){
		return (
		<form onSubmit={this._handleSubmit}>
			<input type="text" name="name" ref="name" />
			<input type="text" name="content" ref="content" />
			<button type="submit">submit</button>
		</form>
		)
	},
	_handleSubmit: function(e){
		e.preventDefault();
		var name = this.refs.name.getDOMNode().value;
		var content = this.refs.content.getDOMNode().value;
		console.log(name,content)
		if(!name || !content) {
			return;
		}

		this.props.onCommentSubmit(name,content);
	}
})
var CommentBox = React.createClass({
	getInitialState: function(){
		return {
			comments: []
		}
	},
	componentDidMount: function(){
		this._getInitData();
	},
	render: function(){
		return (
			<div>
				<h1>Comments</h1>
				<CommentList comments = {this.state.comments} />
				<CommentForm onCommentSubmit = {this._handleFunc} />
			</div>

		)
	},
	_handleFunc: function(name,content){	
		var comments = 	this.state.comments.concat({name: name,content:content,time: Date.now()});
		this.setState({comments: comments});
		$.ajax({
			url:this.props.url,
			type: 'post',
			dataType: 'json',
			data: {
				data: comments
			},
			success: function(success){
				if(!success) {
					alert('err');
					location.reload();
				}
			}
		})
	},
	_getInitData: function(){
		var self = this;
		$.ajax({
			url: this.props.url,
			type: 'get',
			dataType: 'json',
			success: function(data){
				self.setState({comments: data})
			}
		})
	}
})

React.render(<CommentBox url="/comments.json"/>,document.body);