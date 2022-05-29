const mongoose = require("mongoose");

const BoardsSchema = mongoose.Schema({
  super_user_id: String,
  name: String,
  uri: String,
  settings: {
    color: String,
    subscribed: Boolean,
    cardCoverImages: Boolean,
  },
  lists: [
    {
      name: String,
      idCards: [],
    },
  ],
  cards: [
    {
      name: String,
      description: String,
      idAttachmentCover: String,
      idMembers: [],
      idLabels: [],
      attachments: [],
      subscribed: Boolean,
      checklists: [
        {
          _id:String,
          name: "",
          checkItems: [
            {
              _id:String,
              name: "",
              checked: Boolean,
              dateFinsh:Date,
              dateCreated:Date,
              
            },
          ],
        },
      ],
      checkItems: 0,
      checkItemsChecked: 0,
      comments: [],
      activities: [],
      due: Number,
      dateCreated:Date
    },
  ],
  members: [{ _id: String, name: String, avatar: String }],

  labels: [
    {
      id: String,
      name: String,
      class: String,
    },
  ],
  dateCreated:{type:Date}

});

const Boards = mongoose.model("Boards", BoardsSchema);
module.exports = Boards;
