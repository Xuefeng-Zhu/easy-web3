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
                  container: document.getElementById('aplayer'),
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
};
