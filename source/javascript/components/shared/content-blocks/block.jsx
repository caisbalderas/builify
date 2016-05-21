import React from 'react';
import classNames from '../../../common/classnames';
import ImageItem from '../ImageItem';

export default class ContentBlock extends React.Component {
  static propTypes = {
    builder: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate () {
    return true;
  }

  selectContentBlock () {
    return this.props.onClick(this.props.data);
  }

  dragContentBlock (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  render () {
    const { builder, data } = this.props;
    const { name, thumbnail, blockType } = data;
    const { filterContentBlocksTarget } = builder;
    let blockClassName = classNames('contentblocks__block');

    if (filterContentBlocksTarget !== 'all') {
      if (blockType !== filterContentBlocksTarget) {
        blockClassName = classNames('contentblocks__block', 'hide');
      }
    }

    return (
      <figure className={blockClassName} data-blocktype={blockType} onClick={::this.selectContentBlock}>
        <ImageItem src={thumbnail} alt={name}/>
        <figcaption>
          <span>{name}</span>
        </figcaption>
      </figure>
    );
  }
}
