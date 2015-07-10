var Comment = React.createClass({
	render: function(){
		var rawHTML = marked(this.props.children.toString(),{sanitize: true});
		var time = new Date(parseInt(this.props.time));
			return (
			<div >
				<div className="commentWrap">
					<div className='comment-name'>{this.props.name}</div> 
					<div className="comment-time">{time.toString()}</div>
				</div>
				<div className="comment-content" dangerouslySetInnerHTML={{__html: rawHTML}}></div>
			</div>
		)
	}
})
var CommentList = React.createClass({
	render: function(){
		var filterName = this.props.filterName;
		var filterContent = this.props.filterContent;
		console.log(filterContent);
		var commentArr = [];
		var comments = this.props.comments;
		comments.forEach(function(comment,index) {
			if(filterName!= '' ? comment.name.match(filterName) : true &&
			  filterContent!= '' ? comment.content.match(filterContent) : true){
				commentArr.push( <Comment name={comment.name} time={comment.time}>{comment.content}</Comment> );
			}
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
			<label>Name:</label><input type="text" name="name" ref="name" /> <br />
			<label>Content:</label><textarea name="content" ref="content" ></textarea>
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
var CommentFilter = React.createClass({
	render: function(){
		return (
			<div className="filterWrap">
				<label>Name:</label><input onChange={this._handleChange} type="text" name="name" ref="name" /> 
				<label>Content:</label><input onChange={this._handleChange} type="text" name="content" ref="content" />
			</div>
		)
	},
	_handleChange: function(e){
		// var target = $(e.currentTarget);
		// var type = target.attr('name');
		// var changeValue = target.val();
		var filterName = this.refs.name.getDOMNode().value;
		var filterContent = this.refs.content.getDOMNode().value;

		this.props.onFilterChange(filterName,filterContent);
	}
})
var CommentBox = React.createClass({
	getInitialState: function(){
		return {
			comments: [],
			filterName:'',
			filterContent:''
		}
	},
	componentDidMount: function(){
		this._getInitData();
	},
	render: function(){
		return (
			<div>
				<h1>Comments</h1>
				<CommentFilter onFilterChange = {this._handleFilterChange} />
				<CommentList filterContent={this.state.filterContent} filterName={this.state.filterName} comments = {this.state.comments} />
				<CommentForm onCommentSubmit = {this._handleFunc} />
			</div>

		)
	},
	_handleFilterChange: function(filterName,filterContent){
		this.setState({filterName:filterName,filterContent:filterContent});
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