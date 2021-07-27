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
                <div>
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <div className="cardSp">
                            <img className="imgWidth" src={baseUrl +'images/'+ data.image} alt={data.image} />
                            <div>
                                <Button outline color="primary" onClick={() => fav ? alert('Already favourite') : postFavourite(data._id)}>
                                    {fav ?
                                        <span className="fa fa-heart"></span>
                                        : 
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
                            </div>
                            <div className="containerText">
                                {data.title}
                            </div>
                        </div>
                    </FadeTransform>
                </div>
            );

    }

    function RenderComments({comments, postComment, dataId,deleteComment}) {
        if (comments !== null&&comments.length!==0)
            return(
                <div className="col-12 col-md-5 m-1">
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in key={comment._id}>
                                        <li>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.username} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm dataId={dataId} postComment={postComment}/>
                </div>
            );
        else
            return(
                <div>No comments yet</div>
            );
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
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
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
                <div className="container">
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
                        <RenderData data={props.data} favorite={props.favorite} postFavorite={props.postFavorite} deleteFavourite={props.deleteFavourite} editData={props.editData}/>
                        <br/><h3>Comments</h3>
                        <hr />
                        <RenderComments comments={props.data.comments} postComment={props.postComment} dataId={props.data._id} deleteComment={props.deleteComment}/>
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default Details;