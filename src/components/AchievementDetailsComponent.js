import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import './style.css';
    function RenderData({data, favorite, postFavourite,deleteFavourite,editData}) {
        var fav;
        var favourite=favorite.favourite_achievements;
        
        if(favourite.length==0)
        fav=false;
        else
        {
            fav=favourite.filter((favorite) => favorite._id === data._id)[0];
            if(fav==null)
            fav=false;
            else
            fav=true;
        }
        return(
            <div className="bigp">
                <div className="another">
                    <div className="cardSp">
                        <img className="imgWidth" src={baseUrl +'images/'+ data.image} alt={data.image} />
                        <div>
                            <span className="star" onClick={() => fav ? deleteFavourite(data._id) : postFavourite(data._id)}>
                                {fav ?
                                    <span className="fa fa-heart"></span>
                                    : 
                                    <span className="fa fa-heart inside"></span>
                                }
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cardST">
                    <div>
                        {data.Information}
                    </div>
                </div>
            </div>
        );
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
                            <BreadcrumbItem><Link to='/Space-Achievement'>Space-Achievement</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.data.title}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.data.title}</h3>
                            <hr />
                        </div>
                    </div>
                    <div>
                        <RenderData data={props.data} favorite={props.favorite} postFavourite={props.postFavourite} deleteFavourite={props.deleteFavourite} editData={props.editData}/>
                    </div>
                    <br/>
                    
                    <div className="bg-light">
                        <CommentForm dataId={props.data._id} postComment={props.postComment}/>
                        <hr />
                        <RenderComments dataId={props.data._id} comments={props.data.comments} deleteComment={props.deleteComment}/>
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default Details;