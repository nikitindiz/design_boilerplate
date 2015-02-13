(function($) {
  $(document).ready(function() {
    $(this).on('click','a.show-demands', function() {
      $(this).toggleClass('active');
      $('.demands-text').slideToggle();
      return false;
    });
    $(this).on('click','#paypal_btn', function() {
      dataLayer.push({
        'event': 'paypal_clicked'
      });
    });
  });
}(jQuery));

var base_url = window.location.origin;
var imgUrl = 'http://vesna.today/img/vesna.png';

new Ya.share({
  element: 'ya_share',
  theme: 'counter',
  image: imgUrl,
  link: base_url,
  title: 'Антикризисный марш «Весна»',
  description: 'Основные требования марша поддерживают более 80% россиян!',
  elementStyle: {
        'type': 'button',
        'border': true,
        'quickServices': ['vkontakte', 'facebook', 'twitter', 'odnoklassniki', 'moimir', 'gplus']
  },
  serviceSpecific: {
    twitter: {
      title: '1 марта я иду на Антикризисный марш «Весна» и приглашаю всех друзей http://t.co/XyzZ2hwynT',
      description: ''
    }
  },
  onshare: function(social_network) {
    dataLayer.push({
      'social_network': social_network,
      'event': 'share'
    });
  }
});
