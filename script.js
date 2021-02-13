const button = document.getElementById('button')
const audioElement = document.getElementById('audio')


// VoiceRSS Javascript SDK


//Disable the button when audio is not ended yet:
function toggleBtn() {
    button.disabled = !button.disabled
}

// function test() {
//     VoiceRSS.speech({
//         key: 'Your API key',
//         src: 'Hello world',
//         hl: 'en-us',
//         v: 'Linda',
//         r: 0,
//         c: 'mp3',
//         f: '44khz_16bit_stereo',
//         ssml: false
//     });
// }
// test()

function tellMe(joke) {
    console.log('telle me:', joke);
    const jokeString = joke.trim().replace(/ /g, '%20')
    VoiceRSS.speech({
        //http://www.voicerss.org/login.aspx
        key: '',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = ''
        //https://sv443.net/jokeapi/v2/
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
            //console.log(data.joke);
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = `${data.joke}`
        }
        //console.log(joke);
        tellMe(joke)
        toggleBtn()

    } catch (err) {
        console.log('Failed to fetch:', err);
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleBtn)