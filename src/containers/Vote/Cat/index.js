import React from 'react';
import PropTypes from 'prop-types';

import { Content, Img } from './styles';

function CatComponent(props) {
  const { color, cat, onVote } = props;
  return (
    <Content style={{ backgroundColor: color }}>
      { cat ? (<Img onClick={onVote} src={cat.url} />) : null }
    </Content>
  );
}

CatComponent.propTypes = {
  color: PropTypes.string.isRequired,
  cat: PropTypes.objectOf.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default CatComponent;
