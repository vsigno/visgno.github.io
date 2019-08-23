AFRAME.registerComponent('mqttreader', {

  init:function (){
  		console.log('MQTT Reader');

      let sceneEl = document.querySelector('a-scene');
      var box = document.createElement('a-box');
      box.setAttribute('material', 'color', 'red');
      box.setAttribute('position', {x: 1, y: 1000, z: -103});
      sceneEl.appendChild(box);


      var mqtt;
      var reconnectedTimeout=2000;
      var hostname="10.0.1.167";
      var port=1883;

      function onConnect()
      {
        console.log("Connected...");
        mqtt.subscribe("test");
      }

      function MQTTconnect()
      {
        console.log("Connected to "+hostname+" "+ port);

        //works but in ws not wss
         mqtt=new Paho.MQTT.Client("10.0.1.167",9001,"clientjs");

        //mqtt = new Paho.MQTT.Client("wss://10.0.1.167:9001/test", "clientid");

        var options={
          timeout:3,
          onSuccess:onConnect,
          onFailure:onFailure,
          //useSSL:true //probably just this option is needed to activate wss

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
        out_msg="msg is "+msg.payloadString+"<br>";
        console.log(out_msg);

        var value=parseFloat(msg.payloadString);

        box.setAttribute('geometry',{height:((value-50)*20), width:50, depth:50});


      }

MQTTconnect();
}


})
