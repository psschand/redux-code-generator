import * as React from 'react';
import { TextAreaField } from '../components/textarea-field';
import generateActionKeys from '../code-generators/generate-action-keys';
import { InputField } from '../components/input-field';

const parseJson = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
};

export class ReduxCodeGenerator extends React.Component {
  state = {
    storePrefix: '',
    initialState: ''
  };

  handleInitialStateChange = (initialState: string) =>
    this.setState({ initialState });

  handleSetStorePrefix = (storePrefix: string) =>
    this.setState({ storePrefix });

  render() {
    const initialStateObject = parseJson(this.state.initialState);

    return (
      <div className="container">
        <div className="row">
          <h2>Redux Code Generator</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <TextAreaField
              labelText="Initial State"
              value={this.state.initialState}
              onChangeValue={this.handleInitialStateChange}
              id="initial-state"
              required={true}
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <InputField
              labelText="Store Prefix"
              value={this.state.storePrefix}
              onChangeValue={this.handleSetStorePrefix}
              id="store-prefix"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <TextAreaField
              labelText="Action Keys"
              value={
                initialStateObject
                  ? generateActionKeys(
                      initialStateObject,
                      this.state.storePrefix
                    )
                  : ''
              }
              readOnly
            />
          </div>
        </div>
      </div>
    );
  }
}
