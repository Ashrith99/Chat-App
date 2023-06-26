

let socket = io();
socket.on('connect', () => {
    console.log("connection established");
})

socket.on('disconnect', () => {
    console.log("disconnected");
})
//----------------------------------------------------------


socket.on('newmessage', message => {

    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template);

    document.querySelector('body').append(html);


    // console.log("newmessage", message);
                                           // const ft= moment(message.createdAt).format('LT');
    // let li = document.createElement('li');
    // li.innerText = `${message.from} ${message.createdAt}: ${message.text}`;

    // document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage', message => {
    console.log("newLocationMessage", message);

    let li = document.createElement('li');
    let a=document.createElement('a');
    a.setAttribute('target','_blank');
    a.setAttribute('href',message.url);
    a.innerText='My current Location';
    li.appendChild(a);
    
    document.querySelector('body').appendChild(li);
});





//creating an event to prevent defaut refreshing of page on submit

document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let texts = document.getElementById('iptxt').value;
    socket.emit('createmessage', {
        from: "user",
        text: document.querySelector('input[name="message"]').value
        //text: texts(my method)

    }, () => {

    })
})

document.querySelector('#send-location').addEventListener('click', (e) => {
    e.preventDefault();
    if(!navigator.geolocation){
        return alert("geolocation is not supportted by your browser");
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('createLocationMessage',{
            lat: position.coords.latitude,
            lon: position.coords.longitude
        },()=>{
            alert("unable to fetch your location");
        })
    })
});
