import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';
import proccessChildren from '../../Common/ProccessChildren';
import renderProccessedChildren from '../../Common/RenderProccessedChildren';
import BackButton from '../Shared/BackButton';
import Scrollbar from '../Shared/Scrollbar';

class Tab extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    tabs: React.PropTypes.array.isRequired,
    onCloseTab: React.PropTypes.func.isRequired
  };

  state = {
    currentTabID: null,
    currentTab: null
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.builder.currentTab === this.state.currentTabID ? false : true;
  }

  componentWillMount () {
    this.initializeState(this.props);
  }

  componentWillReceiveProps (nextProps) {
    this.initializeState(nextProps);
  }

  initializeState (props) {
    const { builder, tabs } = props;
    const { currentTab: currentTabID } = builder;
    const splitCurrentTab = _.words(currentTabID, /[^.]+/g);
    const splitSize = _.size(splitCurrentTab);
    let currentTab = null;

    if (splitSize === 1) {
      currentTab = _.find(tabs, {
        'id': currentTabID
      });
    } else {
      currentTab = _.find(tabs, {
        'id': splitCurrentTab[splitSize - 1]
      });
    }

    if (_.isObject(currentTab)) {
      this.setState({
        currentTabID: currentTabID,
        currentTab: currentTab
      });
    } else {
      throw Error('Tab is not object.');
    }
  }

  closeTab () {
    return this.props.onCloseTab();
  }

  renderBackButton () {
    const { currentTab } = this.state;

    if (currentTab.id !== 'initial') {
      return (
        <div>
          <BackButton onClick={::this.closeTab} />
          { this.renderTitle(currentTab) }
        </div>
      );
    }

    return null;
  }

  renderTitle (currentTab) {
    if (_.has(currentTab, 'title')) {
      if (_.has(currentTab, 'subtitle')) {
        return (
          <h1 className='ab-sidetab__title'>
            <span>{currentTab.title}</span>
            <span>{currentTab.subtitle}</span>
          </h1>
        );
      } else {
        return <h1 className='ab-sidetab__title'>{currentTab.title}</h1>;
      }
    }

    return null;
  }

  renderContent () {
    const { currentTab } = this.state;
    const { content } = currentTab;

    if (content) {
      return _.map(proccessChildren(content), (child) => {
        return renderProccessedChildren(child);
      });
    }

    return null;
  }

  render () {
    return (
      <div className='ab-tab'>
        <Scrollbar aside innerPadding>
          { this.renderBackButton() }
          { this.renderContent() }
        </Scrollbar>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    builder: state.builder
  };
}

export default connect(mapStateToProps)(Tab);
