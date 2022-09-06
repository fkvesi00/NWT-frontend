import React,{Component} from "react";

class SignIn extends Component {
   constructor(props){
    super(props)
    this.state = {
        email: '',
        password: ''
    }
   }
   onEmailChange = (event) => {
        this.setState({email: event.target.value})        
   }

   onPassword = (event) => {
        this.setState({password: event.target.value})
   }

   onSubmit = () =>{
    fetch('http://localhost:3000/signin',{
        method:'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email:this.state.email,
            password:this.state.password
        })
    })
    .then(res => res.json())
    .then(user => {
        if(!user.id)
            console.log('prvo se registriraj')
        else{
            //console.log(user)
            this.props.loadUser(user);
            this.props.onRouteChange('home');
        }
    })
   }

   
    render(){
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6  shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" >Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" >Password</label>
                            <input onChange={this.onPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmit}/>
                        </div>
                        <div className="lh-copy mt3">
                        <p className="f6 link dim black db pointer" onClick={() => this.props.onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }

}
export default SignIn;