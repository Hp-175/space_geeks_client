import React,{Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchAchievements,fetchFacts,fetchTheories,
    fetchFavouriteAchievements,fetchFavouriteFacts,
    fetchFavouriteTheories,postAchievement,postFact,
    postTheory,putAchievement,putFact,putTheory,
    deleteAchievement,deleteFact,deleteTheory,
    postFavouriteAchievement,postFavouriteFact,
    postFavouriteTheory,deleteFavouriteAchievement,
    deleteFavouriteFact,deleteFavouriteTheory,
    postAchievementComment,postFactComment,
    postTheoryComment,deleteFactComment,
    deleteAchievementComment,deleteTheoryComment,
    postChangeUsername,loginUser,logoutUser,
    signupUser,postImage,Set_default} from '../redux/ActionCreators';


import { matchPath } from 'react-router'
import Header from './HeaderComponent';
import SpaceAchievement from './SpaceAchievementComponent';
import AchievementDetails from './AchievementDetailsComponent';
import { action } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        achievements:state.achievements,
        facts: state.facts,
        theories:state.theories,
        favouriteAchievements: state.favouriteAchievements,
        favouriteFacts:state.favouriteFacts,
        favouriteTheories:state.favouriteTheories,
        auth: state.auth,
        image:state.image
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAchievements: () => {dispatch(fetchAchievements())},
    fetchFacts: () => {dispatch(fetchFacts())},
    fetchTheories: () => {dispatch(fetchTheories())},
    fetchFavouriteAchievements: () => {dispatch(fetchFavouriteAchievements())},
    fetchFavouriteFacts: () => {dispatch(fetchFavouriteFacts())},
    fetchFavouriteTheories: () => {dispatch(fetchFavouriteTheories())},
    postAchievement: (image, Information, credits,title) => dispatch(postAchievement(image, Information, credits,title)),
    postFact: (image, Information, credits,title) => dispatch(postFact(image, Information, credits,title)),
    postTheory: (image, Information, By,title) => dispatch(postTheory(image, Information, By,title)),
    putAchievement: (image, Information, credits,title,_ID) => dispatch(putAchievement(image, Information,title, credits,_ID)),
    putFact: (image, Information, credits,title,_ID) => dispatch(putFact(image, Information, credits,title,_ID)),
    putTheory: (image, Information, By,title,_ID) => dispatch(putTheory(image, Information, By,title,_ID)),
    deleteAchievement: (_ID) => dispatch(deleteAchievement(_ID)),
    deleteFact: (_ID) => dispatch(deleteFact(_ID)),
    deleteTheory: (_ID) => dispatch(deleteTheory(_ID)),
    deleteFavouriteAchievement: (_ID) => dispatch(deleteFavouriteAchievement(_ID)),
    deleteFavouriteFact: (_ID) => dispatch(deleteFavouriteFact(_ID)),
    deleteFavouriteTheory: (_ID) => dispatch(deleteFavouriteTheory(_ID)),
    postFavouriteAchievement: (_ID) => dispatch(postFavouriteAchievement(_ID)),
    postFavouriteFact: (_ID) => dispatch(postFavouriteFact(_ID)),
    postFavouriteTheory: (_ID) => dispatch(postFavouriteTheory(_ID)),
    postAchievementComment: (comment,PID,CID) => dispatch(postAchievementComment(comment,PID,CID)),
    postFactComment: (comment,PID,CID) => dispatch(postFactComment(comment,PID,CID)),
    postTheoryComment: (comment,PID,CID) => dispatch(postTheoryComment(comment,PID,CID)),
    deleteAchievementComment: (PID,CID) => dispatch(deleteAchievementComment(PID,CID)),
    deleteFactComment: (PID,CID) => dispatch(deleteFactComment(PID,CID)),
    deleteTheoryComment: (PID,CID) => dispatch(deleteTheoryComment(PID,CID)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    signupUser: (username,password,firstname,lastname) => dispatch(signupUser(username,password,firstname,lastname)),
    postChangeUsername: (newUsername) => dispatch(postChangeUsername(newUsername)),
    postImage: (formadata,func,info,cred,title) => dispatch(postImage(formadata,func,info,cred,title)),
    Set_default:()=>dispatch(Set_default())
  });

  class Main extends Component {

    componentDidMount() {
      this.props.fetchAchievements();
      this.props.fetchFacts();
      this.props.fetchTheories();
      this.props.fetchFavouriteAchievements();
      this.props.fetchFavouriteFacts();
      this.props.fetchFavouriteTheories();
    }
    
    render() {
      const AchievementWithId = () => {
        
        
        const match = matchPath(this.props.history.location.pathname, {
          path: '/Space-Achievement/:achievementId',
          exact: true,
          strict: false
        });
        return(
          <AchievementDetails data={this.props.achievements.achievements.filter((achievement) => achievement._id === match.params.achievementId)[0]}
            editData={this.props.putAchievement}
            deleteData={this.props.deleteAchievement}
            deletePost={this.props.deleteAchievement}
            isLoading={this.props.achievements.isLoading}
            errMess={this.props.achievements.errMess}
            postComment={this.props.postAchievementComment}
            deleteComment={this.props.deleteAchievementComment}
            favorite={this.props.favouriteAchievements}
            postFavourite={this.props.postFavouriteAchievement}
            deleteFavourite={this.props.deleteFavouriteAchievement}
            place={'Space-Achievement'}
            />
        );
      }
      return (
        <div>
          <Header auth={this.props.auth} 
            loginUser={this.props.loginUser} 
            logoutUser={this.props.logoutUser} 
            />   
          <Switch>
            <Route exact path="/Space-Achievement" component={() => <SpaceAchievement 
              achievements={this.props.achievements} 
              postAchievement={this.props.postAchievement} 
              postImage={this.props.postImage} 
              image={this.props.image} 
              Set_default={this.props.Set_default}/>} 
            />
            <Route exact path="/Space-Achievement/:achievementId" component={() => <AchievementWithId match={this.props.match}/>} />
              {/* <Route exact path="/Interesting-Facts" component={() => <InterestingFacts facts={this.props.facts} />} /> */}
              {/* <Route exact path="/Facinating-Theories" component={() => <FacinatingTheories theories={this.props.theories} />} /> */}
              {/* <Route exact path="/Space-Achievement/:dishId" component={() => <SpaceAchievement achievements={this.props.achievements} />} /> */}
              {/* <Route exact path="/Interesting-Facts/:dishId" component={() => <InterestingFacts facts={this.props.facts} />} /> */}
              {/* <Route exact path="/Facinating-Theories/:dishId" component={() => <FacinatingTheories theories={this.props.theories} />} /> */}
              <Redirect to="/Space-Achievement" />
            </Switch>
        </div>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
  