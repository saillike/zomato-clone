import React from "react";
import '../Styles/Filter.css';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        window.open("http://localhost:5600/auth/logout", "_self");
    }

    google = () => {
        window.open("http://localhost:5600/auth/google", "_self");
    };
    
    github = () => {
        window.open("http://localhost:5600/auth/github", "_self");
    };

    render() {
        const { loginModalIsOpen, loggedInUser, isLoggedIn } = this.state;
        const {user} = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark head1">
    <div className="container">
      <a className="navbar-brand" href="/">
        <h2 className="rounded-circle1"> e!</h2>
      </a>
     
      <div className="collapse navbar-collapse flex-grow-1 text-right" id="mynavbar">
        
        {!user ? (
          <ul className="navbar-nav ms-auto flex-nowrap">
          <li className="nav-item d-flex flex-row justify-content-end  pe-lg-5 pe-4 mt-2 cursor-pointer">
            <a className="nav-link login cursor-pointer"  onClick={() => this.handleModal('loginModalIsOpen', true)} >login</a>
          </li>
          <li className="nav-item d-flex flex-row justify-content-end  pe-lg-5 pe-4 mt-2">
            <a className="nav-link create cursor-pointer" onClick={() => this.handleModal('loginModalIsOpen', true)} >Create an account</a>
          </li></ul>
          ) : (
            <ul className="navbar-nav ms-auto flex-nowrap">
            <li className="nav-item d-flex flex-row justify-content-end  pe-lg-5 pe-4 mt-2">
            <img src={user.photos[0].value} alt="" className="avatar" />
            <a className="nav-link  text-white" aria-current="page">&nbsp; {user.displayName}</a>
           
            </li>
            <li className="nav-item d-flex flex-row justify-content-end  pe-lg-5 pe-4 mt-2">
            <a className="nav-link create cursor-pointer" onClick={this.handleLogout} >Logout</a>
            
            </li>
         
        </ul> )}
      </div>
    </div>
  </nav>
                
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles} >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', marginBottom: '10px', marginTop: '-30px' }} onClick={() => this.handleModal('loginModalIsOpen', false)}>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>

                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px', marginTop: '-20px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <div className="login" style={{ color: '#CE0505', textAlign: 'center', marginRight: '-20px', marginTop: '20px' }}>
                            <h3>login</h3>
                        </div>
                    
                        <div className="loginButton google" onClick={this.google}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" height={"40px"} width={"40px"} alt="" className="icon" />
                            &nbsp; <span>Google</span>
                        </div>

                        <div className="loginButton github" onClick={this.github}>
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" height={"40px"} width={"40px"} alt="" className="icon" />
                            &nbsp; Github
                        </div>  
                        
                    </div>    
                </Modal>
            </div>
        )
    }
}
export default Header;
