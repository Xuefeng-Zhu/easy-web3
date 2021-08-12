export default (dependency) => {
  let scriptArr = [
    {
      name: 'splidejs',
      script: `(()=>{
                new Splide('#splide', {
                    type   : 'loop',
                    perPage: 3,
                    focus  : 'center',
                    pagination: false,
                    breakpoints: {
                        768: {
                            perPage: 2,
                        },
                        576:{
                            perPage:1
                        }
                    }
                }).mount();
            })();`,
    },
    {
      name: 'contactjs',
      script: `(()=>{
                const contactForm = document.querySelector("#contactForm");
                if(!contactForm) return;
                contactForm.addEventListener('submit', function (e) {
                  const isPassed = document.querySelector("#contactForm").checkValidity();
                  e.preventDefault();
                      if (!isPassed) {
                        e.preventDefault()
                        e.stopPropagation()
                      }

                      contactForm.classList.add('was-validated')
                }, false)
             })();
            `,
    },
    {
      name: 'glightbox',
      script: `(()=>{
                new GLightbox({
                    touchNavigation: true,
                    loop: true,
                    autoplayVideos: true
                })
            })()`,
    },
    {
      name: 'unlock',
      script: `(()=>{

			})()`,
    },
    {
      name: 'aplayer',
      script: `(()=>{
        fetch('https://dn1.monophonic.digital/v1/tracks/trending')
        .then(response => response.json())
        .then(({data}) => {
          console.log(data)
          new APlayer({
            container: document.getElementById('aplayer'),
            audio: data.map(track => ({
              name: track.title,
              artist: track.user.name,
              url: 'https://creatornode2.audius.co/tracks/stream/' + track.id,
              cover: track.artwork['150x150']
            }))
          });
        });

			})()`,
    },
  ];

  const dep = scriptArr.filter((e) => e.name === dependency);
  return dep ? dep[0].script : '';
};
