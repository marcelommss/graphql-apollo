const axios = require('axios');

const execute = async function (data) {
  try{
    // const postResponse = await axios.post('http://localhost:4001/graphql', data);
    
    axios({
      url: 'http://localhost:4001',
      method: 'post',
      data        
    }).then((response) => {
      const result  = response.data;
      console.log(JSON.stringify(result, undefined , ' '));
    }).catch ((e) => {
      console.log(e.response.data);
    });
  }catch (e) {
    console.log(e.response.data);
  }
};

(async function () {
  await execute({
    query: `
          mutation {
            createChannel(name: "Rocketseat") {
              name
            }
          }
        `
  });
  await execute({
    query: `
          mutation {
            createChannel(name: "Marcelo Mattos") {
              idChannel
              name
            }
          }
        `
  });
  await execute({
    query: `
      mutation($music: MusicInput) {
        saveMusic(music: $music) {
          idMusic
          title
          author
        }
      }
    `,
    variables: {
      music: {
         title: 'Winds of Change',
         author: 'Scorpions'
      }
    }
  });
  await execute({
    query: `
          query {
            channels(idChannel: 1) {
              idChannel
              name
              playlists {
                description
              }
            }
          }
        `
  });
  await execute({
    query: `
          query {
            musics {
              idMusic
              title
              author
            }
          }
        `
  });
})();