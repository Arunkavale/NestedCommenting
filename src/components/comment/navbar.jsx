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
        return(<div className="logout">Logout</div>)
    }
}

export default Navbar;