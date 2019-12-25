AFRAME.registerComponent('settingui', {
init:function (){

  var crossSection=
    {
    value:1,
    }

const gui = new dat.GUI({name:"Virtual Dublin"});

gui.add(crossSection,'value',-50,200);
var obj = { add:function(){ console.log("clicked") }};

gui.add(obj,'add').name('Custom Label');
}
}
)
