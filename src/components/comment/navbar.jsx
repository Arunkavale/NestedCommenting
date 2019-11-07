import React from 'react';
class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReplay: false,
            isEdit:false
        };
    }

    render(){
        return(<div className=" ui  right floated secondary button "  onClick={this.props.logout}>Logout</div>)
    }
}

export default Navbar;