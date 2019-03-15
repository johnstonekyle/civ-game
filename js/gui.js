function generateButtons() {
    //generate the build buttons
    for(var i in placeholderList){
        var ph = placeholderList[i];
        var button = '';
        var upperName = ph.name.charAt(0).toUpperCase() + ph.name.slice(1);
        button += '<a class="dropdown-item"';
        button += 'onclick="buy(\''+i+'\');"';
        button += 'href="#">Build '+upperName+'</a>';

        document.getElementById('build').innerHTML += button;
    }
}
