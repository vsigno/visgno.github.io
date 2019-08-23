AFRAME.registerComponent('mqttreader', {

  init:function (){
  		console.log('MQTT Reader');


      var mqtt;
      var reconnectedTimeout=2000;
      var hostname="10.0.1.167";
      var port="1883";

      function onConnect()
      {
        console.log("Connected...");
        mqtt.subscribe("test");
      }

      function MQTTconnect()
      {
        console.log("Connected to "+hostname+" "+ port);

        mqtt=new Paho.MQTT.Client("10.0.1.167",1883,"clientjs");

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
