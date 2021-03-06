import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

export default class ChangeTripImageButton extends Component {
  static propTypes = {
    trip: PropTypes.object,
    isOwner: PropTypes.bool.isRequired,
    onImageSelect: PropTypes.func.isRequired,
    isImageUploadInProgress: PropTypes.bool.isRequired,
  };

  onFileSelect = e => {
    const file = e.currentTarget.files[0];
    if (file) this.props.onImageSelect(file);
  };

  render() {
    const { trip, isOwner, isImageUploadInProgress } = this.props;
    if (!trip || !isOwner) return null;
    return (
      <div>
        <input
          type="file"
          id="change-trip-image-btn-input"
          name="files"
          accept=".jpg, .jpeg, .png"
          hidden
          onChange={this.onFileSelect}
        />
        <Button
          icon
          labelPosition="left"
          as="label"
          htmlFor="change-trip-image-btn-input"
          loading={isImageUploadInProgress}
          disabled={isImageUploadInProgress}
        >
          <Icon name="camera" />
          Change Image
        </Button>
      </div>
    );
  }
}
