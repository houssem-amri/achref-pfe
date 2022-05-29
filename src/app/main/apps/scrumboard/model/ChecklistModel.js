import FuseUtils from '@fuse/utils';
import _ from '@lodash';



function ChecklistModel(data )  {

  data = data || {};
  return _.defaults(data, {
    _id: FuseUtils.generateGUID(),
    name: '',
    checkItems: [],
  });
}

export default ChecklistModel;
