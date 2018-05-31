window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}
window.$ = window.jQuery

window.jQuery.ajax = function ({url , method , body , headers}) {
    return new Promise((resolve , reject)=>{
        let request = new XMLHttpRequest();
        request.open(method , url);
        for (let key in headers){
            request.setRequestHeader(key , headers[key]);
        }
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
                if(request.status >= 200 && request.status < 300){
                    resolve.call(undefined , request.responseText);
                }
                else if(request.status >= 400){
                    reject.call(undefined , request);
                }
            }
        }
        request.send(body);
    })
}

button.addEventListener('click',()=>{
    $.ajax({
        url: '/ajax',
        method: 'get',
        headers: {
            'content-type':'application/x-www-form-urlencoded',
            'hht': '18'
        }
    }).then(
        (text)=>{
        console.log(text);
    },
        (request)=>{
        console.log(request);
    }
    )
})