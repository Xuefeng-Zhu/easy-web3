export default (editor) => {
  const domc = editor.DomComponents;

  domc.addType('unlock', {
    model: {
      defaults: {
        network: '4',
        lock: '0x11388bc2E1A958c679a923a6139943228B0F861b',
        traits: [
          {
            changeProp: 1,
            type: 'text',
            name: 'network',
          },
          {
            changeProp: 1,
            type: 'text',
            name: 'lock',
          },
        ],
        script() {
          window.unlockProtocolConfig = {
            network: '{[ network ]}',
            locks: {
              '{[ lock ]}': {
                name: 'Unlock Members',
              },
            },
            icon: 'https://unlock-protocol.com/static/images/svg/unlock-word-mark.svg',
            callToAction: {
              default: 'Please unlock to see content!',
            },
          };
        },
      },
      init() {
        this.on('change:network change:lock', () =>
          this.trigger('change:script')
        );
      },
    },
    isComponent(el) {
      return el.id == 'unlock';
    },
  });

  domc.addType('audius', {
    model: {
      defaults: {
        trackUrl: 'https://dn1.monophonic.digital/v1/tracks/trending',
        traits: [
          {
            changeProp: 1,
            type: 'text',
            name: 'trackUrl',
          },
        ],
        script() {
          const init = () => {
            fetch('{[ trackUrl ]}')
              .then((response) => response.json())
              .then(({ data }) => {
                new APlayer({
                  container: this.querySelector('.aplayer'),
                  audio: data.map((track) => ({
                    name: track.title,
                    artist: track.user.name,
                    url:
                      'https://creatornode2.audius.co/tracks/stream/' +
                      track.id,
                    cover: track.artwork['150x150'],
                  })),
                });
              });
          };

          setTimeout(() => {
            if (!window.APlayer) {
              const script = document.querySelector(
                'script[src="https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"]'
              );
              script.onload = init;
            } else {
              init();
            }
          }, 10);
        },
      },
      init() {
        this.on('change:trackUrl', () => this.trigger('change:script'));
      },
    },
    isComponent(el) {
      return el.id == 'audius';
    },
  });

  domc.addType('livepeer', {
    model: {
      defaults: {
        playbackId: 'f73dc5k6peh7y1dk',
        traits: [
          {
            changeProp: 1,
            type: 'text',
            name: 'playbackId',
          },
        ],
        script() {
          const init = () => {
            const player = new videojs('livepeer-video', {
              autoplay: true,
              controls: true,
              sources: [
                {
                  src: `https://cdn.livepeer.com/hls/{[ playbackId ]}/index.m3u8`,
                },
              ],
            });
          };

          setTimeout(() => {
            if (!window.videojs) {
              const script = document.querySelector(
                'script[src="https://vjs.zencdn.net/7.14.3/video.min.js"]'
              );
              script.onload = init;
            } else {
              init();
            }
          }, 10);
        },
      },
      init() {
        this.on('change:playbackId', () => this.trigger('change:script'));
      },
    },
    isComponent(el) {
      return el.id == 'livepeer';
    },
  });

  domc.addType('zora', {
    model: {
      defaults: {
        zoraId: '3366',
        traits: [
          {
            changeProp: 1,
            type: 'text',
            name: 'zoraId',
          },
        ],
        script() {
          const init = () => {
            const zoraComp = this.querySelector('.zora-component');
            ReactDom.render(
              React.createElement(NFTPreview, { id: `{[ zoraId ]}` }),
              zoraComp
            );
          };

          setTimeout(() => {
            if (!window.NFTPreview) {
              const script = document.querySelector(
                'script[src="https://bafybeie3isp3mnjqzgwpcgcs5y37r6d74qcrdsvncexilmprxpvoyyvon4.ipfs.dweb.link/index.js"]'
              );
              script.onload = init;
            } else {
              init();
            }
          }, 10);
        },
      },
      init() {
        this.on('change:zoraId', () => this.trigger('change:script'));
      },
    },
    isComponent(el) {
      return el.id == 'zora';
    },
  });
};
