import FuseUtils from '@fuse/utils';
import _ from '@lodash';

function ChecklistItemModel(data) {
  data = data || {};
  return _.defaults(data, {
    _id: FuseUtils.generateGUID(),
    dateCreated:Date.now(),
    name: '',
    checked: false,
    dateFinsh:""
  });
}

export default ChecklistItemModel;
