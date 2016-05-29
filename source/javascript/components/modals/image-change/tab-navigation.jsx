import React from 'react';
import ContentTabs from './content-tabs';
import ModalTab from '../common/tab';
import Table from '../../shared/Table';
import { defaultTabId, tabList } from './Config';

export default class TabNavigation extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    builderConfiguration: React.PropTypes.object.isRequired,
    editTarget: React.PropTypes.any.isRequired,
    onUploadImage: React.PropTypes.func.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
  };

  state = {
    activeTab: defaultTabId
  };

  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.activeTab !== this.state.activeTab) {
      return true;
    }

    return false;
  }

  render () {
    const { onSelectImage, builder, builderConfiguration, editTarget, onUploadImage } = this.props;
    const { uploadedImages } = builder;
    const { activeTab } = this.state;

    return (
      <ModalTab
        title='Select an Image'
        uploadedImagesLength={uploadedImages.length}
        nav={tabList}
        activeTab={activeTab}
        onTabClick={(id) => {
          this.setState({
            activeTab: id
          });
        }}>
        <ContentTabs
          onSelectImage={onSelectImage}
          editTarget={editTarget}
          onUploadImage={onUploadImage}
          builder={builder}
          builderConfiguration={builderConfiguration}
          activeTab={activeTab} />
      </ModalTab>
    );
  }
}
