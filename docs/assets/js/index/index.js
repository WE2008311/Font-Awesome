$(function() {
  // start the icon carousel
  $('#iconCarousel').carousel({
    interval: 5000
  });

  // make code pretty
  window.prettyPrint && prettyPrint();

  // inject twitter & github counts
  $.ajax({
    url: 'http://api.twitter.com/1/users/show.json',
    data: {screen_name: 'fortaweso_me'},
    dataType: 'jsonp',
    success: function(data) {
      $('#followers').html(data.followers_count);
    }
  });
  $.ajax({
    url: 'http://github.com/api/v2/json/repos/show/FortAwesome/Font-Awesome',
    dataType: 'jsonp',
    success: function(data) {
      $('#watchers').html(data.repository.watchers);
      $('#forks').html(data.repository.forks);
    }
  });





  var firstInHistory = true;

  var MainView = Backbone.View.extend({
    el: $("div.container"),

    modalTemplate: _.template($("#modal-template").html()),

    events:{
      "click ul.the-icons > li": "iconClicked"
    },

    iconClicked: function(event) {
      event.preventDefault();

      var $item = $(event.currentTarget);
      var $iconName = $item.find("i").attr("class");

      mainRouter.navigate("icon/" + $iconName, {trigger: true});
      firstInHistory = false;
    }
  });


  var MainRouter = Backbone.Router.extend({
    routes: {
      "icon/:iconName": "showIcon"
    },

    showIcon: function(iconName) {
      var $modal = $(mainView.modalTemplate({"iconName": iconName}));

      $modal.modal("show");
      $modal.on('hidden', function () {
        $modal.remove();
        if (firstInHistory) {
          mainRouter.navigate("/", {trigger: false});
          firstInHistory = false;
        } else {
          window.history.back();
        }
      })
    }
  });

  var mainView = new MainView();
  var mainRouter = new MainRouter();
  Backbone.history.start({pushState : false});
});
