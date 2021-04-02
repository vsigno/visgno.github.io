AFRAME.registerComponent('mqttreader', {

  init:function (){
  		console.log('MQTT Reader');

      let sceneEl = document.querySelector('a-scene');
      var box = document.createElement('a-box');
      box.setAttribute('material', 'color', 'red');
      box.setAttribute('position', {x: 1, y: 0, z: -50});
      sceneEl.appendChild(box);


      var mqtt;
      var reconnectedTimeout=5000;
      //var hostname="mqttserver.ddns.net"; //Wind
      //var hostname="10.129.100.22";
      
      var hostname="mqtt.celab"
      
      //var hostname="uk/ac/ucl/casa/sonoffpowr2/caffeine/"
      var port=9001;
    
      
      var deviceList=[];
      var val=0;
      

      function onConnect()
      {
        console.log("Connected...");
        //mqtt.subscribe("uk/ac/ucl/casa/sonoffpowr2/son-caffeine/A4CF12B82143/data");
        //mqtt.subscribe("uk/ac/ucl/casa/sonoffpowr2/son-cloud/#");
        mqtt.subscribe("uk/ac/ucl/casa/sonoffpowr2/#");
        
        //mqtt.subscribe("downhamweather/windSpeed_mph"); //wind
        
      }

      function MQTTconnect()
      {
        console.log("Connected to "+hostname+": "+ port);

        //works but in ws not wss
        mqtt=new Paho.MQTT.Client(hostname,port,"clientjs");

         //MQTT CE LAB
            // mqtt = new Paho.MQTT.Client("ws://10.0.1.15:9001/", "clientid");
        //mqtt = new Paho.MQTT.Client("wss://10.0.1.167:9001/test", "clientid");

        var options={
          timeout:3,
          onSuccess:onConnect,
          onFailure:onFailure,
          useSSL:false //probably just this option is needed to activate wss

        };


        mqtt.onMessageArrived=onMessageArrived;

        mqtt.connect(options);
      }

      function onFailure(message)
      {
      console.log("Connection to "+hostname+" failed");
      setTimeout(MQTTconnect,reconnectedTimeout);
      }


      function onMessageArrived(msg)
      {
        
        var shortdev= msg.destinationName.substring(27,msg.destinationName.indexOf('/',27));
        console.log(deviceList.includes(shortdev));
                
        if(deviceList.includes(shortdev)==false)
        {
          console.log("not here "+shortdev);
          deviceList.push(shortdev);
          
          val=val+5;
          var boxInst = document.createElement('a-box');
          boxInst.setAttribute('id',shortdev);
          boxInst.setAttribute('material', 'color', '#fff');
          boxInst.object3D.position.set(1+val,0,-50);
          sceneEl.appendChild(boxInst);
          
          
          
          
        }
        
        out_msg="msg is "+msg.destinationName+"  --  "+msg.payloadString+"<br>";
      //  console.log(out_msg);
        
        var jObj=JSON.parse(msg.payloadString);
        
        console.log(jObj.current);
        
        var value=parseFloat(jObj.power);

        var boxToChange=sceneEl.querySelector('#'+shortdev);
        console.log(boxToChange);
        
        boxToChange.setAttribute('geometry',{height:((value)/2), width:2, depth:2});


      }

MQTTconnect();
}


})
