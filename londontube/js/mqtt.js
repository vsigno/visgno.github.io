AFRAME.registerComponent('mqttreader', {

  init:function (){
  		console.log('MQTT Reader');


      var mqtt;
      var reconnectedTimeout=2000;
      var hostname="10.0.1.167";
      var port=8081;

      function onConnect()
      {
        console.log("Connected...");
        mqtt.subscribe("test");
      }

      function MQTTconnect()
      {
        console.log("Connected to "+hostname+" "+ port);

        //mqtt=new Paho.Client("10.0.1.167",8081,"clientjs");

        mqtt = new Paho.MQTT.Client("wss://10.0.1.167/test", "clientid");

        var options={
          timeout:3,
          onSuccess:onConnect,
          onFailure:onFailure,
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
        out_msg="msg is "+msg.playloadString+"<br>";
        console.log(out_msg);

      }

MQTTconnect();
}


})
