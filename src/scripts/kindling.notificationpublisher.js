kindling.module(function () {
  'use strict';

  function publishNotification(e, options, username, message) {
    if (!options || !username || !message || options.notifications !== 'true') {
      return;
    }

    var $message = $(message);
    if (message.id.indexOf('message_') !== -1 && message.id.indexOf('message_pending') === -1 && !($message.is('.advertisement_message,.enter_message,.leave_message,.kick_message,.timestamp_message,.you'))) {
      var $body, $author = $message.find('.author:first');
      if ($message.hasClass('topic_change_message') || $message.hasClass('lock_message') || $message.hasClass('unlock_message')) {
        $body = $message.find('.body:first');
      } else {
        $body = $message.find('code:first');
        if ($body.length === 0) {
          $body = $message.find('div.body:first');
        }
      }

      if (options.filterNotifications === 'true') {
        var regex = kindling.getKeywordsRegex(options.filterKeywords, username);
        if (!regex.test($body.text())) {
          return;
        }
      }

      chrome.runtime.sendMessage({
        type: 'notification',
        value: {
          id: message.id,
          username: username,
          room: $('#room_name').text(),
          author: $author.text() || $author.data('short-name'),
          avatar: $author.data('avatar') || chrome.extension.getURL('img/avatar.png'),
          message: $body.text()
        }
      });
    }
  }

  return {
    init: function () {
      $.subscribe('newMessage', publishNotification);
    }
  };
}());
