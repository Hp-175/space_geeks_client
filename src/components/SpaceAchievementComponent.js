import React, { Component } from 'react';
import { Modal,ModalBody,ModalHeader,Form,FormGroup,Label,Input,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import './style.css';

function RenderAchievementItem({ achievement }) {
    return(
        <div className="card">
            <Link className="link" to={`/Space-Achievement/${achievement._id}`} >
                <img width="100%" src={baseUrl+'images/'+achievement.image} alt={achievement.image} />
                <div className="capt"><span className="bottom-center">{achievement.title}</span></div>
            </Link>
        </div>
    );
}

class SpaceAchievement extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectedFile: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handlePost=this.handlePost.bind(this);
        this.postAchievement=this.postAchievement.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handlePost(event){
        this.toggleModal();
        const formData = new FormData();
        formData.append(
            "imageFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        
        this.props.postImage(formData,'Achievement',this.information.value,this.credits.value,this.title.value);
        event.preventDefault();
    }

    onFileChange = event => {

        this.setState({ selectedFile: event.target.files[0] });
        
        };

    postAchievement=()=>{
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
                                    onChange={this.onFileChange}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    achievementre = this.props.achievements.achievements.map((achievement) => {
        return (
            <div  key={achievement._id}>
                <RenderAchievementItem achievement={achievement} />
            </div>
        );
    });

    render(){
        if (this.props.achievements.isLoading) {
            return(
                
                <div className="container">
                    <div className="row">
                        <this.postAchievement/>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.achievements.errMess) {
            return(
                <div>
                    <div>
                        <this.postAchievement/>
                        <h4>{this.props.achievements.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                    <div>
                        <this.postAchievement/>
                        <div className="alignment">
                            {this.achievementre}
                        </div>
                    </div>
            );
        }
    } 
}

export default SpaceAchievement;