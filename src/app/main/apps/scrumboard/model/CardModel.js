import _ from '@lodash';
import { string } from 'prop-types';

function CardModel(data) {
  data = data || {};

  return _.defaults(data, {
    _id: string,
    name: '',
    description: '',
    idAttachmentCover: '',
    idMembers: [],
    idLabels: [],
    attachments: [],
    subscribed: true,
    checklists: [],
    checkItems: 0,
    checkItemsChecked: 0,
    comments: [],
    activities: [],
    due: '',
  });
}
export default CardModel;
