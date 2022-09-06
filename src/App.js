import React,{Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '4f401fdbe5df44be8766ba687aa4d77b'
})

class App extends Component {
  constructor(){
    super()
    this.state ={
      input:'' ,
      imageUrl:'' ,
      box: {},
      route:'signin',
      isSingedIn:false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }
  }

  

  loadUser = (data) => {
    this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    app.models.predict({
      id: "a403429f2ddf4b49b307e318f00e528b",
      version: "34ce21a40cc24b6b96ffee54aabff139",
    },this.state.input)
    .then( response =>{
      if(response){
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body:JSON.stringify ({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then( count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    }
      ) 
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route=='home'){
      this.setState({isSingedIn:true})
    }else{
      this.setState({isSingedIn:false})
    }
    this.setState({route})
  }

  render(){
    const {isSingedIn,imageUrl,route,box} = this.state;
    return (
      <div className='App'>
           <Navigation onRouteChange={this.onRouteChange} isSingedIn={isSingedIn}/>
           {route==='signin' ? 
           <SignIn loadUser={this.loadUser} onRouteChange= {this.onRouteChange}/> 
           
           :
           route === 'home' ?
           <div>
           <Logo />
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
           <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange}/>
           <FaceRecognition box={box} imageUrl={imageUrl}/>
           </div>
           : 
           
           <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    }
      <div style={{position:'absolute', bottom:'0px', height:'50px', paddingTop:'20px', paddingLeft: '90%', fontSize:'20px' }}>{'© Filip Kvesić'}</div>
      </div>
    );
  }
}

export default App;
