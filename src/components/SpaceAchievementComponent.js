import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { postAchievementComment } from '../redux/ActionCreators';

    function RenderAchievementItem({ achievement, onClick }) {
        return(
            <Card>
                <Link to={`/Space-Achievement/${achievement._id}`} >
                    {/* <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} /> */}
                    <CardImgOverlay>
                        <CardTitle>{achievement.Information}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    class SpaceAchievement extends Component{
        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handlePost=this.handlePost.bind(this);
        }
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        
        handlePost(event){
            this.toggleModal();
            const formData=new FormData();
            formData.append("Image",this.image.value)
            this.props.postImage({formdata: formData, func: this.props.postAchievement,info:this.information.value,cred:this.credits.value,title:this.title.value});
            event.preventDefault();
        }
        postAchievement(){
            return(
                <div>
                    <Button outline onClick={this.toggleModal}>
                        Post Space Achievement
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Space Achievement</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handlePost}>
                                <FormGroup>
                                    <Label htmlFor="title">Title</Label>
                                    <Input type="text" id="title" name="title"
                                        innerRef={(input) => this.title = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="information">Information</Label>
                                    <Input type="text" id="information" name="information"
                                        innerRef={(input) => this.information = input}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="credits">Credits</Label>
                                    <Input type="text" id="credits" name="credits"
                                        innerRef={(input) => this.credits = input}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="image">Upload image</Label>
                                    <Input type="file" id="image" name="image"
                                        innerRef={(input) => this.image = input}  />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
        achievementre = this.props.achievements.achievements.map((achievement) => {
            return (
                <div key={achievement._id} className="col-12 col-md-5 m-1">
                    <RenderAchievementItem achievement={achievement} />
                </div>
            );
        });

        render(){
            if (this.props.achievements.isLoading) {
                return(
                    
                    <div className="container">
                        <div className="row">
                            <postAchievement/>
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (this.props.achievements.errMess) {
                return(
                    <div className="container">
                        <div className="row">
                            <postAchievement/>
                            <h4>{this.props.achievements.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else
                return (
                    <div className="container">
                        <div className="row">
                        <Button outline onClick={this.toggleModal}>
                        Post Space Achievement
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Space Achievement</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handlePost}>
                                <FormGroup>
                                    <Label htmlFor="title">Title</Label>
                                    <Input type="text" id="title" name="title"
                                        innerRef={(input) => this.title = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="information">Information</Label>
                                    <Input type="text" id="information" name="information"
                                        innerRef={(input) => this.information = input}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="credits">Credits</Label>
                                    <Input type="text" id="credits" name="credits"
                                        innerRef={(input) => this.credits = input}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="image">Upload image</Label>
                                    <Input type="file" id="image" name="image"
                                        innerRef={(input) => this.image = input}  />
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Post</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                            {this.achievementre}
                        </div>
                    </div>
                );
        }
        
    }

export default SpaceAchievement;