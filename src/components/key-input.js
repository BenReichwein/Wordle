import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import 'simple-keyboard/build/css/index.css';

class KeyInput extends Component {
  render(){
    return (
      <div style={{
        marginTop: 80,
      }}>
        <Keyboard
          onKeyPress={this.props.getInput}
            layout={{
              'default': [
                'q w e r t y u i o p',
                'a s d f g h j k l',
                '< z x c v b n m [del]',
              ]
            }}
        />
      </div>
    );
  }
}

export default KeyInput;