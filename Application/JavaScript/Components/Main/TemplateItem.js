import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { proccessTemplateSelection } from '../../Actions/ActionCreators';
import ImageItem from '../Shared/ImageItem';

class TemplateItem extends Component {
  static propTypes = {
    templateInformation: PropTypes.object.isRequired
  }

  static defaultProps  = {
    templateInformation: {}
  }

  selectTemplate (e) {
    const { onTemplateSelection, templateInformation } = this.props;
    const { id } = templateInformation;

    return onTemplateSelection(id);
  }

  render () {
    const { templateInformation, dispatch } = this.props;
    const { id, thumbnail} = templateInformation;

    if (!templateInformation) {
      throw Error('Template information is invalid. Please check builder configuration file.');
    } else if (!id) {
      throw Error('Template id is missing. Please check builder configuration file.');
    } else if (!thumbnail) {
      throw Error('Template thumbnail is missing. Please check builder configuration file.');
    }

    return (
      <li
        className='ab-templateitem'
        onClick={::this.selectTemplate}>
        <figure className='ab-templateitem__figure'>
          <ImageItem src={thumbnail} alt={id} />
          <figcaption>
            <h2>{id}</h2>
          </figcaption>
        </figure>
      </li>
    )
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    onTemplateSelection: (templateName) => {
      dispatch(proccessTemplateSelection(templateName));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateItem);
