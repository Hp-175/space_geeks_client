import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col,
    FormGroup,Form,Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import './style.css';


class RenderData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handlePost=this.handlePost.bind(this);
        this.handleChangeEvent=this.handleChangeEvent.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handlePost(event){
        this.toggleModal();
        this.props.editData(this.props.data.image,this.information.value,this.title.value,this.credits.value,this.props.data._id);
        event.preventDefault();
    }
    handleChangeEvent(val) {
        return val;
      }
    render()
    {
        var fav;
        var favourite=this.props.favorite.favourite_achievements;
        
        if(favourite.length==0)
        fav=false;
        else
        {
            fav=favourite.filter((favorite) => favorite._id === this.props.data._id)[0];
            if(fav==null)
            fav=false;
            else
            fav=true;
        }
        return(
            <div>
                <div className="another">
                    <div className="cardSp">
                        <img className="imgWidth" src={baseUrl +'images/'+ this.props.data.image} alt={this.props.data.image} />
                        <div>
                            <span className="star" onClick={() => fav ? this.props.deleteFavourite(this.props.data._id) : this.props.postFavourite(this.props.data._id)}>
                                {fav ?
                                    <span className="fa fa-heart"></span>
                                    : 
                                    <span className="fa fa-heart inside"></span>
                                }
                            </span>
                            <div className="dbtn">
                                <span>&#xFE19;</span>
                            </div>
                            <div className="dropdown">
                                <div className="dropdown-content">
                                    <span onClick={this.toggleModal}>
                                        Edit Post
                                    </span>
                                    <div>
                                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                            <ModalHeader toggle={this.toggleModal}>{this.props.data.title}</ModalHeader>
                                            <ModalBody>
                                                <Form onSubmit={this.handlePost}>
                                                    <FormGroup>
                                                        <Label htmlFor="title">Title</Label>
                                                        <Input type="text" id="title" name="title" onChange={()=>{this.handleChangeEvent(this.props.data.title);}} defaultValue={this.props.data.title}
                                                            innerRef={(input) => this.title = input} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="information">Information</Label>
                                                        <Input type="text" id="information" name="information" onChange={()=>{this.handleChangeEvent(this.props.data.Information);}} defaultValue={this.props.data.Information}
                                                            innerRef={(input) => this.information = input}  />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="credits">Credits</Label>
                                                        <Input type="text" id="credits" name="credits" onChange={()=>{this.handleChangeEvent(this.props.data.credits);}} defaultValue={this.props.data.credits}
                                                            innerRef={(input) => this.credits = input}  />
                                                    </FormGroup>
                                                    <Button type="submit" value="submit" color="primary">Post</Button>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                    </div>
                                    <Link to={`/${this.props.place}`} className="link">
                                        <span onClick={()=>{this.props.deleteData(this.props.data._id)}}>Delete Post</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cardST">
                    <div>
                        {this.props.data.Information}
                        <br /><br />
                        <div className="foot">
                        By : {this.props.data.username}
                        <br/>
                        Credit : {this.props.data.credits}</div>
                    </div>
                </div>
            </div>
        );
    }
}

class RenderComments extends Component {
    constructor(props) {
        super(props);
        }

    render(){
        if (this.props.comments !== null&&this.props.comments.length!==0)
        {
            return(
                <div>
                    
                    <ul className="list-unstyled">
                        {this.props.comments.map((comment) => {
                            return (
                                <div in key={comment._id}>
                                    <li>
                                        <p className="overAll">
                                            <span className="commentName">{comment.username}</span>
                                            <span className="second">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}</span>
                                            <span className="cornerText">    
                                                <div className="fa fa-times myDiv"  onClick={()=>this.props.deleteComment(this.props.dataId,comment._id)}></div><span className="hide">Remove</span>
                                            </span>
                                        </p>
                                        <p className="overAll">{comment.comment}</p>
                                    </li>
                                    <br />
                                </div>
                            );
                        })}
                    </ul>
                </div>
            );
        }
        else
            return(
                <div>No comments yet</div>
            );
        }
    
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(values.comment,this.props.dataId, null );
    }

    render() {
        return(
        <div>
            <div className="corners">
                <span className="fs overAll top">Comments</span>
                <Button style={{backgroundColor:"steelblue"}}className="top" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Add Comment
                </Button>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment"
                                    rows="3" className="form-control" />
                        </Col>
                    </Row>
                    <Button type="submit" className="bg-primary">
                        post
                    </Button>
                </LocalForm>
            </ModalBody>
            </Modal>
        </div>
        );
    }

}

const Details = (props) => {

if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    );
}
else if (props.errMess) {
    return(
        <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
    );
}
else if (props.data != null)        
    return (
        <div className="page">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link className="link" to={`/${props.place}`}>{props.place}</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.data.title}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3 className="Dtitle">{props.data.title}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderData data={props.data}
                    favorite={props.favorite}
                    postFavourite={props.postFavourite}
                    deleteFavourite={props.deleteFavourite}
                    editData={props.editData}
                    deleteData={props.deleteData}
                    place={props.place}
                />
            </div>
            <br/>
            
            <div className="bg-light col-12">
                <CommentForm dataId={props.data._id} postComment={props.postComment}/>
                <hr />
                <RenderComments dataId={props.data._id} comments={props.data.comments} deleteComment={props.deleteComment}/>
            </div>
        </div>
    );
    else
    return(
        <div>Not Found</div>
    );
}

export default Details;