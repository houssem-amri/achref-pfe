var express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

const Boards = require("../models/Boards");
const Users = require("../models/user");

// get All Boards Etape 1
router.get("/scrumboard-app/boards/:id", (req, res) => {

  Boards.find({ super_user_id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      var data = [];
      for (let i = 0; i < findedObject.length; i++) {
        let board = {
          id: findedObject[i]._id,
          name: findedObject[i].name,
          uri: findedObject[i].uri,
        };
        data.push(board);
      }
      res.status(200).json({
        board: data,
      });
    }
  });
});
router.get("/scrumboard-app-Boards-all/:id", (req, res) => {

  Boards.find({ super_user_id: req.params.id }).then((findedObject) => {
    if (findedObject) {
     
      res.status(200).json({
        board: findedObject,
      });
    }
  });
});
// post new board etape 2
router.post("/scrumboard-app/board/new", (req, res) => {
  console.log("here req.body", req.body.board._id);
  Users.find().then((users) => {
    if (req.body.board._id) {
      const boards = new Boards({
        super_user_id: req.body.board.super_user_id,
        name: req.body.board.name,
        uri: req.body.board.uri,
        settings: {
          color: req.body.board.settings.color,
          subscribed: req.body.board.settings.subscribed,
          cardCoverImages: req.body.board.settings.cardCoverImages,
        },
        lists: req.body.board.lists,
        cards: req.body.board.cards,
        members: users,
        labels: req.body.board.labels,
        dateCreated: Date.now(),

      });
      boards.save().then(
        res.status(200).json({
          boards: boards,
        })
      );
    } else {
      const boards = new Boards({
        super_user_id: req.body.board.super_user_id,
        name: req.body.board.name,
        uri: req.body.board.uri,
        settings: {
          color: req.body.board.settings.color,
          subscribed: req.body.board.settings.subscribed,
          cardCoverImages: req.body.board.settings.cardCoverImages,
        },
        lists: [],
        cards: [],
        members: users,
        labels: req.body.board.labels,
        dateCreated: Date.now(),

      });
      boards.save().then(
        res.status(200).json({
          boards: boards,
        })
      );
    }
  });
});

// get Board by Id etape 3
router.get("/scrumboard-app/board", (req, res) => {
  Boards.findOne({ _id: req.query.boardId }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        board: findedObject,
      });
    }
  });
});

/* update board title . */
router.post("/scrumboard-app/board/rename", (req, res) => {
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
   
      const boards = new Boards({
        _id: req.body.boardId,
        name: req.body.boardTitle,
        uri: req.body.boardTitle,
        settings: {
          color: findedObject.settings.color,
          subscribed: findedObject.settings.subscribed,
          cardCoverImages: findedObject.settings.cardCoverImages,
        },
        lists:findedObject.lists,
        cards: findedObject.cards,
        members: findedObject.members,
        labels: findedObject.labels,
      });
      Boards.updateOne({ _id: req.body.boardId }, boards).then((result) => {
        if (result) {
          res.status(200).json({
            boards: boards.name,
          });
        }
      });
    }
  });
});
// post new list
router.post("/scrumboard-app/list/new", (req, res) => {
  // console.log("here req.body", req.body);
  const list = {
    name: req.body.data.name,
    idCards: req.body.data.idCards,
  };
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      findedObject.lists.push(list);
      findedObject.save().then(
        res.status(200).json({
          boards: findedObject.lists,
        })
      );
    }
  });
});

// ordred lists (dragable)
router.post("/scrumboard-app/list/order", (req, res) => {
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      findedObject.lists = req.body.lists;
      findedObject.save().then(
        res.status(200).json({
          boards: findedObject.lists,
        })
      );
    }
  });
});

// new card
router.post("/scrumboard-app/card/new", (req, res) => {
  const card = {
    _id: ObjectId(),
    name: req.body.data.name,
    description: req.body.data.description,
    idAttachmentCover: req.body.data.idAttachmentCover,
    idMembers: req.body.data.idMembers,
    idLabels: req.body.data.idLabels,
    attachments: req.body.data.attachments,
    subscribed: req.body.data.subscribed,
    checklists: req.body.data.checklists,
    checkItems: req.body.data.checkItems,
    checkItemsChecked: req.body.data.checkItemsChecked,
    comments: req.body.data.comments,
    activities: req.body.data.activities,
    due: req.body.data.due,
    dateCreated: Date.now(),

  };
  console.log("card", card);
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      for (let i = 0; i < findedObject.lists.length; i++) {
        if (
          JSON.stringify(findedObject.lists[i]._id) ===
          JSON.stringify(req.body.listId)
        ) {
          findedObject.lists[i].idCards.push(card._id);
          findedObject.cards.push(card);
          findedObject.save();
          res.status(200).json({
            boards: findedObject,
          });
        }
      }
    }
  });
});
//card order
router.post("/scrumboard-app/card/order", (req, res) => {
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      findedObject.lists = req.body.lists;
      findedObject.save().then(
        res.status(200).json({
          boards: findedObject.lists,
        })
      );
    }
  });
});

// rename list
router.post("/scrumboard-app/list/rename", (req, res) => {
  console.log("here req .body", req.body);
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      for (let i = 0; i < findedObject.lists.length; i++) {
        if (
          JSON.stringify(findedObject.lists[i]._id) ===
          JSON.stringify(req.body.listId)
        ) {
          findedObject.lists[i].name = req.body.listTitle;
          findedObject.save().then(
            res.status(200).json({
              boards: {
                listId: req.body.listId,
                listTitle: req.body.listTitle,
              },
            })
          );
        }
      }
    }
  });
});

//delete Board
router.post("/scrumboard-app/board/delete", (req, res) => {
  Boards.deleteOne({ _id: req.body.boardId }).then(
    res.status(200).json({
      boards: true,
    })
  );
});

//delete List
router.post("/scrumboard-app/list/remove", (req, res) => {
  console.log(req.body);

  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      for (let i = 0; i < findedObject.lists.length; i++) {
        if (
          JSON.stringify(findedObject.lists[i]._id) ===
          JSON.stringify(req.body.listId)
        ) {
          findedObject.lists.splice(i, 1);
          findedObject.save().then(
            res.status(200).json({
              boards: req.body.listId,
            })
          );
        }
      }
    }
  });
});

//delete Card
router.post("/scrumboard-app/card/remove", (req, res) => {
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      for (let i = 0; i < findedObject.cards.length; i++) {
        if (
          JSON.stringify(findedObject.cards[i]._id) ===
          JSON.stringify(req.body.cardId)
        ) {
          findedObject.cards.splice(i, 1);
        }
      }
      for (let j = 0; j < findedObject.lists.length; j++) {
        findedObject.lists[j].idCards.forEach((element, d) => {
          if (JSON.stringify(element) === JSON.stringify(req.body.cardId)) {
            findedObject.lists[j].idCards.splice(d, 1);
            findedObject.save().then(
              res.status(200).json({
                boards: req.body.cardId,
              })
            );
          }
        });
      }
    }
  });
});

//update Card
router.post("/scrumboard-app/card/update", (req, res) => {
  Boards.findOne({ _id: req.body.boardId }).then((findedObject) => {
    if (findedObject) {
      for (let i = 0; i < findedObject.cards.length; i++) {
        if (
          JSON.stringify(findedObject.cards[i]._id) ===
          JSON.stringify(req.body.card._id)
        ) {
          findedObject.cards[i] = req.body.card;
          findedObject.save();
          res.status(200).json({
            boards: findedObject.cards[i],
          });
        }
      }
    }
  });
});



module.exports = router;
