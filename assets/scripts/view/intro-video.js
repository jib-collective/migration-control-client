import _ from 'underscore';
import Backbone from 'backbone';
import i18n from 'lib/i18n';
import videojs from 'video.js';
import vimeo from 'videojs-youtube';

export default Backbone.View.extend({
  className: 'intro-video',

  initialize(options) {
    this.options = options;
    this.player = '';
    return this;
  },

  events: {
    'click .intro-video__skip': 'destroy',
  },

  destroy(event) {
    if (event) {
      event.preventDefault();
    }

    if (this.player) {
      this.player.dispose();
    }

    this.remove();
  },

  render() {
    this.$el.html(this.template({
      i18n,
    }));

    const options =  {
      autoplay: true,
      controls: false,
      muted: true,
      sources: [
        {
          type: 'video/youtube',
          src: 'https://www.youtube.com/watch?v=9uH2MNuq2SY?modestbranding=1&&title=&controls=0&hd=1'
        }
      ],
      techOrder: [
        'youtube',
      ],
    };

    this.player = videojs(this.$el.children('video').get(0), options);
    this.player.on('ended', () => this.destroy());

    return this;
  },

  template: _.template(`
    <video class="video-js"></video>
    <button class="intro-video__skip">
      <%= i18n('Skip Video') %>
    </button>
  `),
});