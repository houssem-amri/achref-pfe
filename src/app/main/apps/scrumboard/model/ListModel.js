import _ from '@lodash';
import { string } from 'prop-types';

function ListModel(data) {
  data = data || {};

  return _.defaults(data, {
    _id: string,
    name: '',
    idCards: [],
  });
}

export default ListModel;
