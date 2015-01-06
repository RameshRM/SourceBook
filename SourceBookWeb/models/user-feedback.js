var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var thisSchema = {
  entityId: {
    type: Schema.Types.ObjectId,
    default: function() {
      return new mongoose.Types.ObjectId;
    }
  },
  appName: String,
  pageUrl: String,
  pageId: String,
  feedbackTitle: String,
  feedback: String,
  screenShotHtml: String,
  screenShotImg: Buffer,
  browserClimate: [Schema.Types.Mixed],
  createdBy: String,
  createdDt: {
    type: Date,
    default: Date.now
  }
};

var UserFeedback = new Schema(thisSchema);


function ormGet() {
  return mongoose.model('UserFeedback', UserFeedback);
}

function ormByInput(inputArgs) {
  var model = ormGet();
  model = new model();

  for (var key in inputArgs) {
    if (inputArgs.hasOwnProperty(key) && thisSchema.hasOwnProperty(key)) {
      model[key] = inputArgs[key];
    }
  }
  return model;
}

function findAll(filter, err, success) {

  filter['feedbackTitle']={'$ne':null};
  console.log(filter);
  var feedbackOrm = ormGet();
  feedbackOrm.find(filter, function(err, feedbacks) {
    success.call(this, feedbacks);
  }).sort('-createdDt');
}

exports.UserFeedback = {
  all: function(err, success) {
    return findAll({},err, success);
  },
  allByFilter: function(filter,err, success) {
    return findAll(filter,err, success);
  },
  orm: function() {
    return ormGet();
  },

  ormByArgs: function(inputArgs) {
    return ormByInput(inputArgs);
  }
}