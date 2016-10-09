module.exports = {
  text: {
    object: 'page',
    entry: [{
      id: '287450068290952',
      time: 1476025475225,
      messaging: [{
        sender: {
          id: '1114769218609918'
        },
        recipient: {
          id: '287450068290952'
        },
        timestamp: 1476025475187,
        message: {
          mid: 'mid.1476025475187:ae39965d61',
          seq: 199,
          text: 'hello'
        }
      }]
    }]
  },
  echo: {
    object: 'page',
    entry: [{
      id: '287450068290952',
      time: 1476025475383,
      messaging: [{
        sender: {
          id: '287450068290952'
        },
        recipient: {
          id: '1114769218609918'
        },
        timestamp: 1476025475371,
        message: {
          'is_echo': true,
          'app_id': 944869238956661,
          mid: 'mid.1476025475371:7ee217d963',
          seq: 200,
          text: 'are you done?'
        }
      }]
    }]
  },
  fuckText: {
    object: 'page',
    entry: [{
      id: '287450068290952',
      time: 1476025475225,
      messaging: [{
        sender: {
          id: '1114769218609918'
        },
        recipient: {
          id: '287450068290952'
        },
        timestamp: 1476025475187,
        message: {
          mid: 'mid.1476025475187:ae39965d61',
          seq: 199,
          text: 'fuck'
        }
      }]
    }]
  },
  deliveryNotice: {
    object: 'page',
    entry: [{
      id: '287450068290952',
      time: 1476025475692,
      messaging: [{
        sender: {
          id: '1114769218609918'
        },
        recipient: {
          id: '287450068290952'
        },
        timestamp: 0,
        delivery: {
          mids: ['mid.1476025475371:7ee217d963'],
          watermark: 1476025475371,
          seq: 201
        }
      }]
    }]
  },
  readNotice: {
    object: 'page',
    entry: [{
      id: '287450068290952',
      time: 1476025475875,
      messaging: [{
          sender: {
            id: '1114769218609918'
          },
          recipient: {
            id: '287450068290952'
          },
          timestamp: 1476025475732,
          read: {
            watermark: 1476025475371,
            seq: 202
          }
        }
      ]
    }]
  }
};
