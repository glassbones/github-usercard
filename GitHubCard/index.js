/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

  Skip to STEP 3.

  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

function myFunction(name){
  load(name);
  load(friends);

  // user is a String ? 1 request to axios. request() // line35
  // user is not a String ? user.length requests to axios. request() // line:35
  function load(user){ 
    if (typeof(user) === `string`) { request(`https://api.github.com/users/${user}`) }
    else {user.map(el => request(`https://api.github.com/users/${el}`))}
  };

  // takes in a url and outputs a data object to the build() //  line:44
  function request(someone){
    axios.get(someone)
    .then(response => {build(response)})
    .catch(error => console.log(`${error}`))
    .finally(() => console.log('done'));
  }
  // this is really ugly.. I should have filtered the dataObject or made new objects with the properties I wanted
  // feeding arguments to makeElement() // line:62
  function build(data){
    //this is the destination on the DOM for all the elements
    let entryPoint = document.querySelector(`.cards`); 

    let card =     makeEl(entryPoint,'div', 'card');
    /*pic*/        makeEl(card,'img','none', data.data.avatar_url);
    let info =     makeEl(card,'div','card-info');
    /*name*/       makeEl(info,'h3','name',data.data.name);
    /*Account*/    makeEl(info,'p','username',data.data.login);
    /*Location*/   makeEl(info,'p','none',`Location: ${data.data.location}`);
    let profil =   makeEl(info,'p','none', 'Profile: ');
    /*profileUrl*/ makeEl(profil,'a','none', data.data.html_url);
    /*followers*/  makeEl(info,'p','none', `Followers: ${data.data.followers}`);
    /*following*/  makeEl(info,'p','none',`Following: ${data.data.following}`);
    /*bio*/        makeEl(info,'p','none', `Bio: ${data.data.bio}`);
  };
  //this is just a logic gate that builds elements depending on 4 parameters
  //parent = target to append from. tag = htmlTag. className = html class. text = innerText on <p> elements but also href on <a> elements and src on <img>s
  function makeEl(parent, tag, className, text){
    let el = document.createElement(`${tag}`);
    if (`${text}` === 'null') text = "😳";
    if (className && className != `none`) el.classList.add(`${className}`);
    if (text && text != `none`) el.innerHTML = text;
    if (el.tagName == 'IMG'){ el.innerHTML = ""; el.src = text;}
    if (el.tagName == 'A') el.href = text;
    if (parent) parent.appendChild(el)
    return el; 
  }
}
// usernames to be loaded
let myHTTP = `glassbones`;
let friends = [`tetondan`, `dustinmyers`, `justsml`, `luishrd`, `bigknell`];
// call function
myFunction(myHTTP);

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

// <div class="card">
// <div class="card-info">
// <img src={image url of user} />
/////// <h3 class="name"> .innerHTML - ${data.data.name}
// <p class="username"> .innerHTML = ${data.data.login}
/////// <p> .innerHTML = `Location: ${data.data.location}     <- if null 'none'
// <p> .innnerHTML = `Profile: `
// <a> .href = `url`.innerHTML = `url`
/////// <p> .innerHTML = `Followers: ${data.data.followers}` <- this is an int
/////// <p> .innerHTML = `Following: ${data.data.following}` <- this is an int
/////// <p> .innerHTML = `Bio: ${data.data.bio}`

